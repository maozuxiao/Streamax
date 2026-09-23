/**
 * Katty AI — 编辑器侧交互层
 *
 * 依赖：js/ai-bridge.js（window.KattyAI，传输层）、js/ai-diff.js（window.AiDiff，对比替换）。
 * 本文件在 app.js 之后加载，因此可直接使用 editor / fmtAfterEdit / showToast 等全局函数。
 *
 * 与 app.js 的耦合方式刻意保持很浅：
 *   - 只读取 editor 的 selectionStart/End，不走 fmt* 封装（那些函数会连带改动选区）
 *   - 写回由 AiDiff 负责，那里按自研撤销栈的惯用法登记撤销点
 *   - i18n 用包装 setLang 的方式接入，不修改 app.js 一行
 */

;(function (global) {
  'use strict'

  var $ = function (id) { return document.getElementById(id) }
  var STORE_KEY = 'kattybb-ai-prompts'

  // ================================================================ 内置指令

  var BUILTIN = [
    {
      id: 'rewrite',
      name: { zh: '重写', en: 'Rewrite' },
      prompt: {
        zh: '重写这段内容，保持原意不变，换一种更清晰、更有条理的表达方式。',
        en: 'Rewrite this text, preserving the original meaning but expressing it more clearly and logically.'
      }
    },
    {
      id: 'polish',
      name: { zh: '润色', en: 'Polish' },
      prompt: {
        zh: '润色这段内容，使语言更流畅、更专业，修正拗口和不自然的表达，不改变原意。',
        en: 'Polish this text for smoother, more professional wording without changing the meaning.'
      }
    },
    {
      id: 'concise',
      name: { zh: '精简', en: 'Condense' },
      prompt: {
        zh: '精简这段内容，删除冗余表述，保留全部关键信息，尽量缩短篇幅。',
        en: 'Condense this text, removing redundancy while keeping all key information.'
      }
    },
    {
      id: 'expand',
      name: { zh: '扩写', en: 'Expand' },
      prompt: {
        zh: '扩写这段内容，补充必要的细节、背景与说明，使其更充实完整。',
        en: 'Expand this text with necessary detail, background and explanation.'
      }
    },
    {
      id: 'fix',
      name: { zh: '纠错', en: 'Fix' },
      prompt: {
        zh: '修正这段内容中的错别字、语病、标点错误与表述不当之处，其余内容保持不变。',
        en: 'Fix typos, grammar, punctuation and awkward phrasing. Keep everything else unchanged.'
      }
    },
    {
      id: 'translate',
      name: { zh: '中英互译', en: 'Translate' },
      prompt: {
        zh: '在中文与英文之间互译这段内容：原文为中文则译为英文，原文为英文则译为中文。保留 Markdown 语法与代码块原样。',
        en: 'Translate this text between Chinese and English, preserving Markdown syntax and code blocks exactly.'
      }
    }
  ]

  var SYSTEM_PROMPT = {
    zh: [
      '你是 Markdown 文档编辑助手。用户会给你一段 Markdown 文本和一条处理指令。',
      '',
      '严格要求：',
      '1. 只输出处理后的 Markdown 正文。禁止输出任何解释、客套、前后缀说明（不得出现「好的，这是…」之类的话）。',
      '2. 保持原有的标题层级、列表、表格、引用结构；代码块的内容与围栏标记原样保留。',
      '3. 不要擅自增删标题，不要改变文档的整体结构。',
      '4. 回复语言与原文语言保持一致。',
      '5. 不要用代码块包裹你的输出。'
    ].join('\n'),
    en: [
      'You are a Markdown editing assistant. The user gives you a Markdown passage and an instruction.',
      '',
      'Strict requirements:',
      '1. Output only the processed Markdown body. No explanations, no preamble, no postscript.',
      '2. Preserve the original heading levels, lists, tables and blockquotes; keep code blocks and their fences byte-identical.',
      '3. Do not add or remove headings; do not restructure the document.',
      '4. Reply in the same language as the source text.',
      '5. Do not wrap your output in a code fence.'
    ].join('\n')
  }

  /**
   * 自由提问（问答）模式的系统提示：与「改写」类指令不同，这里不要求「只输出 Markdown 正文」，
   * 而是允许自然语言回答（可含 Markdown）。既支持「这段讲什么」之类的问题，也支持
   * 「把它改得更正式」之类的改写要求——后者直接给出改写后的内容即可。
   */
  var SYSTEM_PROMPT_QA = {
    zh: [
      '你是 Markdown 文档编辑助手。用户会提供一段文档内容（可能是选中片段，也可能是全文），然后据此提问或提出修改要求。',
      '',
      '要求：',
      '1. 用与文档一致的语言回答。',
      '2. 若用户只是提问，用清晰的自然语言回答，可使用 Markdown 排版（标题、列表、代码块等）。',
      '3. 若用户要求改写 / 润色 / 扩写某段，直接给出改写后的内容，保持原有 Markdown 结构与代码块原样；不要复述文档全文。',
      '4. 不要编造文档中不存在的内容；拿不准的地方请明确说明。'
    ].join('\n'),
    en: [
      'You are a Markdown editing assistant. The user gives you a passage (a selection or the whole document) and then asks a question or requests an edit.',
      '',
      'Requirements:',
      '1. Reply in the same language as the document.',
      '2. If the user only asks a question, answer in clear prose and you may use Markdown (headings, lists, code fences).',
      '3. If the user asks to rewrite / polish / expand, output the revised content directly, preserving Markdown structure and code blocks; do not echo the whole document.',
      '4. Do not invent content not present in the document; say so when unsure.'
    ].join('\n')
  }

  // ================================================================ 文案

  var I18N = {
    zh: {
      ai: 'AI',
      panelTitle: 'AI 助手',
      ctxNone: '未选中内容',
      ctxSel: '正在编辑：选中 {n} 字',
      empty: '选中一段文字，即可让 AI 帮你重写、润色或精简',
      placeholder: '追问，例如「再正式一点」',
      chat: '对话',
      generating: '生成中…',
      thinkingChars: '思考中…（{n} 字）',
      thoughtDone: '已完成思考（{n} 字）· 点此展开',
      applyToDoc: '应用到文档…',
      diffOld: '原文',
      diffNew: '改写后',
      replaced: '已替换，可按 Ctrl+Z 撤销',
      needSelection: '请先在编辑器中选中一段文字',
      readOnlyDenied: '只读文档不可修改',
      promptPop: '快捷指令',
      promptManage: '管理',
      promptSaveCur: '存为指令',
      promptEmpty: '暂无指令',
      promptSaved: '已保存为快捷指令',
      promptEmptyInput: '输入框为空，无法保存',
      channelExtension: '已连接扩展「{v}」· {provider} · {model}',
      channelExtensionNoKey: '扩展已安装，但供应商「{provider}」未配置，请在扩展设置中填写 API Key',
      channelDirect: '未检测到扩展，当前使用直连：{model}',
      channelNone: '未检测到 Katty AI Bridge 扩展，也未配置直连。安装扩展后可访问全部供应商。',
      channelTitleExt: '扩展通道可用',
      channelTitleDirect: '直连模式',
      channelTitleNone: 'AI 不可用',
      openExtOptions: '打开扩展设置',
      reprobe: '重新检测',
      channelSection: '通道状态',
      retry: '重试',
      accept: '接受并替换',
      discard: '放弃',
      directTitle: '直连设置',
      directHint: '直连只对开放了 CORS 的供应商有效（如 OpenRouter）。Key 会明文保存在本浏览器的 localStorage 中。',
      directSave: '保存直连设置',
      directSaved: '已保存直连设置（仅在未检测到扩展时生效）',
      directBase: 'API 地址',
      directKey: 'API Key',
      directModel: '模型',
      directFromExt: '以上地址与模型来自扩展当前供应商「{provider}」；Key 由扩展保管，页面不读取。',
      directKeyKeptByExt: '由扩展保管，页面不读取',
      promptsTitle: '自定义指令',
      promptAdd: '＋ 新增指令',
      promptName: '指令名称',
      promptText: '提示词内容',
      dragSort: '拖动调整顺序',
      save: '保存',
      cancel: '取消',
      delete: '删除',
      needNamePrompt: '名称与提示词都不能为空',
      clearConfirm: '清空当前会话？',
      cleared: '已清空会话',
      settings: '设置',
      clearChat: '清空会话',
      close: '收起',
      modelTitle: '当前模型（可在扩展设置中切换）',
      ctxDoc: '全文 {n} 字 · 未选中将以全文提问',
      empty: '选中一段文字让 AI 改写，或直接就全文提问',
      copyChat: '复制对话（Markdown）',
      copyMsg: '复制为 Markdown',
      copied: '已复制为 Markdown',
      noDoc: '编辑器内容为空，无法基于全文提问',
      imgAdded: '已添加 {n} 张图片',
      imgRemoved: '已移除图片',
      pasteImgHint: '可粘贴 / 拖入图片一起提问（部分模型支持读图）'
    },
    en: {
      ai: 'AI',
      panelTitle: 'AI Assistant',
      ctxNone: 'No selection',
      ctxSel: 'Editing: {n} chars selected',
      empty: 'Select some text, then let AI rewrite, polish or condense it',
      placeholder: 'Ask a follow-up, e.g. "make it more formal"',
      chat: 'Chat',
      generating: 'Generating…',
      thinkingChars: 'Thinking… ({n} chars)',
      thoughtDone: 'Thought for {n} chars · click to expand',
      applyToDoc: 'Apply to document…',
      diffOld: 'Original',
      diffNew: 'Rewritten',
      replaced: 'Replaced — press Ctrl+Z to undo',
      needSelection: 'Select some text in the editor first',
      readOnlyDenied: 'Read-only document cannot be modified',
      promptPop: 'Quick prompts',
      promptManage: 'Manage',
      promptSaveCur: 'Save as prompt',
      promptEmpty: 'No prompts yet',
      promptSaved: 'Saved as a quick prompt',
      promptEmptyInput: 'Input is empty',
      channelExtension: 'Connected to extension v{v} · {provider} · {model}',
      channelExtensionNoKey: 'Extension installed, but provider "{provider}" is not configured — set an API Key in extension options',
      channelDirect: 'Extension not detected; using direct connection: {model}',
      channelNone: 'Katty AI Bridge extension not detected and no direct config. Install the extension to reach all providers.',
      channelTitleExt: 'Extension channel active',
      channelTitleDirect: 'Direct mode',
      channelTitleNone: 'AI unavailable',
      openExtOptions: 'Open extension options',
      reprobe: 'Re-detect',
      channelSection: 'Channel',
      retry: 'Retry',
      accept: 'Accept & replace',
      discard: 'Discard',
      directTitle: 'Direct connection',
      directHint: 'Direct calls only work with CORS-enabled providers (e.g. OpenRouter). The key is stored in plain text in this browser\'s localStorage.',
      directSave: 'Save direct settings',
      directSaved: 'Direct settings saved (only used when no extension is detected)',
      directBase: 'API base URL',
      directKey: 'API Key',
      directModel: 'Model',
      directFromExt: 'The URL and model above come from the extension\'s current provider "{provider}"; the key stays in the extension and is never exposed to the page.',
      directKeyKeptByExt: 'Kept by the extension, not readable by the page',
      promptsTitle: 'Custom instructions',
      promptAdd: '＋ Add instruction',
      promptName: 'Name',
      promptText: 'Prompt',
      dragSort: 'Drag to reorder',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      needNamePrompt: 'Name and prompt cannot be empty',
      clearConfirm: 'Clear this conversation?',
      cleared: 'Conversation cleared',
      settings: 'Settings',
      clearChat: 'Clear conversation',
      close: 'Collapse',
      modelTitle: 'Current model (change in extension options)',
      ctxDoc: 'Full document {n} chars · no selection, will ask about the whole doc',
      empty: 'Select text to rewrite it, or just ask about the whole document',
      copyChat: 'Copy conversation (Markdown)',
      copyMsg: 'Copy as Markdown',
      copied: 'Copied as Markdown',
      noDoc: 'The editor is empty, cannot ask about the document',
      imgAdded: 'Added {n} image(s)',
      imgRemoved: 'Image removed',
      pasteImgHint: 'Paste or drop images to ask together (some models can read images)'
    }
  }

  function curLang() {
    return global._currentLang === 'en' ? 'en' : 'zh'
  }
  function t(key) {
    var pack = I18N[curLang()] || I18N.zh
    return pack[key] != null ? pack[key] : (I18N.zh[key] != null ? I18N.zh[key] : key)
  }
  function fmt(str, map) {
    return String(str).replace(/\{(\w+)\}/g, function (_, k) { return map[k] != null ? map[k] : '{' + k + '}' })
  }

  // ================================================================ 状态

  var state = {
    sel: null,          // 当前选区 { start, end, text }
    scopeKind: null,    // 'sel' | 'doc'：本轮会话作用范围（选中片段 / 全文）
    baseSel: null,      // 本轮会话要替换的目标选区，生成期间不随用户改选而变
    history: [],        // 多轮上下文（不含 system）
    busy: false,
    controller: null,
    panelOpen: false,
    probeInfo: null,
    model: '',
    attachments: []     // 待发送的图片附件：{ id, url, name }
  }

  var deletedBuiltins = []
  var lastMouse = { x: null, y: null }
  var selTimer = null

  // ================================================================ 小工具

  function toast(msg) {
    if (typeof global.showToast === 'function') global.showToast(msg)
  }

  function getEditor() { return $('editor') }

  function getSel() {
    var ed = getEditor()
    if (!ed) return null
    var s = ed.selectionStart
    var e = ed.selectionEnd
    if (s == null || e == null || s === e) return null
    return { start: s, end: e, text: ed.value.substring(s, e) }
  }

  function iconBtn(paths, title, onClick) {
    var b = document.createElement('button')
    b.className = 'ai-icon-btn'
    b.type = 'button'
    if (title) b.title = title
    b.innerHTML = '<svg viewBox="0 0 20 20" fill="none">' + paths + '</svg>'
    b.addEventListener('click', onClick)
    return b
  }

  var ICON_PENCIL = '<path d="M12.5 3.5l4 4L7 17H3v-4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
  var ICON_TRASH = '<path d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6M6.5 6l.7 9.5A1.5 1.5 0 0 0 8.7 17h2.6a1.5 1.5 0 0 0 1.5-1.5L13.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'

  // ================================================================ 指令存取

  function loadStore() {
    var raw = null
    try { raw = global.localStorage.getItem(STORE_KEY) } catch (e) { raw = null }
    var data = null
    try { data = raw ? JSON.parse(raw) : null } catch (e) { data = null }
    if (!data || typeof data !== 'object') data = {}
    if (!Array.isArray(data.items)) data.items = []
    if (!Array.isArray(data.deletedBuiltins)) data.deletedBuiltins = []
    return data
  }

  function saveStore(data) {
    try { global.localStorage.setItem(STORE_KEY, JSON.stringify(data)) } catch (e) { /* 存储不可用则仅内存生效 */ }
  }

  function getPrompts() {
    var data = loadStore()
    var lang = curLang()
    var custom = data.items.filter(function (p) { return p && p.id && !p.builtin })
    var builtins = BUILTIN
      .filter(function (b) { return data.deletedBuiltins.indexOf(b.id) === -1 })
      .map(function (b) {
        var saved = null
        for (var i = 0; i < data.items.length; i++) {
          if (data.items[i] && data.items[i].builtin && data.items[i].id === b.id) { saved = data.items[i]; break }
        }
        return {
          id: b.id,
          builtin: true,
          name: (saved && saved.name) || b.name[lang] || b.name.zh,
          prompt: (saved && saved.prompt) || b.prompt[lang] || b.prompt.zh
        }
      })
    return applyOrder(builtins.concat(custom), data.order)
  }

  /**
   * 按持久化的 order（id 列表）排序；未登记的 id（新增指令、新增内置项）
   * 保持原相对顺序排在末尾，不会丢失。
   */
  function applyOrder(list, order) {
    if (!Array.isArray(order) || !order.length) return list
    var pos = {}
    for (var i = 0; i < order.length; i++) pos[order[i]] = i
    var ranked = []
    var rest = []
    for (var j = 0; j < list.length; j++) {
      var id = list[j].id
      if (Object.prototype.hasOwnProperty.call(pos, id)) ranked.push({ p: list[j], i: pos[id] })
      else rest.push(list[j])
    }
    ranked.sort(function (a, b) { return a.i - b.i })
    var out = []
    for (var k = 0; k < ranked.length; k++) out.push(ranked[k].p)
    return out.concat(rest)
  }

  /** 拖拽完成后写回顺序。设置弹窗与浮动指令条的指令顺序共用这一份。 */
  function persistOrder(ps) {
    var data = loadStore()
    data.order = []
    for (var i = 0; i < ps.length; i++) data.order.push(ps[i].id)
    saveStore(data)
  }

  function upsertPrompt(p) {
    var data = loadStore()
    var hit = false
    for (var i = 0; i < data.items.length; i++) {
      if (data.items[i] && data.items[i].id === p.id) { data.items[i] = p; hit = true; break }
    }
    if (!hit) data.items.push(p)
    saveStore(data)
  }

  function deletePrompt(p) {
    var data = loadStore()
    data.items = data.items.filter(function (x) { return !x || x.id !== p.id })
    if (p.builtin && data.deletedBuiltins.indexOf(p.id) === -1) data.deletedBuiltins.push(p.id)
    deletedBuiltins = data.deletedBuiltins
    saveStore(data)
  }

  // ================================================================ 浮动指令条

  function renderChips() {
    var box = $('aiFloatChips')
    if (!box) return
    box.innerHTML = ''
    var ps = getPrompts()
    for (var i = 0; i < ps.length; i++) {
      (function (p) {
        var b = document.createElement('button')
        b.className = 'ai-chip'
        b.type = 'button'
        b.textContent = p.name
        b.title = p.prompt
        b.addEventListener('click', function () { runPreset(p) })
        box.appendChild(b)
      })(ps[i])
    }
  }

  function positionFloatBar(x, y) {
    var fb = $('aiFloatBar')
    if (!fb) return
    var r = fb.getBoundingClientRect()
    var left = (x != null) ? x - 24 : Math.max(12, (global.innerWidth - r.width) / 2)
    var top = (y != null) ? y + 14 : 140
    left = Math.max(12, Math.min(left, global.innerWidth - r.width - 12))
    if (top + r.height > global.innerHeight - 12) top = Math.max(12, top - r.height - 28)
    fb.style.left = left + 'px'
    fb.style.top = top + 'px'
  }

  function showFloatBar(x, y) {
    var fb = $('aiFloatBar')
    if (!fb) return
    fb.hidden = false
    void fb.offsetWidth          // 强制回流，否则从 hidden 切过来时过渡不生效
    positionFloatBar(x, y)
    fb.classList.add('show')
  }

  function hideFloatBar(now) {
    var fb = $('aiFloatBar')
    if (!fb || fb.hidden) return
    fb.classList.remove('show')
    fb.classList.remove('busy')
    clearTimeout(hideFloatBar._t)
    if (now) { fb.hidden = true; return }
    hideFloatBar._t = setTimeout(function () {
      if (!fb.classList.contains('show')) fb.hidden = true
    }, 140)
  }

  function setBusy(on, label) {
    state.busy = !!on
    var fb = $('aiFloatBar')
    if (fb) fb.classList.toggle('busy', !!on)
    var txt = $('aiFloatStatusText')
    if (txt) txt.textContent = on ? (label ? label + '…' : t('generating')) : ''
    var send = $('aiSendBtn')
    if (send) send.title = on ? t('cancel') : t('placeholder')
    syncComposer()
  }

  // ================================================================ 侧边栏

  function toggleAiPanel() {
    state.panelOpen ? closePanel() : openPanel()
  }
  global.toggleAiPanel = toggleAiPanel

  function openPanel() {
    var p = $('aiPanel')
    if (!p) return
    p.classList.add('open')
    document.body.classList.add('ai-panel-open')
    state.panelOpen = true
    var btn = $('aiToggleBtn')
    if (btn) btn.classList.add('active')
    syncCtx()
    var input = $('aiInput')
    if (input) setTimeout(function () { input.focus() }, 220)
  }

  function closePanel() {
    var p = $('aiPanel')
    if (!p) return
    p.classList.remove('open')
    document.body.classList.remove('ai-panel-open')
    state.panelOpen = false
    var btn = $('aiToggleBtn')
    if (btn) btn.classList.remove('active')
  }

  function syncCtx() {
    var card = $('aiCtx')
    var label = $('aiCtxLabel')
    var body = $('aiCtxBody')
    if (!card) return
    var s = getSel()
    if (s && s.text.trim()) {
      state.sel = s
      state.scopeKind = 'sel'
      if (label) label.textContent = fmt(t('ctxSel'), { n: state.sel.text.length })
      if (body) body.textContent = state.sel.text.length > 300 ? state.sel.text.slice(0, 300) + '…' : state.sel.text
    } else {
      var ed = getEditor()
      var full = ed ? ed.value : ''
      state.sel = null
      state.scopeKind = 'doc'
      if (label) label.textContent = fmt(t('ctxDoc'), { n: full.length })
      if (body) body.textContent = full.length ? (full.length > 300 ? full.slice(0, 300) + '…' : full) : ''
    }
  }

  function scrollBottom() {
    var box = $('aiMessages')
    if (box) box.scrollTop = box.scrollHeight
  }

  /**
   * 是否贴在底部。流式输出时若用户已上翻查看前文，不应强行把他拽回底部——
   * 那样长回复根本读不了。注意必须在写入新文本「之前」判断：
   * 写入后 scrollHeight 已经变了，判断会失真。
   */
  function isNearBottom() {
    var box = $('aiMessages')
    if (!box) return true
    return box.scrollHeight - box.scrollTop - box.clientHeight < 60
  }

  /** 在消息气泡里渲染一组图片缩略图（悬停查看大图，参照 CodeBuddy）。 */
  function buildImageGallery(attachments) {
    if (!attachments || !attachments.length) return null
    var gal = document.createElement('div')
    gal.className = 'ai-attach-gal'
    for (var i = 0; i < attachments.length; i++) {
      gal.appendChild(makeThumb(attachments[i].url))
    }
    return gal
  }

  /** 单张缩略图：小图 + 悬停放大预览。 */
  function makeThumb(url) {
    var wrap = document.createElement('div')
    wrap.className = 'ai-att'
    var thumb = document.createElement('img')
    thumb.className = 'thumb'
    thumb.src = url
    thumb.alt = ''
    thumb.loading = 'lazy'
    var big = document.createElement('img')
    big.className = 'big'
    big.src = url
    big.alt = ''
    wrap.appendChild(thumb)
    wrap.appendChild(big)
    return wrap
  }

  /** 给消息气泡挂一个「复制为 Markdown」按钮（悬停出现）。 */
  function appendCopyBtn(wrap, role) {
    var b = iconBtn(
      '<rect x="7" y="7" width="9" height="9" rx="1.6" stroke="currentColor" stroke-width="1.5"/><path d="M13 7V5.5A1.5 1.5 0 0 0 11.5 4h-6A1.5 1.5 0 0 0 4 5.5v6A1.5 1.5 0 0 0 5.5 13H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
      t('copyMsg'),
      function () { copyMsgMarkdown(wrap, role) }
    )
    b.className = 'ai-icon-btn ai-copy'
    b.type = 'button'
    wrap.appendChild(b)
  }

  function appendUserMsg(text, attachments) {
    var box = $('aiMessages')
    if (!box) return null
    var empty = $('aiEmpty')
    if (empty && empty.parentNode) empty.parentNode.removeChild(empty)
    var wrap = document.createElement('div')
    wrap.className = 'ai-msg user'
    var bub = document.createElement('div')
    bub.className = 'ai-bubble'
    if (text) {
      var tx = document.createElement('div')
      tx.className = 'ai-bubble-text'
      tx.textContent = text
      bub.appendChild(tx)
    }
    var gal = buildImageGallery(attachments)
    if (gal) bub.appendChild(gal)
    wrap.appendChild(bub)
    appendCopyBtn(wrap, 'user')
    box.appendChild(wrap)
    scrollBottom()
    return wrap
  }

  function appendAiMsg() {
    var box = $('aiMessages')
    if (!box) return null
    var empty = $('aiEmpty')
    if (empty && empty.parentNode) empty.parentNode.removeChild(empty)
    var wrap = document.createElement('div')
    wrap.className = 'ai-msg ai'
    var bub = document.createElement('div')
    bub.className = 'ai-bubble'
    var textEl = document.createElement('span')
    var caret = document.createElement('span')
    caret.className = 'ai-caret'
    bub.appendChild(textEl)
    bub.appendChild(caret)
    wrap.appendChild(bub)
    appendCopyBtn(wrap, 'ai')
    box.appendChild(wrap)
    scrollBottom()
    return { wrap: wrap, bubble: bub, text: textEl, caret: caret }
  }

  /**
   * 在回复气泡上方挂一个「思考过程」块。
   *
   * 推理模型（hy4-preview、deepseek-reasoner、o4-mini 等）会先思考几十秒才吐第一个
   * 正文字，这段空白期界面必须有反馈，否则看起来就是卡死。正文开始后自动折起，
   * 点标题可随时展开回看；整轮没有任何思考片段（非推理模型）时整块移除。
   */
  function appendThinkBlock(msg) {
    var wrap = document.createElement('div')
    wrap.className = 'ai-think open'
    var head = document.createElement('button')
    head.type = 'button'
    head.className = 'ai-think-head'
    head.textContent = fmt(t('thinkingChars'), { n: 0 })
    var body = document.createElement('div')
    body.className = 'ai-think-body'
    wrap.appendChild(head)
    wrap.appendChild(body)
    msg.wrap.insertBefore(wrap, msg.bubble)
    head.addEventListener('click', function () { wrap.classList.toggle('open') })
    return { wrap: wrap, head: head, body: body }
  }

  /**
   * 按空行把思考内容切成段落渲染（CodeBuddy / WorkBuddy 那种一段段的效果）。
   *
   * 网关吐出来的思考文本本身是有语义分段的（如「原句分析 / 目标 / 版本1…」），
   * 整段糊在一起很难读。这里按空行切块，流式过程中做增量更新：
   * 只在段落数变化时增删节点，其余只改最后一个节点的文本，避免每个片段都重建整块 DOM。
   */
  function renderThinkSegments(box, text) {
    var raw = String(text || '').split(/\n{2,}/)
    var segs = []
    for (var i = 0; i < raw.length; i++) {
      var s = raw[i].replace(/^\n+|\n+$/g, '')
      if (s) segs.push(s)
    }
    while (box.childNodes.length > segs.length) box.removeChild(box.lastChild)
    for (var j = 0; j < segs.length; j++) {
      var el = box.childNodes[j]
      if (!el) {
        el = document.createElement('div')
        el.className = 'ai-think-seg'
        box.appendChild(el)
      }
      if (el.textContent !== segs[j]) el.textContent = segs[j]
    }
    return segs.length
  }

  function syncComposer() {
    var send = $('aiSendBtn')
    if (!send) return
    send.innerHTML = state.busy
      ? '<svg viewBox="0 0 20 20" fill="none"><rect x="6" y="6" width="8" height="8" rx="1.5" fill="currentColor"/></svg>'
      : '<svg viewBox="0 0 20 20" fill="none"><path d="M10 15.5V4.8M5.6 9.2L10 4.8l4.4 4.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    send.title = state.busy ? t('cancel') : t('placeholder')
  }

  // ================================================================ 请求

  function userContent(instruction, text) {
    return instruction + '\n\n---\n\n' + text
  }

  function systemPrompt() {
    return SYSTEM_PROMPT[curLang()] || SYSTEM_PROMPT.zh
  }

  function systemPromptQA() {
    return SYSTEM_PROMPT_QA[curLang()] || SYSTEM_PROMPT_QA.zh
  }

  /** 问答模式下把「文档内容 + 问题」拼成一条 user 消息（内容部分）。 */
  function qaContent(question, text) {
    var sep = curLang() === 'en'
      ? 'Document content:\n\n---\n\n'
      : '文档内容：\n\n---\n\n'
    var tail = curLang() === 'en'
      ? '\n\n---\n\nQuestion: '
      : '\n\n---\n\n用户问题：'
    return sep + text + tail + question
  }

  /**
   * 解析本次操作的作用范围：
   *   - 有选中且非空 → 片段模式，返回真实选区（可用于「应用到文档」）。
   *   - 无选中       → 全文模式，把整个编辑器内容当作上下文（用于问答 / 改写）。
   * 全文模式也给出 start/end（0..len），diff 时即整篇替换。
   */
  function resolveScope() {
    var sel = getSel()
    var ed = getEditor()
    if (sel && sel.text.trim()) return { kind: 'sel', sel: sel }
    var full = ed ? ed.value : ''
    return { kind: 'doc', sel: { start: 0, end: full.length, text: full } }
  }

  /**
   * 把文字与图片附件拼成多模态消息。无图片时仍返回纯字符串（保持与旧逻辑一致，
   * 也避免空数组被当成无效 content）；有图片时返回 OpenAI 兼容的 parts 数组
   * [{type:'text'},{type:'image_url',image_url:{url}}]，由传输层原样转发给模型。
   */
  function buildMultimodalContent(text, attachments) {
    if (!attachments || !attachments.length) return text
    var parts = []
    if (text) parts.push({ type: 'text', text: text })
    for (var i = 0; i < attachments.length; i++) {
      parts.push({ type: 'image_url', image_url: { url: attachments[i].url } })
    }
    return parts
  }

  // ================================================================ 附件（粘贴 / 拖拽图片）

  function addAttachment(file) {
    if (!file || file.type.indexOf('image/') !== 0) return
    var reader = new FileReader()
    reader.onload = function () {
      state.attachments.push({
        id: 'att_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        url: String(reader.result),
        name: file.name || 'image'
      })
      renderAttachments()
      toast(fmt(t('imgAdded'), { n: state.attachments.length }))
    }
    reader.readAsDataURL(file)
  }

  function removeAttachment(id) {
    state.attachments = state.attachments.filter(function (a) { return a.id !== id })
    renderAttachments()
  }

  function clearAttachments() {
    state.attachments = []
    renderAttachments()
  }

  function renderAttachments() {
    var box = $('aiAttach')
    if (!box) return
    box.innerHTML = ''
    if (!state.attachments.length) { box.hidden = true; return }
    box.hidden = false
    for (var i = 0; i < state.attachments.length; i++) {
      (function (att) {
        var wrap = makeThumb(att.url)
        var rm = document.createElement('button')
        rm.type = 'button'
        rm.className = 'ai-att-rm'
        rm.textContent = '×'
        rm.title = t('imgRemoved')
        rm.addEventListener('click', function (e) {
          e.stopPropagation()
          removeAttachment(att.id)
        })
        wrap.appendChild(rm)
        box.appendChild(wrap)
      })(state.attachments[i])
    }
  }

  // ================================================================ 复制到 Markdown

  /** 读取消息流的 DOM，整理成 {role, text, images} 列表。 */
  function collectTranscript() {
    var box = $('aiMessages')
    if (!box) return []
    var nodes = box.querySelectorAll('.ai-msg')
    var out = []
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i]
      var role = n.classList.contains('user') ? 'user' : 'ai'
      var bub = n.querySelector('.ai-bubble')
      if (!bub) continue
      var clone = bub.cloneNode(true)
      var gal = clone.querySelector('.ai-attach-gal')
      if (gal) gal.parentNode.removeChild(gal)
      var caret = clone.querySelector('.ai-caret')
      if (caret) caret.parentNode.removeChild(caret)
      var text = (clone.textContent || '').replace(/\s+$/, '')
      var imgs = bub.querySelectorAll('.ai-att').length
      out.push({ role: role, text: text, images: imgs })
    }
    return out
  }

  function buildMarkdown(tr, single) {
    var lines = []
    for (var i = 0; i < tr.length; i++) {
      var m = tr[i]
      if (!single) {
        lines.push('### ' + (m.role === 'user' ? (curLang() === 'en' ? 'User' : '用户') : (curLang() === 'en' ? 'Assistant' : '助手')))
        lines.push('')
      }
      if (m.text) lines.push(m.text)
      if (m.images) lines.push((curLang() === 'en' ? '[image ×' : '[图片 ×') + m.images + ']')
      lines.push('')
    }
    return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n'
  }

  /** clipboard 不可用时（file:// 等）的降级方案。 */
  function copyText(text) {
    if (global.navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () { return fallbackCopy(text) })
    }
    return fallbackCopy(text)
  }
  function fallbackCopy(text) {
    try {
      var ta = document.createElement('textarea')
      ta.value = text
      ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0'
      document.body.appendChild(ta)
      ta.select()
      var ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok ? Promise.resolve() : Promise.reject()
    } catch (e) { return Promise.reject() }
  }

  function copyChatMarkdown() {
    var tr = collectTranscript()
    if (!tr.length) { toast(t('empty')); return }
    copyText(buildMarkdown(tr, false)).then(function () {
      toast(t('copied'))
    }).catch(function () { toast(t('copied')) })
  }

  function copyMsgMarkdown(wrap, role) {
    var bub = wrap.querySelector('.ai-bubble')
    if (!bub) return
    var clone = bub.cloneNode(true)
    var gal = clone.querySelector('.ai-attach-gal')
    if (gal) gal.parentNode.removeChild(gal)
    var caret = clone.querySelector('.ai-caret')
    if (caret) caret.parentNode.removeChild(caret)
    var text = (clone.textContent || '').replace(/\s+$/, '')
    var imgs = bub.querySelectorAll('.ai-att').length
    var md = buildMarkdown([{ role: role, text: text, images: imgs }], true)
    copyText(md).then(function () { toast(t('copied')) }).catch(function () { toast(t('copied')) })
  }

  function openDiffFor(sel, newText, retryFn) {
    if (!global.AiDiff) return
    // 只读文档（?file=...&ro=1 载入的远程文档）不允许替换
    var roEd = document.getElementById('editor')
    if (roEd && roEd.readOnly) { toast(t('readOnlyDenied')); return }
    global.AiDiff.open({
      oldText: sel.text,
      newText: newText,
      start: sel.start,
      end: sel.end,
      labelOld: t('diffOld'),
      labelNew: t('diffNew'),
      onRetry: function () {
        global.AiDiff.close()
        if (retryFn) retryFn()
      },
      onAccept: function () { toast(t('replaced')) }
    })
  }

  function addApplyButton(msg, sel, text, retryFn) {
    // 异步流中消息气泡可能已被清空（如中途点了清空会话），先行防御，避免报错与「按钮消失」
    if (!msg || !msg.wrap || !msg.wrap.parentNode) return
    // 只读文档根本不该出现「应用到文档」入口
    var roEd = document.getElementById('editor')
    if (roEd && roEd.readOnly) return
    var old = msg.wrap.querySelector('.ai-apply')
    if (old) old.parentNode.removeChild(old)
    var btn = document.createElement('button')
    btn.className = 'ai-btn ai-apply'
    btn.type = 'button'
    btn.style.marginTop = '6px'
    btn.textContent = t('applyToDoc')
    btn.addEventListener('click', function () { openDiffFor(sel, text, retryFn) })
    msg.wrap.appendChild(btn)
    scrollBottom()
  }

  /**
   * 执行一轮对话。失败或取消时回滚 history，避免污染上下文。
   * @param {string|Array} content   发给模型的 user 内容（字符串或含图片的 parts 数组）
   * @param {string} display         界面上展示的文字
   * @param {Object} opts            { autoDiff, qa, scope, attachments }
   */
  function runTurn(content, display, opts) {
    opts = opts || {}
    if (typeof global.KattyAI === 'undefined') { toast(t('channelNone')); return }
    if (state.busy) return

    var snapshot = state.history.slice()
    state.history.push({ role: 'user', content: content })
    appendUserMsg(display, opts.attachments)

    // 替换目标锁定为发起时的作用范围（追问场景沿用会话首轮的范围）。
    // 若改用实时的选区，生成过程中用户一改选，diff 就会比对错位。
    var runSel = (opts.scope && opts.scope.sel) ? opts.scope.sel : null
    state.baseSel = runSel

    // 自由提问走问答系统提示；内置指令（改写/润色…）走严格的「只输出 Markdown」提示。
    var sys = opts.qa ? systemPromptQA() : systemPrompt()
    var messages = [{ role: 'system', content: sys }].concat(state.history)
    var msg = appendAiMsg()
    if (!msg) return

    // 思考块：正文到来前就显示「思考中…」，让用户知道请求已经发出去了
    var think = appendThinkBlock(msg)
    var thinkChars = 0
    var thinkClosed = false

    // 思考期间先藏起空气泡（里面只有一个光标），等正文/报错要写入时再显示
    if (msg.bubble) msg.bubble.style.display = 'none'

    /** 思考块收尾：有思考内容就折起保留，没有（非推理模型）就整块撤掉 */
    function settleThink() {
      if (thinkClosed) return
      thinkClosed = true
      if (msg.bubble) msg.bubble.style.display = ''
      if (!thinkChars) {
        if (think.wrap.parentNode) think.wrap.parentNode.removeChild(think.wrap)
        return
      }
      think.wrap.classList.remove('open')
      think.head.textContent = fmt(t('thoughtDone'), { n: thinkChars })
    }

    setBusy(true, display)
    var busyLabel = display ? display + '…' : t('generating')
    state.controller = new AbortController()

    global.KattyAI.chat({
      messages: messages,
      model: state.model || undefined,
      signal: state.controller.signal,
      // 推理模型的思考片段：实时写进思考块。它不进答案，只用于呈现进度。
      onReasoning: function (chunk, full) {
        thinkChars = full.length
        renderThinkSegments(think.body, full)
        think.head.textContent = fmt(t('thinkingChars'), { n: thinkChars })
        var st = $('aiFloatStatusText')
        if (st && state.busy) st.textContent = fmt(t('thinkingChars'), { n: thinkChars })
        if (isNearBottom()) scrollBottom()
      },
      onDelta: function (chunk, full) {
        settleThink()   // 开始吐正文了，把思考块收起
        var st = $('aiFloatStatusText')
        if (st && state.busy) st.textContent = busyLabel
        var near = isNearBottom()   // 必须在写入前判断
        if (msg.text) msg.text.textContent = full
        if (near) scrollBottom()
      }
    }).then(function (text) {
      settleThink()
      setBusy(false)
      state.history.push({ role: 'assistant', content: text })
      if (msg.text) msg.text.textContent = text
      if (msg.caret) msg.caret.style.display = 'none'

      var retry = function () { state.history = snapshot; runTurn(content, display, opts) }
      // 改写类（非问答）：只要锁定了替换目标就提供「应用到文档」入口
      // 问答类：仅当本轮确实基于「选中片段」时才提供，避免把回答误替换整篇文档
      var canApply = !!runSel && (!opts.qa || (opts.scope && opts.scope.kind === 'sel'))
      if (canApply) addApplyButton(msg, runSel, text, retry)
      if (opts.autoDiff && runSel) openDiffFor(runSel, text, retry)
    }).catch(function (err) {
      settleThink()
      setBusy(false)
      if (msg.caret) msg.caret.style.display = 'none'
      var code = err && err.code
      if (code === 'ABORTED') {
        // 中止（手动取消 / 清空会话）时不回滚历史：手动取消应保留用户已发出的提问；
        // 清空会话在 clearChat 里已把 history 置空，这里若回滚快照会把它覆盖回去
        if (msg.wrap && msg.wrap.parentNode && !msg.text.textContent) msg.wrap.parentNode.removeChild(msg.wrap)
        return
      }
      state.history = snapshot
      if (msg.text) {
        msg.text.textContent = ''
        var em = document.createElement('span')
        em.style.color = 'var(--kbai-err)'
        em.textContent = (err && err.message) || '请求失败'
        msg.text.appendChild(em)
      }
      toast((err && err.message) || '请求失败')
    })
  }

  function runPreset(p) {
    var scope = resolveScope()
    state.scopeKind = scope.kind
    state.sel = scope.sel
    state.history = []
    syncCtx()
    openPanel()
    // 改写预设不自动弹 diff 窗：回复完成后稳定显示「应用到文档…」按钮，由用户主动打开预览
    runTurn(userContent(p.prompt, scope.sel.text), p.name, { autoDiff: false, scope: scope, qa: false })
  }

  function sendFollowUp() {
    var input = $('aiInput')
    if (!input) return
    var text = input.value.trim()
    if (!text || state.busy) return

    if (!state.history.length) {
      var scope = resolveScope()
      // 全文模式且文档为空、又没有附图时，确实无内容可问
      if (scope.kind === 'doc' && !scope.sel.text && !(state.attachments && state.attachments.length)) {
        toast(t('noDoc'))
        return
      }
      state.sel = scope.sel
      state.scopeKind = scope.kind
      syncCtx()
      var firstContent = buildMultimodalContent(qaContent(text, scope.sel.text), state.attachments)
      // 问答模式不自动弹全文替换窗：仅展示回答，是否应用到文档由回复后的按钮决定
      runTurn(firstContent, text, { autoDiff: false, scope: scope, qa: true, attachments: state.attachments.slice() })
    } else {
      var followContent = buildMultimodalContent(text, state.attachments)
      runTurn(followContent, text, { autoDiff: false, qa: true, attachments: state.attachments.slice() })
    }
    input.value = ''
    input.style.height = 'auto'
    clearAttachments()
  }

  function clearChat() {
    // 生成中点击清空：先中止正在进行的请求，再复位 UI，避免残留半截消息
    if (state.busy) {
      if (state.controller) state.controller.abort()
      setBusy(false)
    }
    // 直接清空，不再依赖原生 confirm（部分浏览器 / 嵌入环境会拦截 confirm，导致「点了没反应」）
    state.history = []
    state.baseSel = null
    // 同时清掉「选中上下文」与待发送的图片附件：清空会话不该残留上一次的选区与图片
    state.sel = null
    state.scopeKind = null
    clearAttachments()
    // 同步清除编辑器中的选区/高亮，让「选中的部分」一并复位（不移动光标位置）
    var ed = getEditor()
    if (ed && typeof ed.setSelectionRange === 'function') {
      var caret = ed.selectionStart || 0
      ed.setSelectionRange(caret, caret)
    }
    var box = $('aiMessages')
    if (box) {
      box.innerHTML = ''
      var empty = document.createElement('div')
      empty.className = 'ai-empty'
      empty.id = 'aiEmpty'
      empty.innerHTML =
        '<div class="ai-mark"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2.5l1.9 5.1a3 3 0 0 0 1.8 1.8l5.1 1.9-5.1 1.9a3 3 0 0 0-1.8 1.8L12 20.1l-1.9-5.1a3 3 0 0 0-1.8-1.8L3.2 11.3l5.1-1.9a3 3 0 0 0 1.8-1.8z" fill="#fff"/></svg></div>' +
        '<div id="aiEmptyText">' + t('empty') + '</div>'
      box.appendChild(empty)
    }
    syncCtx()
    toast(t('cleared'))
  }

  // ================================================================ 快捷指令面板（输入框旁）

  var promptPopOpen = false

  /** 渲染指令浮层的列表。与浮动指令条共用 getPrompts()，增删改三处同步。 */
  function renderPromptPop() {
    var box = $('aiPromptRows')
    if (!box) return
    box.innerHTML = ''
    var ps = getPrompts()
    if (!ps.length) {
      var e = document.createElement('div')
      e.className = 'ai-prompt-empty'
      e.textContent = t('promptEmpty')
      box.appendChild(e)
      return
    }
    for (var i = 0; i < ps.length; i++) {
      (function (p) {
        var row = document.createElement('button')
        row.className = 'ai-prompt-row'
        row.type = 'button'
        row.title = p.prompt           // 悬停看完整提示词
        var nm = document.createElement('span')
        nm.className = 'nm'
        nm.textContent = p.name
        var tx = document.createElement('span')
        tx.className = 'tx'
        tx.textContent = p.prompt
        row.appendChild(nm)
        row.appendChild(tx)
        row.addEventListener('click', function () { applyPresetToInput(p) })
        box.appendChild(row)
      })(ps[i])
    }
  }

  /**
   * 选中指令：与浮动指令条行为一致，直接以预设方式执行。
   * 避免填入输入框后走 QA 追问流程，导致上下文污染 / 首轮范围锁定 / 应用入口丢失。
   */
  function applyPresetToInput(p) {
    closePromptPop()
    runPreset(p)
  }

  function openPromptPop() {
    var pop = $('aiPromptPop')
    if (!pop) return
    renderPromptPop()
    pop.hidden = false
    void pop.offsetWidth            // 强制回流，否则过渡不生效
    pop.classList.add('show')
    promptPopOpen = true
    var btn = $('aiPromptBtn')
    if (btn) btn.classList.add('active')
  }

  function closePromptPop() {
    var pop = $('aiPromptPop')
    if (!pop || !promptPopOpen) return
    pop.classList.remove('show')
    promptPopOpen = false
    var btn = $('aiPromptBtn')
    if (btn) btn.classList.remove('active')
    clearTimeout(closePromptPop._t)
    closePromptPop._t = setTimeout(function () {
      if (!promptPopOpen) pop.hidden = true
    }, 150)
  }

  /** 把当前输入框内容存为自定义指令（mc-tool 的 saveCurrentAsPrompt） */
  function saveCurrentInputAsPrompt() {
    var input = $('aiInput')
    var text = input ? input.value.trim() : ''
    if (!text) { toast(t('promptEmptyInput')); return }
    upsertPrompt({
      id: 'custom_' + Date.now().toString(36),
      builtin: false,
      name: text.slice(0, 12),
      prompt: text
    })
    renderPromptList()
    renderChips()
    renderPromptPop()
    toast(t('promptSaved'))
    closePromptPop()
  }

  function openPromptManage() {
    closePromptPop()
    openSettings()
  }

  // ================================================================ 设置弹窗

  function openModal(id) {
    var el = $(id)
    if (!el) return
    el.hidden = false
    void el.offsetWidth
    el.classList.add('show')
  }
  function closeModal(id) {
    var el = $(id)
    if (!el) return
    el.classList.remove('show')
    clearTimeout(closeModal._t)
    closeModal._t = setTimeout(function () { el.hidden = true }, 180)
  }

  function refreshChannel() {
    var box = $('aiChannelStatus')
    var txt = $('aiChannelText')
    var btn = $('aiToggleBtn')
    if (!box || !txt) return

    var info = state.probeInfo
    box.className = 'ai-status'
    if (btn) btn.classList.remove('need-setup', 'unavailable')

    if (!info || info.mode === 'none') {
      box.classList.add('err')
      txt.textContent = t('channelNone')
      if (btn) btn.classList.add('need-setup', 'unavailable')
    } else if (info.mode === 'direct') {
      box.classList.add('warn')
      var cfg = global.KattyAI && global.KattyAI.getDirectConfig ? global.KattyAI.getDirectConfig() : null
      txt.textContent = fmt(t('channelDirect'), { model: (cfg && cfg.model) || '—' })
      if (btn) btn.classList.add('need-setup')
    } else {
      if (!info.configured) {
        box.classList.add('warn')
        txt.textContent = fmt(t('channelExtensionNoKey'), { provider: info.providerName || '—' })
        if (btn) btn.classList.add('need-setup')
      } else {
        box.classList.add('ok')
        txt.textContent = fmt(t('channelExtension'), {
          v: info.version || '—',
          provider: info.providerName || '—',
          model: info.model || '—'
        })
      }
    }
    fillModelSelect()
  }

  function fillModelSelect() {
    var sel = $('aiModelSelect')
    if (!sel) return
    var prev = state.model
    sel.innerHTML = ''
    var info = state.probeInfo
    var models = (info && info.models) || []
    var cur = (info && info.model) || ''

    if (!models.length && cur) models = [cur]
    if (!models.length) {
      var cfg = global.KattyAI && global.KattyAI.getDirectConfig ? global.KattyAI.getDirectConfig() : null
      if (cfg && cfg.model) models = [cfg.model]
    }
    if (!models.length) {
      var o0 = document.createElement('option')
      o0.textContent = t('channelTitleNone')
      sel.appendChild(o0)
      return
    }
    for (var i = 0; i < models.length; i++) {
      var o = document.createElement('option')
      o.value = models[i]
      o.textContent = models[i]
      sel.appendChild(o)
    }
    sel.value = (prev && models.indexOf(prev) !== -1) ? prev : (cur || models[0])
    state.model = sel.value
    sel.title = t('modelTitle')
  }

  function renderPromptList() {
    var box = $('aiPromptList')
    if (!box) return
    box.innerHTML = ''
    var ps = getPrompts()

    // 当前拖拽行的下标。挂在闭包里，drop 时与目标行配合算出插入位置。
    var dragIdx = -1

    function clearDropMarks() {
      var rows = box.children
      for (var i = 0; i < rows.length; i++) {
        rows[i].classList.remove('drop-above', 'drop-below')
      }
    }

    for (var i = 0; i < ps.length; i++) {
      (function (p, idx) {
        var row = document.createElement('div')
        row.className = 'ai-prompt-item'

        // 拖拽手柄。行默认不可拖，按住手柄才临时开启——整行 draggable
        // 会吞掉名称的文字选中，编辑/删除按钮也容易误触发拖拽。
        var grip = document.createElement('span')
        grip.className = 'grip'
        grip.title = t('dragSort')
        grip.innerHTML = '<svg viewBox="0 0 20 20" fill="none"><path d="M7 5.5h.01M13 5.5h.01M7 10h.01M13 10h.01M7 14.5h.01M13 14.5h.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>'
        grip.addEventListener('mousedown', function () { row.draggable = true })
        grip.addEventListener('mouseup', function () { row.draggable = false })
        row.appendChild(grip)

        var name = document.createElement('span')
        name.className = 'name'
        name.textContent = p.name
        name.title = p.prompt
        row.appendChild(name)
        row.appendChild(iconBtn(ICON_PENCIL, t('settings'), function () { editPromptRow(row, p) }))
        row.appendChild(iconBtn(ICON_TRASH, t('delete'), function () {
          deletePrompt(p)
          renderPromptList()
          renderChips()
        }))

        row.addEventListener('dragstart', function (e) {
          dragIdx = idx
          row.classList.add('dragging')
          e.dataTransfer.effectAllowed = 'move'
          try { e.dataTransfer.setData('text/plain', String(idx)) } catch (err) { /* IE 兼容环境忽略 */ }
        })
        row.addEventListener('dragend', function () {
          row.draggable = false
          row.classList.remove('dragging')
          dragIdx = -1
          clearDropMarks()
        })
        row.addEventListener('dragover', function (e) {
          if (dragIdx === -1 || dragIdx === idx) return
          e.preventDefault()
          e.dataTransfer.dropEffect = 'move'
          // 指针落在行的上半/下半决定插到目标之前还是之后
          var rect = row.getBoundingClientRect()
          var below = (e.clientY - rect.top) > rect.height / 2
          row.classList.toggle('drop-above', !below)
          row.classList.toggle('drop-below', below)
        })
        row.addEventListener('dragleave', function () {
          row.classList.remove('drop-above', 'drop-below')
        })
        row.addEventListener('drop', function (e) {
          e.preventDefault()
          if (dragIdx === -1 || dragIdx === idx) return
          var rect = row.getBoundingClientRect()
          var below = (e.clientY - rect.top) > rect.height / 2
          var from = dragIdx
          var to = idx + (below ? 1 : 0)
          if (from < to) to--  // 先移除再插入，目标位需要左移一位
          if (to === from) return
          var next = ps.slice()
          var moved = next.splice(from, 1)[0]
          next.splice(to, 0, moved)
          persistOrder(next)
          renderPromptList()
          renderChips()
        })

        box.appendChild(row)
      })(ps[i], i)
    }
  }

  function editPromptRow(row, p) {
    row.innerHTML = ''
    row.style.flexWrap = 'wrap'

    var nameI = document.createElement('input')
    nameI.type = 'text'
    nameI.value = p ? p.name : ''
    nameI.placeholder = t('promptName')

    var promptI = document.createElement('textarea')
    promptI.value = p ? p.prompt : ''
    promptI.rows = 3
    promptI.placeholder = t('promptText')
    promptI.style.cssText = 'width:100%;margin-top:6px;padding:6px 8px;border:1px solid var(--kbai-border);border-radius:6px;background:var(--kbai-bg-soft);color:var(--kbai-text);font-family:inherit;font-size:12px;resize:vertical'

    var acts = document.createElement('div')
    acts.style.cssText = 'display:flex;gap:6px;margin-top:6px;width:100%'

    var saveB = document.createElement('button')
    saveB.className = 'ai-btn primary'
    saveB.type = 'button'
    saveB.textContent = t('save')

    var cancelB = document.createElement('button')
    cancelB.className = 'ai-btn ghost'
    cancelB.type = 'button'
    cancelB.textContent = t('cancel')

    saveB.addEventListener('click', function () {
      var nm = nameI.value.trim()
      var pm = promptI.value.trim()
      if (!nm || !pm) { toast(t('needNamePrompt')); return }
      upsertPrompt({
        id: p ? p.id : ('custom_' + Date.now().toString(36)),
        builtin: !!(p && p.builtin),
        name: nm,
        prompt: pm
      })
      renderPromptList()
      renderChips()
    })
    cancelB.addEventListener('click', function () { renderPromptList() })

    acts.appendChild(saveB)
    acts.appendChild(cancelB)
    row.appendChild(nameI)
    row.appendChild(promptI)
    row.appendChild(acts)
    nameI.focus()
  }

  /**
   * 回填「直连设置」。
   *
   * 扩展通道下用扩展当前供应商的地址与模型回填，让设置里看到的就是真正在用的那条连接，
   * 不用再手抄一遍；API Key 按扩展的安全边界不回传页面，留空并换成说明性占位文案。
   * 没有扩展（或扩展尚未探测到）时仍用本页面的直连存档，行为与改动前一致。
   */
  function fillDirectForm() {
    var cfg = (global.KattyAI && global.KattyAI.getDirectConfig) ? global.KattyAI.getDirectConfig() : null
    var info = state.probeInfo
    var fromExt = !!(info && info.mode === 'extension' && info.baseUrl)

    var base = $('aiDirectBase')
    var key = $('aiDirectKey')
    var model = $('aiDirectModel')
    var hint = $('aiDirectFromExt')

    if (base) base.value = fromExt ? info.baseUrl : (cfg ? cfg.baseUrl : '')
    if (model) model.value = fromExt ? (info.model || (cfg ? cfg.model : '')) : (cfg ? cfg.model : '')
    if (key) {
      key.value = fromExt ? '' : (cfg ? cfg.apiKey : '')
      key.placeholder = fromExt ? t('directKeyKeptByExt') : 'sk-...'
    }
    if (hint) {
      hint.hidden = !fromExt
      if (fromExt) hint.textContent = fmt(t('directFromExt'), { provider: info.providerName || '—' })
    }
  }

  function openSettings() {
    refreshChannel()
    fillDirectForm()
    renderPromptList()
    openModal('aiSettingsOverlay')
  }

  // ================================================================ i18n

  function applyAiLang() {
    var set = function (id, val, prop) {
      var el = $(id)
      if (!el) return
      if (prop === 'placeholder') el.placeholder = val
      else if (prop === 'title') el.title = val
      else el.textContent = val
    }

    set('aiToggleLabel', t('ai'))
    set('aiToggleBtn', t('panelTitle'), 'title')
    set('aiPanelTitleText', t('panelTitle'))
    set('aiEmptyText', t('empty'))
    set('aiInput', t('placeholder'), 'placeholder')
    set('aiFloatOpen', t('chat'))
    set('aiFloatStatusText', state.busy ? t('generating') : '')
    set('aiSettingsTitle', t('panelTitle'))
    set('aiSecChannelTitle', t('channelSection'))
    set('aiSecDirectTitle', t('directTitle'))
    set('aiSecPromptsTitle', t('promptsTitle'))
    set('aiOpenExtOptions', t('openExtOptions'))
    set('aiReprobe', t('reprobe'))
    set('aiPromptBtn', t('promptPop'), 'title')
    set('aiPromptSaveCur', t('promptSaveCur'))
    set('aiPromptManage', t('promptManage'))
    set('aiDirectSave', t('directSave'))
    set('aiDirectHint', t('directHint'))
    set('aiPromptAdd', t('promptAdd'))
    set('aiClearBtn', t('clearChat'), 'title')
    set('aiCopyBtn', t('copyChat'), 'title')
    set('aiSettingsBtn', t('settings'), 'title')
    set('aiPanelCloseBtn', t('close'), 'title')
    set('aiDiffDiscard', t('cancel'))
    set('aiDiffRetry', t('delete') === '' ? '' : t('retry') || '重试')
    set('aiDiffAccept', '接受并替换')

    var labels = {
      statLines: curLang() === 'en' ? '+{add} / -{del} lines' : '+{add} 行 / -{del} 行',
      statChars: curLang() === 'en' ? '{old} → {new} chars ({delta})' : '{old} 字 → {new} 字（{delta}）',
      driftTitle: curLang() === 'en' ? 'Document changed' : '文档已变更',
      driftText: curLang() === 'en'
        ? 'The selected text was modified while generating. To avoid overwriting your edits, the replacement was cancelled. Please select again.'
        : '选中的内容在生成期间被修改过了，为避免覆盖你的改动，已取消本次替换。请重新选择后再试。',
      driftOk: curLang() === 'en' ? 'OK' : '知道了',
      title: curLang() === 'en' ? 'Confirm replacement' : '确认替换',
      readOnlyDenied: t('readOnlyDenied')
    }
    if (global.AiDiff && global.AiDiff.setLabels) global.AiDiff.setLabels(labels)

    renderChips()
    syncCtx()
    refreshChannel()
    // 设置弹层开着时切语言：来源提示与 Key 占位文案也要跟着换，
    // 否则会停在上一次 fillDirectForm 用的语言上
    fillDirectForm()
  }

  // ================================================================ 初始化

  function init() {
    if (global.AiDiff && global.AiDiff.bind) global.AiDiff.bind()

    var ed = getEditor()
    var fb = $('aiFloatBar')

    // 点击指令条时保住 textarea 的选区与焦点
    if (fb) fb.addEventListener('mousedown', function (e) { e.preventDefault() })

    // ---- 选区变化 → 浮动指令条 ----
    function schedule() {
      clearTimeout(selTimer)
      selTimer = setTimeout(function () {
        var s = getSel()
        if (s && s.text.trim()) {
          state.sel = s
          syncCtx()
          showFloatBar(lastMouse.x, lastMouse.y)
        } else {
          hideFloatBar()
        }
      }, 120)
    }

    if (ed) {
      ed.addEventListener('mouseup', function (e) {
        // 只响应左键。右键的 mouseup 也会走到这里，导致 AI 指令条在格式菜单
        // 弹出的同时重新浮出，两者重叠（见 1.10.1）
        if (e.button !== 0) return
        lastMouse = { x: e.clientX, y: e.clientY }
        schedule()
      })
      ed.addEventListener('keyup', function () {
        lastMouse = { x: null, y: null }
        schedule()
      })
      ed.addEventListener('scroll', hideFloatBar)
      ed.addEventListener('blur', function () {
        setTimeout(function () {
          if (document.activeElement !== fb && !(fb && fb.contains(document.activeElement))) hideFloatBar()
        }, 0)
      })
    }

    document.addEventListener('mousedown', function (e) {
      if (!fb || fb.hidden) return
      if (fb.contains(e.target)) return
      hideFloatBar()
    })

    // 右键会弹出 app.js 的格式菜单 #fmtContextMenu，与 AI 指令条位置重叠，
    // 立即收起指令条（跳过淡出动画，避免两帧的重叠残影）
    document.addEventListener('contextmenu', function () { hideFloatBar(true) })

    // ---- 指令条按钮 ----
    var floatClose = $('aiFloatClose')
    var floatOpen = $('aiFloatOpen')
    if (floatClose) floatClose.addEventListener('click', hideFloatBar)
    if (floatOpen) floatOpen.addEventListener('click', function () {
      syncCtx()
      openPanel()
      hideFloatBar()
    })

    // ---- 侧边栏 ----
    var ctxToggle = $('aiCtxToggle')
    if (ctxToggle) ctxToggle.addEventListener('click', function () {
      var card = $('aiCtx')
      if (card) card.classList.toggle('collapsed')
    })
    var clearBtn = $('aiClearBtn')
    if (clearBtn) clearBtn.addEventListener('click', clearChat)
    var copyBtn = $('aiCopyBtn')
    if (copyBtn) copyBtn.addEventListener('click', copyChatMarkdown)
    var settingsBtn = $('aiSettingsBtn')
    if (settingsBtn) settingsBtn.addEventListener('click', openSettings)
    var panelClose = $('aiPanelCloseBtn')
    if (panelClose) panelClose.addEventListener('click', closePanel)
    var toggleBtn = $('aiToggleBtn')
    if (toggleBtn) toggleBtn.title = t('panelTitle')

    var modelSel = $('aiModelSelect')
    if (modelSel) modelSel.addEventListener('change', function () { state.model = modelSel.value })

    var input = $('aiInput')
    if (input) {
      input.addEventListener('input', function () {
        input.style.height = 'auto'
        input.style.height = Math.min(130, input.scrollHeight) + 'px'
      })
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          if (state.busy) {
            if (state.controller) state.controller.abort()
          } else {
            sendFollowUp()
          }
        }
      })
      // 粘贴图片：拦截默认的「把文件名当文本粘进来」，转为附件
      input.addEventListener('paste', function (e) {
        var cd = e.clipboardData || (e.originalEvent && e.originalEvent.clipboardData)
        if (!cd || !cd.items) return
        var files = []
        for (var i = 0; i < cd.items.length; i++) {
          if (cd.items[i].kind === 'file') {
            var f = cd.items[i].getAsFile()
            if (f) files.push(f)
          }
        }
        if (files.length) {
          e.preventDefault()
          for (var j = 0; j < files.length; j++) addAttachment(files[j])
        }
      })
    }

    // 拖拽图片到输入框也能添加附件（dragover 时高亮提示）
    var composer = document.querySelector('.ai-composer')
    if (composer) {
      composer.addEventListener('dragover', function (e) {
        if (e.dataTransfer && Array.prototype.some.call(e.dataTransfer.items || [], function (it) { return it.kind === 'file' })) {
          e.preventDefault()
          composer.classList.add('drag')
        }
      })
      composer.addEventListener('dragleave', function () { composer.classList.remove('drag') })
      composer.addEventListener('drop', function (e) {
        composer.classList.remove('drag')
        if (!e.dataTransfer || !e.dataTransfer.files) return
        var has = Array.prototype.some.call(e.dataTransfer.files, function (f) { return f.type.indexOf('image/') === 0 })
        if (!has) return
        e.preventDefault()
        for (var i = 0; i < e.dataTransfer.files.length; i++) addAttachment(e.dataTransfer.files[i])
      })
    }
    var sendBtn = $('aiSendBtn')
    if (sendBtn) sendBtn.addEventListener('click', function () {
      if (state.busy) {
        if (state.controller) state.controller.abort()
      } else {
        sendFollowUp()
      }
    })

    // ---- 快捷指令面板 ----
    var promptBtn = $('aiPromptBtn')
    if (promptBtn) promptBtn.addEventListener('click', function () {
      if (promptPopOpen) closePromptPop()
      else openPromptPop()
    })
    var psave = $('aiPromptSaveCur')
    if (psave) psave.addEventListener('click', saveCurrentInputAsPrompt)
    var pman = $('aiPromptManage')
    if (pman) pman.addEventListener('click', openPromptManage)
    // 点外部关闭（与 mc-tool 的 onDocClick 一致）
    document.addEventListener('mousedown', function (e) {
      if (!promptPopOpen) return
      var pop = $('aiPromptPop')
      if (pop && pop.contains(e.target)) return
      if (promptBtn && promptBtn.contains(e.target)) return
      closePromptPop()
    })

    // ---- 设置弹窗 ----
    var sClose = $('aiSettingsClose')
    if (sClose) sClose.addEventListener('click', function () { closeModal('aiSettingsOverlay') })
    var sOverlay = $('aiSettingsOverlay')
    if (sOverlay) sOverlay.addEventListener('mousedown', function (e) {
      if (e.target === sOverlay) closeModal('aiSettingsOverlay')
    })
    var openExt = $('aiOpenExtOptions')
    if (openExt) openExt.addEventListener('click', function () {
      if (global.KattyAI && global.KattyAI.openOptions) global.KattyAI.openOptions()
      else toast(t('channelNone'))
    })
    var reprobe = $('aiReprobe')
    if (reprobe) reprobe.addEventListener('click', function () {
      probeTries = 0
      probe()
    })

    // 装完扩展后从别的窗口/标签切回来时，立即重新握手，省得用户手动刷新
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState !== 'visible') return
      clearTimeout(probeTimer)
      probeTries = 0
      probe()
    })
    var directSave = $('aiDirectSave')
    if (directSave) directSave.addEventListener('click', function () {
      if (!global.KattyAI) return
      global.KattyAI.setDirectConfig({
        baseUrl: ($('aiDirectBase') || {}).value || '',
        apiKey: ($('aiDirectKey') || {}).value || '',
        model: ($('aiDirectModel') || {}).value || ''
      })
      global.KattyAI.resetProbe()
      toast(t('directSaved'))
      probe()
    })
    var promptAdd = $('aiPromptAdd')
    if (promptAdd) promptAdd.addEventListener('click', function () {
      var box = $('aiPromptList')
      if (!box) return
      var row = document.createElement('div')
      row.className = 'ai-prompt-item'
      box.appendChild(row)
      editPromptRow(row, null)
    })

    // ---- Esc 关闭最上层弹窗 ----
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return
      var diff = $('aiDiffOverlay')
      var setg = $('aiSettingsOverlay')
      if (diff && !diff.hidden) { if (global.AiDiff) global.AiDiff.close(); return }
      if (setg && !setg.hidden) { closeModal('aiSettingsOverlay'); return }
      if (promptPopOpen) { closePromptPop(); return }
      if (!fb.hidden) hideFloatBar()
    })

    // ---- 接入 app.js 的语言切换（不修改 app.js）----
    var origSetLang = global.setLang
    global.setLang = function () {
      var r = typeof origSetLang === 'function' ? origSetLang.apply(this, arguments) : undefined
      applyAiLang()
      return r
    }

    renderChips()
    applyAiLang()
    probe()
  }

  /**
   * 探测通道。
   *
   * 为什么要重试：content script 由扩展注入，时机不受页面控制。页面加载完成时它可能
   * 还没就绪，首次 ping 会石沉大海，SDK 就把结果缓存成 'none' 且不再重试——表现为
   * 「扩展明明装好配好了，页面却一直显示 AI 不可用」。
   * 所以这里每次都先 resetProbe() 清缓存强制重发 ping，探测不到就按 2s 间隔重试，
   * 并在页面重新可见时（比如装完扩展切回来）立即再探一次。
   */
  var PROBE_RETRY_MAX = 15
  var PROBE_RETRY_MS = 2000
  var probeTries = 0
  var probeTimer = null

  function scheduleProbeRetry() {
    probeTries++
    clearTimeout(probeTimer)
    probeTimer = setTimeout(probe, PROBE_RETRY_MS)
  }

  function probe() {
    if (typeof global.KattyAI === 'undefined' || !global.KattyAI.probe) {
      state.probeInfo = { mode: 'none' }
      refreshChannel()
      return
    }
    global.KattyAI.resetProbe()   // 清掉缓存的探测结果，强制重新握手
    global.KattyAI.probe().then(function (info) {
      state.probeInfo = info
      refreshChannel()
      if (info.mode === 'none') {
        if (probeTries < PROBE_RETRY_MAX) scheduleProbeRetry()
      } else {
        probeTries = 0
      }
    }).catch(function () {
      state.probeInfo = { mode: 'none' }
      refreshChannel()
      if (probeTries < PROBE_RETRY_MAX) scheduleProbeRetry()
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})(window)
