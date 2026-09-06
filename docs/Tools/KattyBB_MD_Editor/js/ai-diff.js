/**
 * Katty AI — 行级 diff 与「确认替换」弹窗
 *
 * 项目是免构建纯静态页且无 diff 库，这里手写行级 LCS。
 * 输入规模限于用户选区（通常几十行），性能无虞；另加了矩阵规模上限保护。
 *
 * 撤销：本项目有自研撤销栈（app.js 6155-6248）。程序化改 editor.value 不会触发 input 事件，
 * 因此必须手动登记。惯用法是 saveUndoPoint() + flushUndoPoint() 连用实现「立即入栈」。
 * ⚠ 绝不能调用 resetUndo()——它会把栈压成 1 项，导致 fmtUndo 直接 return、撤销失效。
 */

;(function (global) {
  'use strict'

  var LCS_CELL_LIMIT = 4000000 // 超过则放弃对齐，退化为「整段删 + 整段增」

  var LABELS = {
    statLines: '+{add} 行 / -{del} 行',
    statChars: '{old} 字 → {new} 字（{delta}）',
    driftTitle: '文档已变更',
    driftText: '选中的内容在生成期间被修改过了，为避免覆盖你的改动，已取消本次替换。请重新选择后再试。',
    driftOk: '知道了',
    title: '确认替换',
    readOnlyDenied: '只读文档不可修改'
  }

  function setLabels(obj) {
    if (obj) for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) LABELS[k] = obj[k]
  }

  // ---------------------------------------------------------------- diff

  function splitLines(text) {
    return String(text == null ? '' : text).split('\n')
  }

  /** 返回操作序列：0=相等，-1=删除，1=新增 */
  function lcsOps(a, b) {
    var n = a.length
    var m = b.length
    var dp = new Array(n + 1)
    var i
    var j
    for (i = 0; i <= n; i++) dp[i] = new Uint32Array(m + 1)
    for (i = n - 1; i >= 0; i--) {
      for (j = m - 1; j >= 0; j--) {
        dp[i][j] = a[i] === b[j]
          ? dp[i + 1][j + 1] + 1
          : (dp[i + 1][j] >= dp[i][j + 1] ? dp[i + 1][j] : dp[i][j + 1])
      }
    }
    var ops = []
    i = 0
    j = 0
    while (i < n && j < m) {
      if (a[i] === b[j]) { ops.push(0); i++; j++ } else if (dp[i + 1][j] >= dp[i][j + 1]) { ops.push(-1); i++ } else { ops.push(1); j++ }
    }
    while (i < n) { ops.push(-1); i++ }
    while (j < m) { ops.push(1); j++ }
    return ops
  }

  /**
   * @returns {Array<{type:'equal'|'del'|'add', text:string, oldNo:number|null, newNo:number|null}>}
   */
  function diffLines(oldText, newText) {
    var a = splitLines(oldText)
    var b = splitLines(newText)
    var n = a.length
    var m = b.length
    var out = []
    var i

    // 剥离公共前后缀，缩小 LCS 矩阵
    var start = 0
    while (start < n && start < m && a[start] === b[start]) start++
    var endA = n
    var endB = m
    while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) { endA--; endB-- }

    for (i = 0; i < start; i++) out.push({ type: 'equal', text: a[i], oldNo: i + 1, newNo: i + 1 })

    var la = endA - start
    var lb = endB - start
    var oi = start
    var ni = start

    if (la && lb && la * lb <= LCS_CELL_LIMIT) {
      var ops = lcsOps(a.slice(start, endA), b.slice(start, endB))
      for (i = 0; i < ops.length; i++) {
        if (ops[i] === 0) {
          out.push({ type: 'equal', text: a[oi], oldNo: oi + 1, newNo: ni + 1 }); oi++; ni++
        } else if (ops[i] === -1) {
          out.push({ type: 'del', text: a[oi], oldNo: oi + 1, newNo: null }); oi++
        } else {
          out.push({ type: 'add', text: b[ni], oldNo: null, newNo: ni + 1 }); ni++
        }
      }
    } else {
      for (i = start; i < endA; i++) out.push({ type: 'del', text: a[i], oldNo: i + 1, newNo: null })
      for (i = start; i < endB; i++) out.push({ type: 'add', text: b[i], oldNo: null, newNo: i + 1 })
    }

    for (i = endA; i < n; i++) {
      out.push({ type: 'equal', text: a[i], oldNo: i + 1, newNo: endB + (i - endA) + 1 })
    }
    return out
  }

  // ---------------------------------------------------------------- 渲染

  function renderCol(el, rows, side) {
    el.innerHTML = ''
    var frag = document.createDocumentFragment()
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i]
      if (side === 'old' && r.type === 'add') continue
      if (side === 'new' && r.type === 'del') continue

      var div = document.createElement('div')
      div.className = 'ai-dl ' + (r.type === 'equal' ? 'eq' : r.type === 'del' ? 'del' : 'add')

      var ln = document.createElement('span')
      ln.className = 'ln'
      var no = side === 'old' ? r.oldNo : r.newNo
      ln.textContent = no ? String(no) : ''

      var tx = document.createElement('span')
      tx.className = 'tx'
      tx.textContent = r.text === '' ? ' ' : r.text // 空行给个空格，保持行高

      div.appendChild(ln)
      div.appendChild(tx)
      frag.appendChild(div)
    }
    el.appendChild(frag)
  }

  function statText(oldText, newText, rows) {
    var add = 0
    var del = 0
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].type === 'add') add++
      else if (rows[i].type === 'del') del++
    }
    var d = newText.length - oldText.length
    var parts = []
    if (add || del) parts.push(LABELS.statLines.replace('{add}', add).replace('{del}', del))
    parts.push(LABELS.statChars
      .replace('{old}', oldText.length)
      .replace('{new}', newText.length)
      .replace('{delta}', (d >= 0 ? '+' : '') + d))
    return parts.join('　·　')
  }

  function renderDrift(body) {
    body.innerHTML = ''
    var box = document.createElement('div')
    box.className = 'ai-warnbox'

    var ico = document.createElement('div')
    ico.className = 'ico'
    ico.innerHTML = '<svg viewBox="0 0 20 20" fill="none"><path d="M10 6.5v5M10 14h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="10" cy="10" r="7.5" stroke="currentColor" stroke-width="1.5"/></svg>'

    var txt = document.createElement('div')
    txt.className = 'txt'
    txt.textContent = LABELS.driftText

    var ok = document.createElement('button')
    ok.className = 'ai-btn primary'
    ok.type = 'button'
    ok.textContent = LABELS.driftOk
    ok.addEventListener('click', close)

    box.appendChild(ico)
    box.appendChild(txt)
    box.appendChild(ok)
    body.appendChild(box)

    var okBtn = document.getElementById('aiDiffAccept')
    if (okBtn) okBtn.disabled = true
    var retryBtn = document.getElementById('aiDiffRetry')
    if (retryBtn) retryBtn.disabled = true
  }

  // ---------------------------------------------------------------- 弹窗

  var current = null

  function open(opts) {
    var overlay = document.getElementById('aiDiffOverlay')
    var body = document.getElementById('aiDiffBody')
    if (!overlay || !body) return

    current = {
      oldText: opts.oldText,
      newText: opts.newText,
      start: opts.start,
      end: opts.end,
      onAccept: opts.onAccept,
      onRetry: opts.onRetry
    }

    var titleEl = document.getElementById('aiDiffTitle')
    if (titleEl) titleEl.textContent = LABELS.title

    var acceptBtn = document.getElementById('aiDiffAccept')
    var retryBtn = document.getElementById('aiDiffRetry')
    if (acceptBtn) acceptBtn.disabled = false
    if (retryBtn) retryBtn.disabled = false

    // 恢复双栏结构（可能上次被替换成漂移警示）
    body.innerHTML =
      '<div class="ai-diff-cols">' +
        '<div class="ai-diff-col"><div class="ai-diff-label" id="aiDiffLabelOld"></div><div class="ai-diff-code" id="aiDiffOld"></div></div>' +
        '<div class="ai-diff-col"><div class="ai-diff-label" id="aiDiffLabelNew"></div><div class="ai-diff-code" id="aiDiffNew"></div></div>' +
      '</div>'

    var rows = diffLines(current.oldText, current.newText)
    renderCol(document.getElementById('aiDiffOld'), rows, 'old')
    renderCol(document.getElementById('aiDiffNew'), rows, 'new')

    var statEl = document.getElementById('aiDiffStat')
    if (statEl) statEl.textContent = statText(current.oldText, current.newText, rows)

    var oldLbl = document.getElementById('aiDiffLabelOld')
    var newLbl = document.getElementById('aiDiffLabelNew')
    if (oldLbl) oldLbl.textContent = opts.labelOld || '原文'
    if (newLbl) newLbl.textContent = opts.labelNew || '改写后'

    overlay.hidden = false
    // 强制回流后再加 show，否则从 hidden 切过来时过渡不生效
    void overlay.offsetWidth
    overlay.classList.add('show')
  }

  function close() {
    var overlay = document.getElementById('aiDiffOverlay')
    if (!overlay) return
    overlay.classList.remove('show')
    clearTimeout(close._t)
    close._t = setTimeout(function () { overlay.hidden = true }, 180)
    current = null
  }

  function isOpen() {
    var overlay = document.getElementById('aiDiffOverlay')
    return !!overlay && !overlay.hidden
  }

  /**
   * 写回编辑器。返回 false 表示选区已漂移、未执行替换。
   */
  function accept() {
    if (!current) return false
    var ed = document.getElementById('editor')
    if (!ed) return false

    // 只读态（?file=...&ro=1 载入的远程文档）禁止写入。
    // editor.readOnly 只拦截用户输入，拦不住程序化赋值，必须在这里显式判断，
    // 否则 AI 的「应用到文档」会绕过只读语义把远程文档改掉。
    if (ed.readOnly || global._remoteReadOnly) {
      if (typeof global.showToast === 'function') global.showToast(LABELS.readOnlyDenied)
      return false
    }

    // 选区漂移校验：diff 预览期间用户可能改动过文档
    if (ed.value.substring(current.start, current.end) !== current.oldText) {
      var body = document.getElementById('aiDiffBody')
      if (body) renderDrift(body)
      return false
    }

    var before = ed.value
    var next = before.substring(0, current.start) + current.newText + before.substring(current.end)

    // 撤销栈登记：先结算未落盘输入 → 改值 → 立即入栈新内容
    if (typeof flushUndoPoint === 'function') flushUndoPoint()
    ed.value = next
    ed.selectionStart = current.start
    ed.selectionEnd = current.start + current.newText.length
    if (typeof saveUndoPoint === 'function') saveUndoPoint()
    if (typeof flushUndoPoint === 'function') flushUndoPoint()
    if (typeof fmtAfterEdit === 'function') fmtAfterEdit()

    var done = current.onAccept
    close()
    if (done) done(current.newText)
    return true
  }

  function retry() {
    if (current && current.onRetry) current.onRetry()
  }

  function bind() {
    var overlay = document.getElementById('aiDiffOverlay')
    if (!overlay) return

    var acceptBtn = document.getElementById('aiDiffAccept')
    var retryBtn = document.getElementById('aiDiffRetry')
    var discardBtn = document.getElementById('aiDiffDiscard')
    var closeBtn = document.getElementById('aiDiffClose')

    if (acceptBtn) acceptBtn.addEventListener('click', accept)
    if (retryBtn) retryBtn.addEventListener('click', retry)
    if (discardBtn) discardBtn.addEventListener('click', close)
    if (closeBtn) closeBtn.addEventListener('click', close)
    overlay.addEventListener('mousedown', function (e) {
      if (e.target === overlay) close()
    })
  }

  global.AiDiff = {
    diffLines: diffLines,
    open: open,
    close: close,
    isOpen: isOpen,
    accept: accept,
    retry: retry,
    setLabels: setLabels,
    bind: bind
  }
})(window)
