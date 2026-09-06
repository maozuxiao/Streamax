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
      directSaved: '已保存直连设置',
      directBase: 'API 地址',
      directKey: 'API Key',
      directModel: '模型',
      promptsTitle: '自定义指令',
      promptAdd: '＋ 新增指令',
      promptName: '指令名称',
      promptText: '提示词内容',
      save: '保存',
      cancel: '取消',
      delete: '删除',
      needNamePrompt: '名称与提示词都不能为空',
      clearConfirm: '清空当前会话？',
      settings: '设置',
      clearChat: '清空会话',
      close: '收起',
      modelTitle: '当前模型（可在扩展设置中切换）'
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
      directSaved: 'Direct settings saved',
      directBase: 'API base URL',
      directKey: 'API Key',
      directModel: 'Model',
      promptsTitle: 'Custom instructions',
      promptAdd: '＋ Add instruction',
      promptName: 'Name',
      promptText: 'Prompt',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      needNamePrompt: 'Name and prompt cannot be empty',
      clearConfirm: 'Clear this conversation?',
      settings: 'Settings',
      clearChat: 'Clear conversation',
      close: 'Collapse',
      modelTitle: 'Current model (change in extension options)'
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
    baseSel: null,      // 本轮会话要替换的目标选区，生成期间不随用户改选而变
    history: [],        // 多轮上下文（不含 system）
    busy: false,
    controller: null,
    panelOpen: false,
    probeInfo: null,
    model: ''
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
    return builtins.concat(custom)
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
    if (s) state.sel = s
    if (state.sel && state.sel.text) {
      if (label) label.textContent = fmt(t('ctxSel'), { n: state.sel.text.length })
      if (body) body.textContent = state.sel.text.length > 300 ? state.sel.text.slice(0, 300) + '…' : state.sel.text
    } else {
      if (label) label.textContent = t('ctxNone')
      if (body) body.textContent = ''
    }
  }

  function scrollBottom() {
    var box = $('aiMessages')
    if (box) box.scrollTop = box.scrollHeight
  }

  function appendUserMsg(text) {
    var box = $('aiMessages')
    if (!box) return null
    var empty = $('aiEmpty')
    if (empty && empty.parentNode) empty.parentNode.removeChild(empty)
    var wrap = document.createElement('div')
    wrap.className = 'ai-msg user'
    var bub = document.createElement('div')
    bub.className = 'ai-bubble'
    bub.textContent = text
    wrap.appendChild(bub)
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
    box.appendChild(wrap)
    scrollBottom()
    return { wrap: wrap, bubble: bub, text: textEl, caret: caret }
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
   * @param {string} content   发给模型的 user 内容
   * @param {string} display   界面上展示的文字
   * @param {Object} opts      { autoDiff: boolean }
   */
  function runTurn(content, display, opts) {
    opts = opts || {}
    if (typeof global.KattyAI === 'undefined') { toast(t('channelNone')); return }
    if (state.busy) return

    var snapshot = state.history.slice()
    state.history.push({ role: 'user', content: content })
    appendUserMsg(display)

    // 替换目标锁定为发起时的选区（追问场景沿用会话首轮的选区）。
    // 若改用实时的 state.sel，生成过程中用户一改选，diff 就会比对错位。
    if (state.sel) state.baseSel = state.sel
    var runSel = state.baseSel

    var messages = [{ role: 'system', content: systemPrompt() }].concat(state.history)
    var msg = appendAiMsg()
    if (!msg) return

    setBusy(true, display)
    state.controller = new AbortController()

    global.KattyAI.chat({
      messages: messages,
      model: state.model || undefined,
      signal: state.controller.signal,
      onDelta: function (chunk, full) {
        if (msg.text) msg.text.textContent = full
        scrollBottom()
      }
    }).then(function (text) {
      setBusy(false)
      state.history.push({ role: 'assistant', content: text })
      if (msg.text) msg.text.textContent = text
      if (msg.caret) msg.caret.style.display = 'none'

      var retry = function () { state.history = snapshot; runTurn(content, display, opts) }
      if (runSel) addApplyButton(msg, runSel, text, retry)
      if (opts.autoDiff && runSel) openDiffFor(runSel, text, retry)
    }).catch(function (err) {
      setBusy(false)
      state.history = snapshot
      if (msg.caret) msg.caret.style.display = 'none'
      var code = err && err.code
      if (code === 'ABORTED') {
        if (msg.wrap && msg.wrap.parentNode && !msg.text.textContent) msg.wrap.parentNode.removeChild(msg.wrap)
        return
      }
      if (msg.text) {
        msg.text.textContent = ''
        var em = document.createElement('span')
        em.style.color = 'var(--ai-err)'
        em.textContent = (err && err.message) || '请求失败'
        msg.text.appendChild(em)
      }
      toast((err && err.message) || '请求失败')
    })
  }

  function runPreset(p) {
    var sel = getSel()
    if (!sel) { toast(t('needSelection')); return }
    state.sel = sel
    state.history = []
    syncCtx()
    runTurn(userContent(p.prompt, sel.text), p.name, { autoDiff: true })
  }

  function sendFollowUp() {
    var input = $('aiInput')
    if (!input) return
    var text = input.value.trim()
    if (!text || state.busy) return

    if (!state.history.length) {
      var sel = getSel()
      if (!sel) { toast(t('needSelection')); return }
      state.sel = sel
      syncCtx()
      runTurn(userContent(text, sel.text), text, { autoDiff: true })
    } else {
      runTurn(text, text, { autoDiff: false })
    }
    input.value = ''
    input.style.height = 'auto'
  }

  function clearChat() {
    if (state.history.length && !global.confirm(t('clearConfirm'))) return
    state.history = []
    state.baseSel = null
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
   * 选中指令：填入输入框而非直接发送（参照 mc-tool 的 applyPrompt）。
   * 用户可以在此基础上改字，再自己回车发送——比一键直发更可控。
   */
  function applyPresetToInput(p) {
    var input = $('aiInput')
    if (!input) return
    input.value = p.prompt
    closePromptPop()
    input.focus()
    input.style.height = 'auto'
    input.style.height = Math.min(130, input.scrollHeight) + 'px'
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
    for (var i = 0; i < ps.length; i++) {
      (function (p) {
        var row = document.createElement('div')
        row.className = 'ai-prompt-item'
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
        box.appendChild(row)
      })(ps[i])
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
    promptI.style.cssText = 'width:100%;margin-top:6px;padding:6px 8px;border:1px solid var(--ai-border);border-radius:6px;background:var(--ai-bg-soft);color:var(--ai-text);font-family:inherit;font-size:12px;resize:vertical'

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

  function fillDirectForm() {
    var cfg = (global.KattyAI && global.KattyAI.getDirectConfig) ? global.KattyAI.getDirectConfig() : null
    var base = $('aiDirectBase')
    var key = $('aiDirectKey')
    var model = $('aiDirectModel')
    if (base) base.value = cfg ? cfg.baseUrl : ''
    if (key) key.value = cfg ? cfg.apiKey : ''
    if (model) model.value = cfg ? cfg.model : ''
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
