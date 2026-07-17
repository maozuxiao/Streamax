// ===== 初始化 =====
var editor = document.getElementById('editor');
var preview = document.getElementById('preview');
var previewPanel = document.getElementById('previewPanel');
var fileInput = document.getElementById('fileInput');
var fileNameEl = document.getElementById('fileName');
var statusLeft = document.getElementById('statusLeft');
var statusRight = document.getElementById('statusRight');
var toastEl = document.getElementById('toast');
var themeLink = document.getElementById('theme-link');

// ===== 国际化 (i18n) =====
var i18n = {
  zh: {
    // 按钮标题 / tooltip
    openFile: '打开本地 .md 文件',
    exportHTML: '导出为 HTML 文件',
    printPDF: '打印 / 导出 PDF',
    exportWord: '导出为 Word 文件',
    saveMD: '保存为 .md 文件',
    // 按钮文本
    openFileBtn: '打开文件',
    exportHTMLBtn: '导出 HTML',
    printPDFBtn: '打印 / PDF',
    exportWordBtn: '导出 Word',
    saveMDBtn: '保存 .md',
    syncScrollBtn: '同步滚动',
    wideScreenBtn: '宽屏',
    viewEditorOnly: '仅编辑',
    viewSplit: '编辑+预览',
    viewPreviewOnly: '仅预览',
    syncScroll: '同步滚动',
    syncScrollOn: '同步滚动已开启',
    syncScrollOff: '同步滚动已关闭',
    wideScreenOn: '宽屏模式',
    wideScreenOff: '退出宽屏',
    clearEditor: '清空编辑器内容',
    clearBtn: '清空',
    petShow: '显示宠物',
    petHide: '隐藏宠物',
    petToggleLabel: '宠物',
    noteShow: '显示笔记',
    noteHide: '隐藏笔记',
    noteToggleLabel: '笔记',
    noteTitle: '笔记',
    noteSwitchText: '切换为纯文本',
    noteSwitchRich: '切换为富文本',
    noteClearConfirm: '确定要清空笔记内容吗？',
    noteCleared: '笔记已清空',
    noteClearModalTitle: '清空笔记',
    noteClearConfirmText: '确定要清空所有笔记内容吗？此操作不可撤销。',
    noteClearConfirmBtn: '确定清空',
    noteClearCancelBtn: '取消',
    notePlaceholder: '在此输入笔记内容...',
    noteLinkPrompt: '请输入链接地址：',
    noteLinkTitle: '请输入链接标题：',
    noteLinkUrl: '请输入链接地址：',
    noteRichMode: '富文本',
    noteTextMode: '纯文本',
    noteBold: '加粗',
    noteItalic: '斜体',
    noteUnderline: '下划线',
    noteStrike: '删除线',
    noteFgColor: '字体颜色',
    noteBgColor: '高亮颜色',
    noteUL: '无序列表',
    noteOL: '有序列表',
    noteOutdent: '减少缩进',
    noteIndent: '增加缩进',
    noteLink: '插入链接',
    noteRemoveFormat: '清除格式',
    noteDefaultColor: '默认颜色',
    noteTransparentColor: '透明',
    noteClear: '清空笔记',
    noteHeading: '标题',
    noteHeadingH1: 'H1',
    noteHeadingH2: 'H2',
    noteHeadingH3: 'H3',
    noteHeadingNormal: '正文',
    noteLinkModalTitle: '插入链接',
    noteLinkLabelTitle: '标题',
    noteLinkLabelUrl: '地址',
    noteLinkCancel: '取消',
    noteLinkOk: '确定',
    logoTitle: 'KattyBB Markdown Editor',
    tocTitle: '目录',
    // 编辑器
    editorPlaceholder: '在此输入 Markdown 内容，或点击「打开文件」加载本地 .md 文件...',
    // 状态 / 文件名
    noFileOpen: '未打开文件',
    unnamed: '未命名',
    statusWords: '字数',
    statusLines: '行数',
    // Toast 消息
    fileOpened: '文件已打开',
    fileReadError: '读取文件失败',
    themeSwitched: '已切换主题',
    darkMode: '已切换到夜间模式',
    lightMode: '已切换到日间模式',
    contentCleared: '内容已清空',
    noContent: '编辑器中没有内容',
    htmlExported: 'HTML 文件已导出',
    wordExported: 'Word 文件已导出',
    mdSaved: '.md 文件已保存',
    dropFileHint: '请拖入 .md 或 .txt 文件',
    autoSaved: '内容已自动保存到本地',
    // 语言切换
    langSwitch: '切换语言',
    langZh: '中文',
    langEn: 'English',
    langSwitched: '已切换为中文',
    // 状态栏 / 主题菜单
    statusReady: '就绪',
    statusAutoSave: '内容自动保存中',
    themeGroupBloom: 'Bloom 系列',
    themeGroupOther: '其他主题',
    themeModeLabel: '显示模式',
    lightModeLabel: '日间',
    darkModeLabel: '夜间',
    // 格式工具栏
    fmtCut: '剪切',
    fmtCopy: '复制',
    fmtCopyBlock: '复制块',
    fmtDelete: '删除',
    fmtCopyPasteLabel: '复制 / 粘贴为…',
    fmtCopyMd: '复制为 Markdown',
    fmtCopyHtml: '复制为 HTML 代码',
    fmtCopySimp: '复制内容并简化格式',
    fmtCopyPlain: '复制为纯文本',
    fmtPastePlain: '粘贴为纯文本',
    fmtBold: '加粗',
    fmtItalic: '斜体',
    fmtUnderline: '下划线',
    fmtStrikethrough: '删除线',
    fmtHighlight: '高亮',
    fmtKbd: '键盘按钮',
    fmtCode: '行内代码',
    fmtLink: '插入链接',
    fmtQuote: '引用',
    fmtOL: '有序列表',
    fmtUL: '无序列表',
    fmtTask: '任务列表',
    fmtParagraph: '段落',
    fmtH1: '一级标题',
    fmtH2: '二级标题',
    fmtH3: '三级标题',
    fmtH4: '四级标题',
    fmtH5: '五级标题',
    fmtH6: '六级标题',
    fmtNormal: '普通段落',
    fmtInsert: '插入',
    fmtInsImg: '图像',
    fmtInsFootnote: '脚注',
    fmtInsLinkRef: '链接引用',
    fmtInsHr: '水平分割线',
    fmtInsTable: '表格',
    fmtInsCode: '代码块',
    fmtInsFormula: '公式块',
    fmtInsGithubAlert: 'GitHub警告框',
    fmtAlertNote: '提醒内容',
    fmtAlertTip: '建议内容',
    fmtAlertImportant: '重要内容',
    fmtAlertWarning: '警告内容',
    fmtAlertCaution: '注意内容',
    fmtInsToc: '内容目录',
    fmtInsYaml: 'YAML Front Matter',
    fmtInsAbove: '段落（上方）',
    fmtInsBelow: '段落（下方）',
    fmtLinkInputTitle: '插入链接',
    fmtLinkInputLabelTitle: '链接标题（可选）',
    fmtLinkInputLabelUrl: '链接地址',
    fmtLinkInputOk: '确定',
    fmtLinkInputCancel: '取消',
    fmtImgInputUrl: '图像地址',
    fmtImgInputTitle: '图像说明（可选）',
    fmtToastCopied: '已复制到剪贴板',
    fmtToastCopyFail: '复制失败',
    fmtToastPasteFail: '粘贴失败',
    fmtToastNoSelection: '请先选中文本'
  },
  en: {
    openFile: 'Open local .md file',
    exportHTML: 'Export as HTML',
    printPDF: 'Print / Export PDF',
    exportWord: 'Export as Word',
    saveMD: 'Save as .md file',
    openFileBtn: 'Open File',
    exportHTMLBtn: 'Export HTML',
    printPDFBtn: 'Print / PDF',
    exportWordBtn: 'Export Word',
    saveMDBtn: 'Save .md',
    syncScrollBtn: 'Sync Scroll',
    wideScreenBtn: 'Wide',
    viewEditorOnly: 'Editor Only',
    viewSplit: 'Editor + Preview',
    viewPreviewOnly: 'Preview Only',
    syncScroll: 'Sync Scroll',
    syncScrollOn: 'Sync scroll enabled',
    syncScrollOff: 'Sync scroll disabled',
    wideScreenOn: 'Wide mode',
    wideScreenOff: 'Exit wide',
    clearEditor: 'Clear editor',
    clearBtn: 'Clear',
    petShow: 'Show Pet',
    petHide: 'Hide Pet',
    petToggleLabel: 'Pet',
    noteShow: 'Show Note',
    noteHide: 'Hide Note',
    noteToggleLabel: 'Note',
    noteTitle: 'Note',
    noteSwitchText: 'Switch to plain text',
    noteSwitchRich: 'Switch to rich text',
    noteClearConfirm: 'Are you sure you want to clear the note?',
    noteCleared: 'Note cleared',
    noteClearModalTitle: 'Clear Note',
    noteClearConfirmText: 'Are you sure you want to clear all note content? This action cannot be undone.',
    noteClearConfirmBtn: 'Clear',
    noteClearCancelBtn: 'Cancel',
    notePlaceholder: 'Enter your note here...',
    noteLinkPrompt: 'Enter link URL:',
    noteLinkTitle: 'Enter link title:',
    noteLinkUrl: 'Enter link URL:',
    noteRichMode: 'Rich Text',
    noteTextMode: 'Plain Text',
    noteBold: 'Bold',
    noteItalic: 'Italic',
    noteUnderline: 'Underline',
    noteStrike: 'Strikethrough',
    noteFgColor: 'Font Color',
    noteBgColor: 'Highlight Color',
    noteUL: 'Unordered List',
    noteOL: 'Ordered List',
    noteOutdent: 'Decrease Indent',
    noteIndent: 'Increase Indent',
    noteLink: 'Insert Link',
    noteRemoveFormat: 'Clear Formatting',
    noteDefaultColor: 'Default Color',
    noteTransparentColor: 'Transparent',
    noteClear: 'Clear Note',
    noteHeading: 'Heading',
    noteHeadingH1: 'Heading 1',
    noteHeadingH2: 'Heading 2',
    noteHeadingH3: 'Heading 3',
    noteHeadingNormal: 'Normal Text',
    noteLinkModalTitle: 'Insert Link',
    noteLinkLabelTitle: 'Title',
    noteLinkLabelUrl: 'URL',
    noteLinkCancel: 'Cancel',
    noteLinkOk: 'OK',
    noteOtherColor: 'Other Color',
    logoTitle: 'KattyBB Markdown Editor',
    tocTitle: 'Table of Contents',
    editorPlaceholder: 'Enter Markdown here, or click "Open File" to load a local .md file...',
    noFileOpen: 'No file open',
    unnamed: 'Untitled',
    statusWords: 'Words',
    statusLines: 'Lines',
    fileOpened: 'File opened',
    fileReadError: 'Failed to read file',
    themeSwitched: 'Theme switched',
    darkMode: 'Switched to dark mode',
    lightMode: 'Switched to light mode',
    contentCleared: 'Content cleared',
    noContent: 'Editor is empty',
    htmlExported: 'HTML file exported',
    wordExported: 'Word file exported',
    mdSaved: '.md file saved',
    dropFileHint: 'Please drop a .md or .txt file',
    autoSaved: 'Content auto-saved locally',
    // 语言切换
    langSwitch: 'Switch Language',
    langZh: '中文',
    langEn: 'English',
    langSwitched: 'Switched to English',
    // 状态栏 / 主题菜单
    statusReady: 'Ready',
    statusAutoSave: 'Auto-saving',
    themeGroupBloom: 'Bloom Series',
    themeGroupOther: 'Other Themes',
    themeModeLabel: 'Display Mode',
    lightModeLabel: 'Light',
    darkModeLabel: 'Dark',
    // Format toolbar
    fmtCut: 'Cut',
    fmtCopy: 'Copy',
    fmtCopyBlock: 'Copy Block',
    fmtDelete: 'Delete',
    fmtCopyPasteLabel: 'Copy / Paste as…',
    fmtCopyMd: 'Copy as Markdown',
    fmtCopyHtml: 'Copy as HTML',
    fmtCopySimp: 'Copy with simplified format',
    fmtCopyPlain: 'Copy as plain text',
    fmtPastePlain: 'Paste as plain text',
    fmtBold: 'Bold',
    fmtItalic: 'Italic',
    fmtUnderline: 'Underline',
    fmtStrikethrough: 'Strikethrough',
    fmtHighlight: 'Highlight',
    fmtKbd: 'Keyboard',
    fmtCode: 'Inline Code',
    fmtLink: 'Insert Link',
    fmtQuote: 'Quote',
    fmtOL: 'Ordered List',
    fmtUL: 'Unordered List',
    fmtTask: 'Task List',
    fmtParagraph: 'Paragraph',
    fmtH1: 'Heading 1',
    fmtH2: 'Heading 2',
    fmtH3: 'Heading 3',
    fmtH4: 'Heading 4',
    fmtH5: 'Heading 5',
    fmtH6: 'Heading 6',
    fmtNormal: 'Normal Paragraph',
    fmtInsert: 'Insert',
    fmtInsImg: 'Image',
    fmtInsFootnote: 'Footnote',
    fmtInsLinkRef: 'Link Reference',
    fmtInsHr: 'Horizontal Rule',
    fmtInsTable: 'Table',
    fmtInsCode: 'Code Block',
    fmtInsFormula: 'Formula Block',
    fmtInsGithubAlert: 'GitHub Alert',
    fmtAlertNote: 'Note',
    fmtAlertTip: 'Tip',
    fmtAlertImportant: 'Important',
    fmtAlertWarning: 'Warning',
    fmtAlertCaution: 'Caution',
    fmtInsToc: 'Table of Contents',
    fmtInsYaml: 'YAML Front Matter',
    fmtInsAbove: 'Paragraph (Above)',
    fmtInsBelow: 'Paragraph (Below)',
    fmtLinkInputTitle: 'Insert Link',
    fmtLinkInputLabelTitle: 'Link title (optional)',
    fmtLinkInputLabelUrl: 'Link URL',
    fmtLinkInputOk: 'OK',
    fmtLinkInputCancel: 'Cancel',
    fmtImgInputUrl: 'Image URL',
    fmtImgInputTitle: 'Image caption (optional)',
    fmtToastCopied: 'Copied to clipboard',
    fmtToastCopyFail: 'Copy failed',
    fmtToastPasteFail: 'Paste failed',
    fmtToastNoSelection: 'Please select text first'
  }
};

var _currentLang = localStorage.getItem('kattybb-lang') || (navigator.language.startsWith('zh') ? 'zh' : 'en');

function t(key) {
  return (i18n[_currentLang] && i18n[_currentLang][key]) || i18n.zh[key] || key;
}

function setLang(lang) {
  if (lang !== 'zh' && lang !== 'en') return;
  _currentLang = lang;
  localStorage.setItem('kattybb-lang', lang);
  applyLang();
  showToast(t('langSwitched'));
}

function applyLang() {
  // 更新按钮 title
  document.querySelector('button[onclick*="fileInput"]').title = t('openFile');
  document.querySelector('button[onclick="exportHTML()"]').title = t('exportHTML');
  document.querySelector('button[onclick="printPreview()"]').title = t('printPDF');
  document.querySelector('button[onclick="exportWord()"]').title = t('exportWord');
  document.querySelector('button[onclick="saveMarkdown()"]').title = t('saveMD');
  document.getElementById('viewModeEditor').title = t('viewEditorOnly');
  document.getElementById('viewModeSplit').title = t('viewSplit');
  document.getElementById('viewModePreview').title = t('viewPreviewOnly');
  document.getElementById('syncScrollBtn').title = t('syncScroll');
  document.querySelector('button[onclick="clearEditor()"]').title = t('clearEditor');
  document.querySelector('.toolbar-logo').title = t('logoTitle');
  document.getElementById('tocFloatBtn').title = t('tocTitle');
  // 更新编辑器 placeholder
  editor.placeholder = t('editorPlaceholder');
  // 更新文件名（如果是默认值）
  if (fileNameEl.textContent === '未打开文件' || fileNameEl.textContent === 'No file open') {
    fileNameEl.textContent = t('noFileOpen');
  }
  if (fileNameEl.textContent === '未命名' || fileNameEl.textContent === 'Untitled') {
    fileNameEl.textContent = t('unnamed');
  }
  // 更新状态栏
  updateStatus();
  // 更新清空按钮文字
  var clearBtnText = document.getElementById('clearBtnText');
  if (clearBtnText) clearBtnText.textContent = t('clearBtn');
  // 更新主题下拉菜单中的静态文本
  var themeGroupBloom = document.getElementById('themeGroupBloom');
  if (themeGroupBloom) themeGroupBloom.textContent = t('themeGroupBloom');
  var themeGroupOther = document.getElementById('themeGroupOther');
  if (themeGroupOther) themeGroupOther.textContent = t('themeGroupOther');
  var themeModeLabel = document.getElementById('themeModeLabel');
  if (themeModeLabel) themeModeLabel.textContent = t('themeModeLabel');
  var lightModeLabel = document.getElementById('lightModeLabel');
  if (lightModeLabel) lightModeLabel.textContent = t('lightModeLabel');
  var darkModeLabel = document.getElementById('darkModeLabel');
  if (darkModeLabel) darkModeLabel.textContent = t('darkModeLabel');
  // 更新主要按钮文本
  var openFileLabel = document.getElementById('openFileLabel');
  if (openFileLabel) openFileLabel.textContent = t('openFileBtn');
  var exportHTMLLabel = document.getElementById('exportHTMLLabel');
  if (exportHTMLLabel) exportHTMLLabel.textContent = t('exportHTMLBtn');
  var printPDFLabel = document.getElementById('printPDFLabel');
  if (printPDFLabel) printPDFLabel.textContent = t('printPDFBtn');
  var exportWordLabel = document.getElementById('exportWordLabel');
  if (exportWordLabel) exportWordLabel.textContent = t('exportWordBtn');
  var saveMDLabel = document.getElementById('saveMDLabel');
  if (saveMDLabel) saveMDLabel.textContent = t('saveMDBtn');
  var syncScrollLabel = document.getElementById('syncScrollLabel');
  if (syncScrollLabel) syncScrollLabel.textContent = t('syncScrollBtn');
  var wideScreenBtn = document.getElementById('wideScreenBtn');
  if (wideScreenBtn) {
    var wideScreenLabel = wideScreenBtn.querySelector('span');
    if (wideScreenLabel) wideScreenLabel.textContent = t('wideScreenBtn');
    wideScreenBtn.title = _isWideScreen ? t('wideScreenOff') : t('wideScreenOn');
  }
  // 更新状态栏左侧
  if (statusLeft) {
    if (['就绪','Ready'].indexOf(statusLeft.textContent) !== -1) {
      statusLeft.textContent = t('statusReady');
    } else if (['内容自动保存中','Auto-saving'].indexOf(statusLeft.textContent) !== -1) {
      statusLeft.textContent = t('statusAutoSave');
    }
  }
  // 更新语言切换按钮
  var langBtn = document.getElementById('langSwitchBtn');
  if (langBtn) {
    langBtn.title = t('langSwitch');
    langBtn.textContent = _currentLang === 'zh' ? '中' : 'En';
  }
  // 更新宠物切换按钮
  var petBtn = document.getElementById('petToggleBtn');
  if (petBtn) {
    var petLabel = document.getElementById('petToggleLabel');
    if (petLabel) petLabel.textContent = t('petToggleLabel');
    petBtn.title = _petVisible === false ? t('petShow') : t('petHide');
  }
  // 更新笔记切换按钮
  var noteBtn = document.getElementById('noteToggleBtn');
  if (noteBtn) {
    var noteLabel = document.getElementById('noteToggleLabel');
    if (noteLabel) noteLabel.textContent = t('noteToggleLabel');
    noteBtn.title = _noteVisible ? t('noteHide') : t('noteShow');
  }
  // 更新笔记面板标题
  var noteTitle = document.getElementById('noteTitle');
  if (noteTitle) noteTitle.textContent = t('noteTitle');
  // 更新笔记模式按钮提示
  var noteTabRich = document.getElementById('noteTabRich');
  var noteTabText = document.getElementById('noteTabText');
  if (noteTabRich) noteTabRich.textContent = t('noteRichMode');
  if (noteTabText) noteTabText.textContent = t('noteTextMode');
  // 更新笔记编辑器占位符
  if (_noteEditor) {
    _noteEditor.setAttribute('data-placeholder', t('notePlaceholder'));
  }
  // 更新笔记标题下拉菜单
  var headingToggle = document.getElementById('noteHeadingToggle');
  if (headingToggle) headingToggle.title = t('noteHeading');
  var headingMenu = document.getElementById('noteHeadingMenu');
  if (headingMenu) {
    var menuBtns = headingMenu.querySelectorAll('button');
    menuBtns.forEach(function(btn) {
      var level = btn.dataset.level;
      if (level === '1') btn.textContent = t('noteHeadingH1');
      else if (level === '2') btn.textContent = t('noteHeadingH2');
      else if (level === '3') btn.textContent = t('noteHeadingH3');
      else if (level === '0') btn.textContent = t('noteHeadingNormal');
    });
  }
  var headingText = document.getElementById('noteHeadingText');
  if (headingText) {
    var currentLevel = parseInt(headingText.dataset.level || '0');
    if (currentLevel === 1) headingText.textContent = t('noteHeadingH1');
    else if (currentLevel === 2) headingText.textContent = t('noteHeadingH2');
    else if (currentLevel === 3) headingText.textContent = t('noteHeadingH3');
    else headingText.textContent = t('noteHeadingNormal');
  }
  var boldBtn = document.querySelector('#noteToolbar button[onclick="noteExec(\'bold\')"]');
  if (boldBtn) boldBtn.title = t('noteBold');
  var italicBtn = document.querySelector('#noteToolbar button[onclick="noteExec(\'italic\')"]');
  if (italicBtn) italicBtn.title = t('noteItalic');
  var underlineBtn = document.querySelector('#noteToolbar button[onclick="noteExec(\'underline\')"]');
  if (underlineBtn) underlineBtn.title = t('noteUnderline');
  var strikeBtn = document.querySelector('#noteToolbar button[onclick="noteExec(\'strikeThrough\')"]');
  if (strikeBtn) strikeBtn.title = t('noteStrike');
  var fgColorBtn = document.getElementById('noteFgColorToggle');
  if (fgColorBtn) fgColorBtn.title = t('noteFgColor');
  var bgColorBtn = document.getElementById('noteBgColorToggle');
  if (bgColorBtn) bgColorBtn.title = t('noteBgColor');
  var ulBtn = document.querySelector('#noteToolbar button[onclick="noteExec(\'insertUnorderedList\')"]');
  if (ulBtn) ulBtn.title = t('noteUL');
  var olBtn = document.querySelector('#noteToolbar button[onclick="noteExec(\'insertOrderedList\')"]');
  if (olBtn) olBtn.title = t('noteOL');
  var outdentBtn = document.querySelector('#noteToolbar button[onclick="noteExec(\'outdent\')"]');
  if (outdentBtn) outdentBtn.title = t('noteOutdent');
  var indentBtn = document.querySelector('#noteToolbar button[onclick="noteExec(\'indent\')"]');
  if (indentBtn) indentBtn.title = t('noteIndent');
  var linkBtn = document.querySelector('#noteToolbar button[onclick="noteLink()"]');
  if (linkBtn) linkBtn.title = t('noteLink');
  var removeFormatBtn = document.getElementById('noteRemoveFormatBtn');
  if (removeFormatBtn) removeFormatBtn.title = t('noteRemoveFormat');
  var fgDefaultBtn = document.getElementById('noteFgDefaultBtn');
  if (fgDefaultBtn) fgDefaultBtn.title = t('noteDefaultColor');
  var bgTransparentBtn = document.getElementById('noteBgTransparentBtn');
  if (bgTransparentBtn) bgTransparentBtn.title = t('noteTransparentColor');
  var clearTextBtn = document.getElementById('noteClearTextBtn');
  if (clearTextBtn) clearTextBtn.title = t('noteClear');
  // 更新其他颜色按钮文本
  var fgOtherBtn = document.getElementById('noteFgOtherBtn');
  if (fgOtherBtn) fgOtherBtn.textContent = t('noteOtherColor');
  var bgOtherBtn = document.getElementById('noteBgOtherBtn');
  if (bgOtherBtn) bgOtherBtn.textContent = t('noteOtherColor');
  // 更新链接模态框
  var linkModalTitle = document.getElementById('noteLinkModalTitle');
  if (linkModalTitle) linkModalTitle.textContent = t('noteLinkModalTitle');
  var linkLabelTitle = document.getElementById('noteLinkLabelTitle');
  if (linkLabelTitle) linkLabelTitle.textContent = t('noteLinkLabelTitle');
  var linkLabelUrl = document.getElementById('noteLinkLabelUrl');
  if (linkLabelUrl) linkLabelUrl.textContent = t('noteLinkLabelUrl');
  var linkCancel = document.querySelector('.note-link-modal-cancel');
  if (linkCancel) linkCancel.textContent = t('noteLinkCancel');
  var linkOk = document.querySelector('.note-link-modal-ok');
  if (linkOk) linkOk.textContent = t('noteLinkOk');
  var clearModalTitle = document.getElementById('noteClearModalTitle');
  if (clearModalTitle) clearModalTitle.textContent = t('noteClearModalTitle');
  var clearConfirmText = document.getElementById('noteClearConfirmText');
  if (clearConfirmText) clearConfirmText.textContent = t('noteClearConfirmText');
  var clearConfirmBtn = document.getElementById('noteClearConfirmBtn');
  if (clearConfirmBtn) clearConfirmBtn.textContent = t('noteClearConfirmBtn');
  var clearCancelBtn = document.getElementById('noteClearCancelBtn');
  if (clearCancelBtn) clearCancelBtn.textContent = t('noteClearCancelBtn');
  // 更新 html lang 属性
  document.documentElement.lang = _currentLang === 'zh' ? 'zh-CN' : 'en';
  // 更新格式工具栏语言
  applyFmtLang();
  // 更新右键菜单语言
  function fmtCtx(id, key) {
    var el = document.getElementById(id);
    if (el) {
      if (el.tagName === 'DIV') el.title = t(key);
      else el.textContent = t(key);
    }
  }
  fmtCtx('ctxCut', 'fmtCut');
  fmtCtx('ctxCopy', 'fmtCopy');
  fmtCtx('ctxCopyPaste', 'fmtCopyPasteLabel');
  fmtCtx('ctxDelete', 'fmtDelete');
  fmtCtx('ctxBold', 'fmtBold');
  fmtCtx('ctxItalic', 'fmtItalic');
  fmtCtx('ctxCode', 'fmtCode');
  fmtCtx('ctxLink', 'fmtLink');
  fmtCtx('ctxQuote', 'fmtQuote');
  fmtCtx('ctxUL', 'fmtUL');
  fmtCtx('ctxOL', 'fmtOL');
  fmtCtx('ctxTask', 'fmtTask');
  fmtCtx('ctxParagraph', 'fmtParagraph');
  fmtCtx('ctxH1', 'fmtH1');
  fmtCtx('ctxH2', 'fmtH2');
  fmtCtx('ctxH3', 'fmtH3');
  fmtCtx('ctxH4', 'fmtH4');
  fmtCtx('ctxH5', 'fmtH5');
  fmtCtx('ctxH6', 'fmtH6');
  fmtCtx('ctxNormal', 'fmtNormal');
  fmtCtx('ctxInsert', 'fmtInsert');
  fmtCtx('ctxInsImg', 'fmtInsImg');
  fmtCtx('ctxInsFootnote', 'fmtInsFootnote');
  fmtCtx('ctxInsLinkRef', 'fmtInsLinkRef');
  fmtCtx('ctxInsHr', 'fmtInsHr');
  fmtCtx('ctxInsTable', 'fmtInsTable');
  fmtCtx('ctxInsCode', 'fmtInsCode');
  fmtCtx('ctxInsFormula', 'fmtInsFormula');
  fmtCtx('ctxInsGithubAlert', 'fmtInsGithubAlert');
  fmtCtx('ctxAlertNote', 'fmtAlertNote');
  fmtCtx('ctxAlertTip', 'fmtAlertTip');
  fmtCtx('ctxAlertImportant', 'fmtAlertImportant');
  fmtCtx('ctxAlertWarning', 'fmtAlertWarning');
  fmtCtx('ctxAlertCaution', 'fmtAlertCaution');
  fmtCtx('ctxInsToc', 'fmtInsToc');
  fmtCtx('ctxInsYaml', 'fmtInsYaml');
  fmtCtx('ctxInsAbove', 'fmtInsAbove');
  fmtCtx('ctxInsBelow', 'fmtInsBelow');
  fmtCtx('ctxUnderline', 'fmtUnderline');
  fmtCtx('ctxStrike', 'fmtStrikethrough');
  fmtCtx('ctxHighlight', 'fmtHighlight');
  fmtCtx('ctxKbd', 'fmtKbd');
  // 更新复制/粘贴子菜单文本
  fmtCtx('ctxCopyMd', 'fmtCopyMd');
  fmtCtx('ctxCopyHtml', 'fmtCopyHtml');
  fmtCtx('ctxCopyPlain', 'fmtCopyPlain');
  fmtCtx('ctxPastePlain', 'fmtPastePlain');
  // 重新渲染预览区，使 [TOC] 标题等动态文本随语言切换立即更新
  if (typeof updatePreview === 'function') updatePreview();
}

// 主题配置
var themeList = {
  'bloom-petal': { name: 'Bloom Petal', light: 'css/themes/bloom-petal.css', dark: 'css/themes/bloom-petal-dark.css' },
  'bloom-amber': { name: 'Bloom Amber', light: 'css/themes/bloom-amber.css', dark: 'css/themes/bloom-amber-dark.css' },
  'bloom-ink': { name: 'Bloom Ink', light: 'css/themes/bloom-ink.css', dark: 'css/themes/bloom-ink-dark.css' },
  'bloom-mist': { name: 'Bloom Mist', light: 'css/themes/bloom-mist.css', dark: 'css/themes/bloom-mist-dark.css' },
  'bloom-ripple': { name: 'Bloom Ripple', light: 'css/themes/bloom-ripple.css', dark: 'css/themes/bloom-ripple-dark.css' },
  'bloom-spring': { name: 'Bloom Spring', light: 'css/themes/bloom-spring.css', dark: 'css/themes/bloom-spring-dark.css' },
  'bloom-stone': { name: 'Bloom Stone', light: 'css/themes/bloom-stone.css', dark: 'css/themes/bloom-stone-dark.css' },
  'bloom-verdant': { name: 'Bloom Verdant', light: 'css/themes/bloom-verdant.css', dark: 'css/themes/bloom-verdant-dark.css' },
  'animal-island': { name: 'Animal Island', light: 'css/themes/animal-island.css', dark: 'css/themes/animal-island-dark.css' },
  'everforest': { name: 'Everforest', light: 'css/themes/everforest-light.css', dark: 'css/themes/everforest-dark.css' }
};

var _currentThemeName = localStorage.getItem('kattybb-theme-name') || 'bloom-petal';
var _currentThemeMode = localStorage.getItem('kattybb-theme-mode') || 'light';

// marked 配置
marked.setOptions({
  breaks: true,
  gfm: true
});

// ===== Mermaid 初始化（任务9）=====
if (window.mermaid) {
  mermaid.initialize({ startOnLoad: false, theme: 'default' });
}

/**
 * HTML 转义函数
 */
function escapeHtml(text) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

// ===== 自定义 marked renderer（任务6/9）=====
var renderer = new marked.Renderer();
var originalCodeRenderer = renderer.code;

// ===== highlight.js 语法高亮（按需加载）=====
var _hljsLoaded = false;
var _hljsLoading = false;
function loadHighlightJS(callback) {
  if (_hljsLoaded) { if (callback) callback(); return; }
  if (_hljsLoading) { if (callback) setTimeout(function() { loadHighlightJS(callback); }, 50); return; }
  _hljsLoading = true;
  
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.id = 'hljs-theme';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
  document.head.appendChild(link);
  
  var script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
  script.onload = function() {
    _hljsLoaded = true;
    _hljsLoading = false;
    // CDN 异步加载完成后重新渲染，让代码块获得语法高亮
    updatePreview();
    if (callback) callback();
  };
  script.onerror = function() {
    _hljsLoading = false;
    if (callback) callback();
  };
  document.head.appendChild(script);
}

// 处理 mermaid 代码块（任务9）
// 兼容 marked v15 对象签名 {text, lang, escaped} 和旧版位置签名 (code, lang)
renderer.code = function(code, lang) {
  var codeText, codeLang;
  if (typeof code === 'object' && code !== null) {
    codeText = code.text || '';
    codeLang = code.lang || '';
  } else {
    codeText = code || '';
    codeLang = lang || '';
  }
  if (codeLang === 'mermaid') {
    return '<div class="mermaid" data-mermaid-src="' + encodeURIComponent(codeText) + '">' + codeText + '</div>';
  }
  
  var langLabel = codeLang ? '<span class="code-lang-label">' + escapeHtml(codeLang) + '</span>' : '';
  var langAttr = codeLang ? ' data-lang="' + escapeHtml(codeLang) + '"' : '';
  var langClass = codeLang ? ' class="language-' + codeLang + '"' : '';
  var highlightedCode = '';
  
  // 尝试使用 highlight.js 进行语法高亮
  if (_hljsLoaded && window.hljs && codeLang) {
    try {
      var result = codeLang && window.hljs.getLanguage(codeLang)
        ? window.hljs.highlight(codeText, { language: codeLang, ignoreIllegals: true })
        : window.hljs.highlightAuto(codeText);
      highlightedCode = result.value;
      langClass = ' class="hljs language-' + codeLang + '"';
    } catch (e) {
      highlightedCode = escapeHtml(codeText);
    }
  } else {
    highlightedCode = escapeHtml(codeText);
    // 首次渲染后异步加载 hljs
    if (!_hljsLoading) loadHighlightJS();
  }
  
  return '<pre class="md-fences"' + langAttr + '>' + langLabel + '<code' + langClass + '>' + highlightedCode + '</code></pre>\n';
};

// 给标题添加 id 用于 TOC 跳转（任务6）
// 兼容 marked v15 对象签名 {tokens, depth} 和旧版位置签名 (text, level)
renderer.heading = function(text, level) {
  var headingHtml, headingLevel;
  if (typeof text === 'object' && text !== null) {
    headingLevel = text.depth || 1;
    headingHtml = this.parser.parseInline(text.tokens);
  } else {
    headingLevel = level;
    headingHtml = text;
  }
  // 注意：headingHtml 是已渲染的 HTML，内联代码中的特殊字符会被转义为实体，
  // 例如 `> [!TYPE]` 会变成 &gt; [!TYPE]。若直接据此生成 slug，&gt; 里的 g/t
  // 会被当作单词字符，导致标题 id 混入 "gt-" 前缀，与 TOC / 锚点（基于原始
  // markdown 文本生成、无实体）的 slug 不一致，从而无法跳转。
  // 因此必须先解码 HTML 实体，再去标签，最后统一按 slug 规则生成。
  var slug = slugifyHtml(headingHtml);
  return '<h' + headingLevel + ' id="' + slug + '">' + headingHtml + '</h' + headingLevel + '>\n';
};

// 将已渲染的 HTML 标题文本转换为与 TOC/锚点一致的 slug：
// 先解码 HTML 实体（&gt; → > 等），再去标签，最后按统一规则规范化。
function slugifyHtml(html) {
  var plain = decodeHtmlEntities(html).replace(/<[^>]+>/g, '');
  return slugifyText(plain);
}

// 纯文本 → slug（与 TOC、内部锚点链接的算法保持一致）
function slugifyText(text) {
  return String(text).toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-|-$/g, '');
}

// 解码常见 HTML 实体（命名 + 十进制/十六进制数字实体）
function decodeHtmlEntities(str) {
  if (typeof str !== 'string') return str;
  var named = {
    gt: '>', lt: '<', amp: '&', quot: '"', apos: "'", nbsp: ' ',
    hellip: '…', mdash: '—', ndash: '–', copy: '©', reg: '®'
  };
  return str.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, function(m, ent) {
    if (ent.charAt(0) === '#') {
      var code;
      try {
        code = ent.charAt(1) === 'x' || ent.charAt(1) === 'X'
          ? parseInt(ent.substring(2), 16)
          : parseInt(ent.substring(1), 10);
        if (!isNaN(code)) return String.fromCodePoint(code);
      } catch (e) { /* 忽略无效编码，保留原样 */ }
      return m;
    }
    return named[ent] !== undefined ? named[ent] : m;
  });
}

// 内部锚点容错跳转：仅保留 字母数字_ 与 CJK，去掉空格/标点/括号/连字符等，
// 用于把写法不一致的内部锚点（如 [#目录锚点跳转测试] 指向「目录（锚点跳转测试）」）
// 以及大小写/空格差异（如 [#github-警告框] 指向「GitHub 警告框」）匹配到正确标题。
function anchorLooseKey(s) {
  return decodeURIComponent(String(s == null ? '' : s)).toLowerCase().replace(/[^\w\u4e00-\u9fa5]/g, '');
}
// 收集容器内所有带 id 的标题，建立 精确id -> true 与 宽松key -> id 两套索引
function buildAnchorIndex(root) {
  var exact = {}, loose = {};
  var heads = root.querySelectorAll('h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]');
  for (var i = 0; i < heads.length; i++) {
    var id = heads[i].id;
    if (!id) continue;
    exact[id] = true;
    var k = anchorLooseKey(heads[i].textContent);
    if (!loose[k]) loose[k] = id;
  }
  return { exact: exact, loose: loose };
}
// 解析内部锚点：精确 id → 同算法 slug → 宽松 key 匹配；找不到返回 null
function resolveAnchorId(anchor, index) {
  if (index.exact[anchor]) return anchor;
  var slug = slugifyText(decodeURIComponent(anchor));
  if (index.exact[slug]) return slug;
  var k = anchorLooseKey(anchor);
  if (index.loose[k]) return index.loose[k];
  return null;
}
// 修正容器内的内部锚点链接，使其指向真实存在的标题 id（容错匹配）
function fixInternalAnchors(root) {
  if (!root) return;
  var index = buildAnchorIndex(root);
  var links = root.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < links.length; i++) {
    var a = links[i];
    var href = a.getAttribute('href') || '';
    var anchor = href.substring(1);
    if (!anchor) continue;
    var real = resolveAnchorId(anchor, index);
    if (real && real !== anchor) a.setAttribute('href', '#' + real);
  }
}
// 覆盖 link renderer，处理内部锚点链接（兼容带空格的标题写法）
renderer.link = function(token) {
  var href, title, tokens;
  if (typeof token === 'object' && token !== null) {
    href = token.href || '';
    title = token.title || null;
    tokens = token.tokens || [];
  } else {
    href = arguments[0] || '';
    title = arguments[1] || null;
    tokens = arguments[2] || [];
  }

  // 对内部锚点应用与 heading 相同的 slug 规则，使 [锚点](#标题 123) 能正确跳转
  if (href.charAt(0) === '#') {
    var anchor = href.substring(1);
    var slug = decodeURIComponent(anchor).toLowerCase()
      .replace(/<[^>]+>/g, '')
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      .replace(/^-|-$/g, '');
    href = '#' + slug;
  } else {
    // 外部链接保持 encodeURI 行为
    try {
      href = encodeURI(href).replace(/%25/g, '%');
    } catch (e) {
      return this.parser.parseInline(tokens);
    }
  }

  var text = this.parser.parseInline(tokens);
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title.replace(/"/g, '&quot;') + '"';
  }
  if (href.charAt(0) !== '#' && href.indexOf('javascript:') !== 0) {
    out += ' target="_blank" rel="noopener noreferrer"';
  }
  out += '>' + text + '</a>';
  return out;
};

renderer.table = function(token) {
  var header = '', body = '', row = '', cell, i, j;
  var headerTokens = token.header || [];
  var rowsTokens = token.rows || [];
  for (i = 0; i < headerTokens.length; i++) {
    row += this.tablecell(headerTokens[i]);
  }
  header += this.tablerow({text: row});
  for (i = 0; i < rowsTokens.length; i++) {
    var rowTokens = rowsTokens[i];
    row = '';
    for (j = 0; j < rowTokens.length; j++) {
      row += this.tablecell(rowTokens[j]);
    }
    body += this.tablerow({text: row});
  }
  if (body) {
    body = '<tbody>' + body + '</tbody>';
  }
  return '<div class="table-scroll-wrapper"><table>\n<thead>\n' + header + '</thead>\n' + body + '\n</table>\n</div>';
};

// 从文本中提取标题，排除 fenced/indented 代码块内的内容
function extractHeadings(text) {
  var lines = text.split('\n');
  var result = [];
  var inFencedBlock = false;
  var fenceChar = '';

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var fenceMatch = line.match(/^(```+|~~~+)/);
    if (fenceMatch) {
      if (!inFencedBlock) {
        inFencedBlock = true;
        fenceChar = fenceMatch[1];
      } else if (line.trim() === fenceChar) {
        inFencedBlock = false;
        fenceChar = '';
      }
      continue;
    }

    if (!inFencedBlock && !line.match(/^( {4}|\t)/)) {
      var headingMatch = line.match(/^#{1,6}\s+.+$/);
      if (headingMatch) {
        result.push(line);
      }
    }
  }

  return result.length > 0 ? result : null;
}

// 处理 ==高亮== —— 跳过代码块（fenced/indented）和行内代码（反引号）内的内容
function processHighlight(text) {
  var lines = text.split('\n');
  var result = [];
  var inFencedBlock = false;
  var fenceChar = '';

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var inInlineCode = false;

    if (inFencedBlock) {
      var fenceMatch = line.match(/^(```+|~~~+)/);
      if (fenceMatch && line.trim() === fenceChar) {
        inFencedBlock = false;
        fenceChar = '';
      }
      result.push(line);
      continue;
    }

    var fenceStart = line.match(/^(```+|~~~+)/);
    if (fenceStart) {
      inFencedBlock = true;
      fenceChar = fenceStart[1];
      result.push(line);
      continue;
    }

    if (line.match(/^( {4}|\t)/)) {
      result.push(line);
      continue;
    }

    var processedLine = '';
    var escaped = false;
    for (var j = 0; j < line.length; j++) {
      var char = line[j];
      
      if (escaped) {
        processedLine += char;
        escaped = false;
        continue;
      }
      
      if (char === '\\') {
        escaped = true;
        processedLine += char;
        continue;
      }
      
      if (char === '`') {
        inInlineCode = !inInlineCode;
        processedLine += char;
        continue;
      }

      if (!inInlineCode && char === '=' && j + 1 < line.length && line[j + 1] === '=') {
        var nextContentStart = j + 2;
        var contentEnd = line.indexOf('==', nextContentStart);
        while (contentEnd !== -1 && contentEnd > 0 && line[contentEnd - 1] === '\\') {
          contentEnd = line.indexOf('==', contentEnd + 2);
        }
        if (contentEnd !== -1) {
          var content = line.substring(nextContentStart, contentEnd);
          if (content.length > 0) {
            processedLine += '<mark>' + content + '</mark>';
            j = contentEnd + 1;
            continue;
          }
        }
      }

      processedLine += char;
    }

    result.push(processedLine);
  }

  return result.join('\n');
}

var _mathExpressions = [];

function mathPlaceholder(type, index) {
  return '<span class="math-placeholder-' + type + '" data-index="' + index + '"></span>';
}

function processMath(text) {
  _mathExpressions = [];
  
  var lines = text.split('\n');
  var result = [];
  var inFencedBlock = false;
  var fenceChar = '';
  var inBlockMath = false;
  var blockMathLines = [];

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    if (inFencedBlock) {
      var fenceMatch = line.match(/^(```+|~~~+)/);
      if (fenceMatch && line.trim() === fenceChar) {
        inFencedBlock = false;
        fenceChar = '';
      }
      result.push(line);
      continue;
    }

    var fenceStart = line.match(/^(```+|~~~+)/);
    if (fenceStart) {
      inFencedBlock = true;
      fenceChar = fenceStart[1];
      result.push(line);
      continue;
    }

    if (inBlockMath) {
      var blockEnd = line.indexOf('$$');
      while (blockEnd !== -1 && blockEnd > 0 && line[blockEnd - 1] === '\\') {
        blockEnd = line.indexOf('$$', blockEnd + 2);
      }
      if (blockEnd !== -1) {
        blockMathLines.push(line.substring(0, blockEnd));
        var mathContent = blockMathLines.join('\n');
        _mathExpressions.push({ type: 'block', content: mathContent });
        result.push('<!--MATH_BLOCK:' + (_mathExpressions.length - 1) + '-->');
        inBlockMath = false;
        blockMathLines = [];
        
        var remaining = line.substring(blockEnd + 2);
        if (remaining.trim()) {
          result.push(remaining);
        }
      } else {
        blockMathLines.push(line);
      }
      continue;
    }

    // 在行内查找 $$ 块公式起始位置，但跳过被反引号（行内代码）包围的位置，
    // 否则会把表格单元格 / 代码内的 $$ 误判为块公式，插入块级占位符破坏结构。
    function isInInlineCode(str, pos) {
      var cnt = 0;
      for (var p = 0; p < pos; p++) {
        if (str[p] === '\\') { p++; continue; }
        if (str[p] === '`') cnt++;
      }
      return cnt % 2 === 1;
    }
    var blockStart = -1;
    var _search = 0;
    while (true) {
      var _idx = line.indexOf('$$', _search);
      if (_idx === -1) break;
      if (_idx > 0 && line[_idx - 1] === '\\') { _search = _idx + 2; continue; }
      if (isInInlineCode(line, _idx)) { _search = _idx + 2; continue; }
      blockStart = _idx;
      break;
    }
    if (blockStart !== -1 && !line.match(/^( {4}|\t)/)) {
      var beforeBlock = line.substring(0, blockStart);
      var afterStart = line.substring(blockStart + 2);
      var sameLineEnd = afterStart.indexOf('$$');
      
      if (sameLineEnd !== -1) {
        var mathContent = afterStart.substring(0, sameLineEnd);
        var afterBlock = afterStart.substring(sameLineEnd + 2);
        if (mathContent.length > 0) {
          if (beforeBlock.trim() || afterBlock.trim()) {
            // 同一行内 $$...$$ 前后还有其它内容（常见于表格单元格），
            // 必须作为行内公式处理；否则块级占位符会切断表格/段落结构。
            _mathExpressions.push({ type: 'inline', content: mathContent });
            if (beforeBlock.trim()) result.push(beforeBlock);
            result.push('<!--MATH_INLINE:' + (_mathExpressions.length - 1) + '-->');
            if (afterBlock.trim()) result.push(afterBlock);
          } else {
            _mathExpressions.push({ type: 'block', content: mathContent });
            result.push('<!--MATH_BLOCK:' + (_mathExpressions.length - 1) + '-->');
          }
        } else {
          if (beforeBlock.trim()) result.push(beforeBlock);
          if (afterBlock.trim()) result.push(afterBlock);
        }
        continue;
      }
      
      if (!beforeBlock.trim() && !afterStart.trim()) {
        var foundPair = false;
        for (var k = i + 1; k < lines.length; k++) {
          if (lines[k].match(/^(```+|~~~+)/)) break;
          var pairIndex = lines[k].indexOf('$$');
          while (pairIndex !== -1 && pairIndex > 0 && lines[k][pairIndex - 1] === '\\') {
            pairIndex = lines[k].indexOf('$$', pairIndex + 2);
          }
          if (pairIndex !== -1) {
            foundPair = true;
            break;
          }
        }
        
        if (foundPair) {
          inBlockMath = true;
          blockMathLines = [];
          continue;
        }
      }
      
      result.push(line);
      continue;
    }

    if (line.match(/^( {4}|\t)/)) {
      result.push(line);
      continue;
    }

    var processedLine = '';
    var inInlineCode = false;
    var escaped = false;
    
    for (var j = 0; j < line.length; j++) {
      var char = line[j];
      
      if (escaped) {
        processedLine += char;
        escaped = false;
        continue;
      }
      
      if (char === '\\') {
        escaped = true;
        processedLine += char;
        continue;
      }
      
      if (char === '`') {
        inInlineCode = !inInlineCode;
        processedLine += char;
        continue;
      }

      if (!inInlineCode && char === '$' && j + 1 < line.length && line[j + 1] !== '$') {
        var contentEnd = line.indexOf('$', j + 1);
        while (contentEnd !== -1 && contentEnd > 0 && line[contentEnd - 1] === '\\') {
          contentEnd = line.indexOf('$', contentEnd + 1);
        }
        if (contentEnd !== -1) {
          var content = line.substring(j + 1, contentEnd);
          if (content.length > 0 && !content.includes('$')) {
            _mathExpressions.push({ type: 'inline', content: content });
            processedLine += '<!--MATH_INLINE:' + (_mathExpressions.length - 1) + '-->';
            j = contentEnd;
            continue;
          }
        }
      }

      processedLine += char;
    }
    result.push(processedLine);
  }
  
  if (inBlockMath && blockMathLines.length > 0) {
    _mathExpressions.push({ type: 'block', content: blockMathLines.join('\n') });
    result.push('<!--MATH_BLOCK:' + (_mathExpressions.length - 1) + '-->');
  }
  
  return result.join('\n');
}

// 将标题文本渲染为 HTML（用于目录/锚点显示），与预览区标题保持视觉一致；
// 注意：slug 必须基于原始 markdown 文本生成，才能与标题 id 一致、正确跳转。
// 预览区的标题会先经 preprocessMarkdown 处理（含 processHighlight 将 ==高亮==
// 转为 <mark>），因此这里也要先走 processHighlight，再用 marked.parseInline 渲染，
// 否则目录会显示字面 "==高亮==" 而预览区是高亮，两者不一致。
function renderTocTitle(title) {
  var html = title;
  if (typeof processHighlight === 'function') {
    try { html = processHighlight(title); } catch (e) { /* 失败则保留原文本 */ }
  }
  if (typeof marked !== 'undefined' && typeof marked.parseInline === 'function') {
    try {
      return marked.parseInline(html);
    } catch (e) { /* 解析失败时回退为处理后的文本 */ }
  }
  return html;
}

// 生成 TOC HTML（任务6）
function generateTOC(fullText) {
  var headings = extractHeadings(fullText);
  if (!headings) return '<div class="toc"></div>';

  var tocHtml = '<div class="toc"><ul>';
  headings.forEach(function(h) {
    var level = h.match(/^#+/)[0].length;
    var title = h.replace(/^#+\s+/, '').replace(/[#]+$/, '').trim();
    var slug = title.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-').replace(/^-|-$/g, '');
    tocHtml += '<li class="toc-level-' + level + '"><a href="#' + slug + '">' + renderTocTitle(title) + '</a></li>';
  });
  tocHtml += '</ul></div>';
  return tocHtml;
}

function processAlerts(text) {
  var alertTypes = ['note', 'tip', 'warning', 'caution', 'important'];
  var alertIcons = {
    note: '📝',
    tip: '💡',
    warning: '⚠️',
    caution: '🚧',
    important: '❗'
  };
  var alertTitles = {
    note: 'Note',
    tip: 'Tip',
    warning: 'Warning',
    caution: 'Caution',
    important: 'Important'
  };
  
  function splitAlertContent(content) {
    // 块内的空引用行（如 "> [!NOTE]" 后紧跟的空 "> " 行）只是块内换行，
    // 并非结束边界；正则已通过负向先行断言在遇到下一个 >[!TYPE] 时停止，
    // 因此此处只需把所有 > 行合并后统一去除 ">" 前缀即可。
    var lines = content.split('\n');
    var alertLines = [];
    for (var i = 0; i < lines.length; i++) {
      alertLines.push(lines[i]);
    }
    return {
      alertContent: alertLines.join('\n').replace(/^>\s*/gm, '').trim(),
      remaining: ''
    };
  }

  // 将 alert 内部内容渲染为 HTML。
  // 注意：alert 整体是原始 HTML <div>，marked 不会解析其内部 markdown，
  // 因此必须在此处先调用 marked 把 **加粗** / `代码` / 列表等渲染成 HTML，
  // 否则这些内容会以字面文本显示。
  function renderAlertInner(md) {
    if (typeof marked !== 'undefined' && typeof marked.parse === 'function') {
      return marked.parse(md);
    }
    return md;
  }
  
  // 处理 > [!NOTE] 格式
  // 内容组用负向先行断言，遇到下一个 > [!TYPE] 警报标记即停止，
  // 否则贪婪匹配会把后续多个警报吞进同一个块，导致只有第一个被渲染成 alert
  var alertRegex1 = /^>\s*\[!(NOTE|TIP|WARNING|CAUTION|IMPORTANT)\]\s*\n((?:>(?!\s*\[!(?:NOTE|TIP|WARNING|CAUTION|IMPORTANT)\])[^\n]*\n?)*)/gim;
  text = text.replace(alertRegex1, function(match, type, content) {
    var lowerType = type.toLowerCase();
    if (alertTypes.indexOf(lowerType) === -1) return match;
    var icon = alertIcons[lowerType] || '📌';
    var title = alertTitles[lowerType] || type;
    var parts = splitAlertContent(content);
    var result = '<div class="alert alert-' + lowerType + '"><div class="alert-title">' + icon + ' ' + title + '</div><div class="alert-content">' + renderAlertInner(parts.alertContent) + '</div></div>';
    if (parts.remaining) {
      result += '\n\n' + parts.remaining;
    }
    return result + '\n';
  });
  
  // 处理 > **Note** 格式
  // 同正则1：内容组遇下一个 > **Title** 警报标记即停止
  var alertRegex2 = /^>\s*\*\*(Note|Tip|Warning|Caution|Important)\*\*\s*\n((?:>(?!\s*\*\*(?:Note|Tip|Warning|Caution|Important)\*\*)[^\n]*\n?)*)/gim;
  text = text.replace(alertRegex2, function(match, title, content) {
    var lowerTitle = title.toLowerCase();
    if (alertTypes.indexOf(lowerTitle) === -1) return match;
    var icon = alertIcons[lowerTitle] || '📌';
    var parts = splitAlertContent(content);
    var result = '<div class="alert alert-' + lowerTitle + '"><div class="alert-title">' + icon + ' ' + title + '</div><div class="alert-content">' + renderAlertInner(parts.alertContent) + '</div></div>';
    if (parts.remaining) {
      result += '\n\n' + parts.remaining;
    }
    return result + '\n';
  });
  
  return text;
}

var _footnoteDefinitions = {};
var _footnoteOrder = [];

function processFootnotes(text) {
  _footnoteDefinitions = {};
  _footnoteOrder = [];
  
  var lines = text.split('\n');
  var i = 0;
  
  while (i < lines.length) {
    var line = lines[i];
    var defMatch = line.match(/^\[\^([^\]]+)\]:\s*(.*)$/);
    if (defMatch) {
      var id = defMatch[1];
      var content = defMatch[2];
      
      i++;
      while (i < lines.length) {
        var nextLine = lines[i];
        if (nextLine.match(/^\s{2,}/) || nextLine.match(/^\t/)) {
          content += '\n' + nextLine.trim();
          i++;
        } else {
          break;
        }
      }
      
      if (!_footnoteDefinitions[id]) {
        _footnoteDefinitions[id] = content.trim();
        _footnoteOrder.push(id);
      }
    } else {
      i++;
    }
  }
  
  var result = [];
  i = 0;
  while (i < lines.length) {
    var line = lines[i];
    var defMatch2 = line.match(/^\[\^([^\]]+)\]:\s*/);
    if (defMatch2) {
      i++;
      while (i < lines.length) {
        var nextLine = lines[i];
        if (nextLine.match(/^\s{2,}/) || nextLine.match(/^\t/)) {
          i++;
        } else {
          break;
        }
      }
      continue;
    }
    
    var processedLine = line;
    var refRegex = /\[\^([^\]]+)\]/g;
    processedLine = processedLine.replace(refRegex, function(match, id) {
      if (!_footnoteDefinitions[id]) return match;
      return '{{FN_REF:' + id + '}}';
    });
    
    result.push(processedLine);
    i++;
  }
  
  var resultText = result.join('\n');
  resultText = resultText.replace(/\n{3,}/g, '\n\n');
  
  return resultText;
}

function renderFootnotesInPreview() {
  if (_footnoteOrder.length === 0) return;
  
  var preview = document.getElementById('preview');
  if (!preview) return;
  
  // 清理旧的脚注列表（不清理 tooltip，由 initFootnoteInteraction 管理）
  var oldFootnotes = preview.querySelector('.footnotes');
  if (oldFootnotes) oldFootnotes.remove();
  
  // 使用 DOM 遍历替换占位符，避免 innerHTML 破坏事件监听器
  var walker = document.createTreeWalker(preview, NodeFilter.SHOW_TEXT, null, false);
  var textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }
  
  textNodes.forEach(function(node) {
    var text = node.textContent;
    var changed = false;
    
    // 使用全局替换，处理所有匹配的脚注引用
    var regex = /\{\{FN_REF:([^}]+)\}\}/g;
    var newText = text.replace(regex, function(match, id) {
      var idx = _footnoteOrder.indexOf(id);
      if (idx === -1) return match;
      changed = true;
      return '{{FN_REF_REPLACED:' + id + ':' + (idx + 1) + '}}';
    });
    
    if (changed) {
      node.textContent = newText;
    }
  });
  
  // 第二轮：将标记替换为 HTML，循环处理直到没有更多匹配
  // 记录每个脚注ID的引用索引，用于生成唯一ID
  var refIndexMap = {};
  var hasMore = true;
  while (hasMore) {
    hasMore = false;
    var walker2 = document.createTreeWalker(preview, NodeFilter.SHOW_TEXT, null, false);
    var textNodes2 = [];
    while (walker2.nextNode()) {
      textNodes2.push(walker2.currentNode);
    }
    
    for (var i = 0; i < textNodes2.length; i++) {
      var node = textNodes2[i];
      var text = node.textContent;
      var match = text.match(/\{\{FN_REF_REPLACED:([^}]+):(\d+)\}\}/);
      if (match) {
        hasMore = true;
        var id = match[1];
        var index = match[2];
        // 使用 indexOf 定位第一个匹配，避免 split 拆掉同 ID 的后续出现
        var mIdx = text.indexOf(match[0]);
        var partBefore = mIdx > 0 ? text.substring(0, mIdx) : '';
        var partAfter = text.substring(mIdx + match[0].length);
        var parent = node.parentNode;
        
        if (partBefore) {
          parent.insertBefore(document.createTextNode(partBefore), node);
        }
        
        // 获取该ID的引用索引并递增
        var refIdx = refIndexMap[id] || 0;
        refIndexMap[id] = refIdx + 1;
        
        var sup = document.createElement('sup');
        sup.id = 'fnref-' + id + '-' + refIdx;
        var a = document.createElement('a');
        a.href = '#fn-' + id;
        a.className = 'footnote-ref';
        a.setAttribute('data-footnote-id', id);
        a.setAttribute('data-index', refIdx);
        a.textContent = '[' + index + ']';
        sup.appendChild(a);
        parent.insertBefore(sup, node);
        
        if (partAfter) {
          parent.insertBefore(document.createTextNode(partAfter), node);
        }
        
        parent.removeChild(node);
        break; // 重新开始遍历
      }
    }
  }
  
  // 检查是否有脚注引用
  var refs = preview.querySelectorAll('.footnote-ref');
  if (refs.length === 0) return;
  
  // 添加脚注列表
  var footnotesDiv = document.createElement('div');
  footnotesDiv.className = 'footnotes';
  footnotesDiv.innerHTML = '<hr><ol></ol>';
  var ol = footnotesDiv.querySelector('ol');
  
  _footnoteOrder.forEach(function(id, idx) {
    var li = document.createElement('li');
    li.id = 'fn-' + id;
    li.className = 'footnote-item';
    
    var contentSpan = document.createElement('span');
    contentSpan.className = 'footnote-content';
    // 使用 marked.parse 解析脚注内容，支持 Markdown 格式
    contentSpan.innerHTML = marked.parse(_footnoteDefinitions[id], { renderer: renderer });
    
    li.appendChild(contentSpan);
    
    // 根据该ID的引用次数生成对应数量的返回链接
    var refCount = refIndexMap[id] || 0;
    for (var i = 0; i < refCount; i++) {
      var backLink = document.createElement('a');
      backLink.href = '#fnref-' + id + '-' + i;
      backLink.className = 'footnote-backref';
      backLink.setAttribute('data-footnote-ref', id);
      backLink.setAttribute('data-index', i);
      backLink.innerHTML = '↩';
      li.appendChild(backLink);
    }
    
    ol.appendChild(li);
  });
  
  preview.appendChild(footnotesDiv);
  
  // 初始化全局脚注交互（通过 initFootnoteInteraction 处理）
}

function updateTooltipPositionAbove(target, tooltip) {
  var rect = target.getBoundingClientRect();
  var tooltipRect = tooltip.getBoundingClientRect();
  
  // 在目标上方显示
  var x = rect.left + rect.width / 2 - tooltip.offsetWidth / 2;
  var y = rect.top - tooltip.offsetHeight - 8;
  
  // 边界检查
  if (x < 10) x = 10;
  if (x + tooltip.offsetWidth > window.innerWidth - 10) {
    x = window.innerWidth - tooltip.offsetWidth - 10;
  }
  
  if (y < 10) {
    // 如果上方空间不够，显示在下方
    y = rect.bottom + 8;
  }
  
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
}

// 预处理 Markdown：剥离 YAML、处理 [TOC] 和 ==高亮==（任务6/10）
function preprocessMarkdown(text) {
  // 剥离 YAML front matter（任务10）
  text = text.replace(/^---\n[\s\S]*?\n---\n?/, '');

  // 处理脚注（必须在其他处理之前执行，避免脚注定义被修改）
  text = processFootnotes(text);

  // 处理 [TOC] - 生成目录（任务6）
  var tocRegex = /^\[TOC\]$/gm;
  if (tocRegex.test(text)) {
    text = text.replace(tocRegex, function() {
      return generateTOC(text);
    });
  }

  // 预处理内部锚点链接：将带空格的锚点 href 转换为 slug 格式，使 marked.js 能正确解析。
  // 注意：链接标题（如 "前往警告框测试"）必须与锚点分离，仅对锚点做 slug 化，标题原样保留，
  // 否则标题会被一起拼进 href（如 #github-警告框-前往警告框测试）。
  text = text.replace(/\]\(#([^)]+?)(\s+(?:"[^"]*"|'[^']*'|\([^)]*\)))?\)/g, function(match, anchor, title) {
    var slug = decodeURIComponent(anchor).toLowerCase()
      .replace(/<[^>]+>/g, '')
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      .replace(/^-|-$/g, '');
    var titlePart = title ? title : '';
    return '](#' + slug + titlePart + ')';
  });

  // 处理 ==高亮==（任务6）—— 跳过代码块内的内容
  text = processHighlight(text);

  // 处理公式：使用 HTML 注释作为占位符（marked.js 不会处理注释）
  text = processMath(text);

  // 处理 GitHub 风格警报框
  text = processAlerts(text);

  return text;
}

// ===== 从 localStorage 恢复内容 =====
const savedContent = localStorage.getItem('bloom-editor-content');
const savedFileName = localStorage.getItem('bloom-editor-filename');
if (savedContent) {
  editor.value = savedContent;
  fileNameEl.textContent = savedFileName || t('unnamed');
  // 如果恢复的文件名不是未命名/未打开，说明之前打开过本地文件（兼容中英文历史数据）
  if (savedFileName && ['未命名','未打开文件','Untitled','No file open'].indexOf(savedFileName) === -1) {
    window._openedFileName = savedFileName.replace(/\.(md|markdown|txt|text)$/i, '');
  }
}
updatePreviewNow();
initFootnoteInteraction();

// ===== 初始化视图模式和宽屏状态 =====
var _isWideScreen = localStorage.getItem('kattybb-wide-screen') === 'true';
applyViewMode();
var wideBtnInit = document.getElementById('wideScreenBtn');
if (wideBtnInit) {
  wideBtnInit.title = _isWideScreen ? t('wideScreenOff') : t('wideScreenOn');
}
if (_isWideScreen) {
  if (wideBtnInit) {
    wideBtnInit.classList.add('active');
  }
  var previewPanel = document.getElementById('previewPanel');
  if (previewPanel) {
    previewPanel.style.maxWidth = '100%';
    previewPanel.style.padding = '0';
    var markdownBody = previewPanel.querySelector('.markdown-body');
    if (markdownBody) {
      markdownBody.style.maxWidth = '100%';
      markdownBody.style.margin = '0';
      markdownBody.style.borderRadius = '0';
      markdownBody.style.border = 'none';
      markdownBody.style.boxShadow = 'none';
      markdownBody.style.background = 'transparent';
      markdownBody.style.padding = '20px 40px';
    }
  }
}

// ===== 实时预览（带防抖）=====
// 按需即时刷新（打开文件、切视图时使用）
function updatePreviewNow() {
  if (_previewDebounceTimer) {
    clearTimeout(_previewDebounceTimer);
    _previewDebounceTimer = null;
  }
  updatePreview();
}

var _previewDebounceTimer = null;
editor.addEventListener('input', function() {
  // 立即保存内容和状态（轻量操作）
  saveToStorage();
  updateStatus();
  
  // 防抖预览渲染：连续键入时只延迟刷新，大幅降低重渲染频率
  if (_previewDebounceTimer) clearTimeout(_previewDebounceTimer);
  _previewDebounceTimer = setTimeout(function() {
    updatePreview();
  }, 200);
});

// ===== 打开本地文件 =====
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    editor.value = event.target.result;
    fileNameEl.textContent = file.name;
    window._openedFileName = file.name.replace(/\.(md|markdown|txt|text)$/i, '');
    saveToStorage();
    updatePreviewNow();
    updateStatus();
    showToast(t('fileOpened') + ': ' + file.name);
  };
  reader.onerror = () => showToast(t('fileReadError'));
  reader.readAsText(file);
  fileInput.value = '';
});

// ===== 持久化到 localStorage =====
function saveToStorage() {
  localStorage.setItem('bloom-editor-content', editor.value);
  localStorage.setItem('bloom-editor-filename', fileNameEl.textContent);
}

// ===== 主题下拉菜单切换 =====
function toggleThemeDropdown() {
  var selector = document.getElementById('themeSelector');
  selector.classList.toggle('open');
}

// 点击外部关闭下拉菜单
document.addEventListener('click', function(e) {
  var selector = document.getElementById('themeSelector');
  if (!selector.contains(e.target)) {
    selector.classList.remove('open');
  }
});

// ===== 选择主题 =====
function selectTheme(themeName) {
  _currentThemeName = themeName;
  localStorage.setItem('kattybb-theme-name', themeName);
  applyTheme();
  updateThemeUI();
  showToast(t('themeSwitched') + ': ' + themeList[themeName].name);
  document.getElementById('themeSelector').classList.remove('open');
}

// ===== 设置主题模式（日间/夜间）=====
function setThemeMode(mode) {
  _currentThemeMode = mode;
  localStorage.setItem('kattybb-theme-mode', mode);
  applyTheme();
  updateThemeUI();
  showToast(mode === 'dark' ? t('darkMode') : t('lightMode'));
}

// ===== 应用主题 =====
// 主题兼容层 CSS（任务3）
var animalIslandCompat = `
:root {
  --accent: var(--ai-primary);
  --accent-hover: var(--ai-primary-hover);
  --accent-active: var(--ai-primary-active);
  --accent-soft: var(--ai-primary-bg);
  --accent-rgb: 25, 200, 185;
  --bg: var(--ai-bg-app);
  --surface: var(--ai-bg-paper);
  --surface-2: var(--ai-bg-soft);
  --text: var(--ai-text-body);
  --text-rgb: 114, 93, 66;
  --text-semi: var(--ai-text-secondary);
  --muted: var(--ai-text-muted);
  --border: var(--ai-border-light);
  --border-semi: var(--ai-border);
  --shadow: var(--ai-shadow-card);
  --shadow-lg: var(--ai-shadow-large);
  --font-sans: var(--ai-font);
  --font-mono: var(--ai-mono);
  --code-bg: var(--ai-bg-soft);
  --code-text: var(--ai-text-secondary);
  --code-ink: var(--ai-text-body);
  --code-dot-red: #d87070;
  --code-dot-yellow: #d8c870;
  --code-dot-green: #70c888;
  --space-unit: 8px;
  --space-xs: calc(var(--space-unit) * 1);
  --space-sm: calc(var(--space-unit) * 1.5);
  --space-md: calc(var(--space-unit) * 2);
  --space-lg: calc(var(--space-unit) * 3);
  --space-xl: calc(var(--space-unit) * 4);
  --space-2xl: calc(var(--space-unit) * 6);
  --space-3xl: calc(var(--space-unit) * 8);
}
`;

var everforestCompat = `
:root {
  --accent: var(--ef-green);
  --accent-hover: #7a9000;
  --accent-soft: rgba(141, 161, 1, 0.12);
  --accent-rgb: 141, 161, 1;
  --surface: var(--ef-bg-1);
  --surface-2: var(--ef-bg-2);
  --text: var(--ef-fg);
  --text-rgb: 92, 106, 114;
  --text-semi: var(--ef-fg-muted);
  --muted: var(--ef-gray-2);
  --border: #d7d3c4;
  --border-semi: var(--ef-bg-5);
  --shadow: var(--shadow-2);
  --shadow-lg: var(--shadow-2);
  --font-sans: var(--font-body);
  --font-mono: var(--font-code);
  --code-bg: var(--ef-bg-2);
  --code-text: var(--ef-fg-muted);
  --code-ink: var(--ef-fg);
  --code-dot-red: #e68183;
  --code-dot-yellow: #d8a657;
  --code-dot-green: #a7c080;
  --space-unit: 8px;
  --space-xs: calc(var(--space-unit) * 1);
  --space-sm: calc(var(--space-unit) * 1.5);
  --space-md: calc(var(--space-unit) * 2);
  --space-lg: calc(var(--space-unit) * 3);
  --space-xl: calc(var(--space-unit) * 4);
  --space-2xl: calc(var(--space-unit) * 6);
  --space-3xl: calc(var(--space-unit) * 8);
}
`;

function applyTheme() {
  var theme = themeList[_currentThemeName];
  if (!theme) return;
  
  var cssFile = _currentThemeMode === 'dark' ? theme.dark : theme.light;
  themeLink.href = cssFile;
  
  // 主题兼容层（任务3）
  var compatStyle = document.getElementById('themeCompat');
  if (!compatStyle) {
    compatStyle = document.createElement('style');
    compatStyle.id = 'themeCompat';
    document.head.appendChild(compatStyle);
  }
  
  var compatCSS = '';
  if (_currentThemeName === 'animal-island') {
    compatCSS = animalIslandCompat;
  } else if (_currentThemeName === 'everforest') {
    compatCSS = everforestCompat;
  }
  compatStyle.textContent = compatCSS;
}

// ===== 更新主题UI状态 =====
function updateThemeUI() {
  // 更新当前主题名称显示
  document.getElementById('currentThemeName').textContent = themeList[_currentThemeName].name;
  
  // 更新主题选项的 active 状态
  var options = document.querySelectorAll('.theme-option');
  options.forEach(function(opt) {
    if (opt.dataset.theme === _currentThemeName) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });
  
  // 更新日间/夜间按钮状态
  var lightBtn = document.getElementById('lightModeBtn');
  var darkBtn = document.getElementById('darkModeBtn');
  if (_currentThemeMode === 'light') {
    lightBtn.classList.add('active');
    darkBtn.classList.remove('active');
  } else {
    darkBtn.classList.add('active');
    lightBtn.classList.remove('active');
  }

  // 夜间模式下高亮颜色按钮反色处理（黑色线条→白色）
  var highlightPaths = document.querySelectorAll('#noteBgColorToggle svg path[fill="#262626"]');
  var newFill = _currentThemeMode === 'dark' ? '#e0e0e0' : '#262626';
  highlightPaths.forEach(function(p) { p.setAttribute('fill', newFill); });

  // 夜间模式下字体颜色按钮的A字母颜色调整
  var fgAPath = document.querySelector('#noteFgColorToggle svg path[fill="#727272"]');
  if (fgAPath) fgAPath.setAttribute('fill', _currentThemeMode === 'dark' ? '#cccccc' : '#727272');

  // 更新默认颜色和透明按钮的渐变背景
  var fgDefaultBtn = document.getElementById('noteFgDefaultBtn');
  if (fgDefaultBtn) {
    if (_currentThemeMode === 'dark') {
      fgDefaultBtn.style.background = 'linear-gradient(to bottom right, #666 49.5%, #fff 50.5%)';
    } else {
      fgDefaultBtn.style.background = 'linear-gradient(to bottom right, #000 49.5%, #fff 50.5%)';
    }
  }
  var bgTransparentBtn = document.getElementById('noteBgTransparentBtn');
  if (bgTransparentBtn) {
    if (_currentThemeMode === 'dark') {
      bgTransparentBtn.style.background = 'linear-gradient(to bottom right, #444 49.5%, #888 50.5%)';
    } else {
      bgTransparentBtn.style.background = 'linear-gradient(to bottom right, #fff 49.5%, #ccc 50.5%)';
    }
  }
}

// ===== 更新预览 =====
// 使用计数锁防止嵌套/异步更新时的滚动同步冲突
var _previewUpdateDepth = 0;

function _lockPreviewUpdate() { _previewUpdateDepth++; }
function _unlockPreviewUpdate() { if (_previewUpdateDepth > 0) _previewUpdateDepth--; }
function _isPreviewUpdating() { return _previewUpdateDepth > 0; }

function updatePreview() {
  var scrollTop = previewPanel.scrollTop;
  
  _lockPreviewUpdate();
  
  var processed = preprocessMarkdown(editor.value);
  preview.innerHTML = marked.parse(processed, { renderer: renderer });
  renderFootnotesInPreview();
  renderKaTeX();
  updateTocFloat();
  // 修正内部锚点链接（容错匹配标题 id），并绑定一次性点击平滑滚动
  fixInternalAnchors(preview);
  
  // mermaid.run 是异步的，纳入锁计数管理
  if (window.mermaid) {
    var mermaidNodes = preview.querySelectorAll('.mermaid');
    if (mermaidNodes.length > 0) {
      _lockPreviewUpdate();
      var mermaidPromise = mermaid.run({ nodes: mermaidNodes });
      if (mermaidPromise && typeof mermaidPromise.then === 'function') {
        mermaidPromise.then(function() {
          _unlockPreviewUpdate();
        }).catch(function() {
          _unlockPreviewUpdate();
        });
      } else {
        _unlockPreviewUpdate();
      }
    }
  }
  
  requestAnimationFrame(function() {
    previewPanel.scrollTop = scrollTop;
    _unlockPreviewUpdate();
  });
}

// ===== 渲染 KaTeX 公式 =====
function renderKaTeX() {
  if (!window.katex) {
    loadKaTeX();
    return;
  }
  
  var preview = document.getElementById('preview');
  if (!preview) return;
  
  // 使用树遍历查找 HTML 注释节点
  var walker = document.createTreeWalker(preview, NodeFilter.SHOW_COMMENT, null, false);
  var comments = [];
  
  while (walker.nextNode()) {
    comments.push(walker.currentNode);
  }
  
  comments.forEach(function(comment) {
    var text = comment.nodeValue.trim();
    
    // 匹配行内公式注释
    var inlineMatch = text.match(/^MATH_INLINE:(\d+)$/);
    if (inlineMatch) {
      var idx = parseInt(inlineMatch[1]);
      if (_mathExpressions[idx] && _mathExpressions[idx].type === 'inline') {
        var span = document.createElement('span');
        span.className = 'katex-inline';
        try {
          katex.render(_mathExpressions[idx].content, span, { throwOnError: false });
        } catch (e) {
          span.textContent = '$' + _mathExpressions[idx].content + '$';
        }
        comment.parentNode.replaceChild(span, comment);
      }
      return;
    }
    
    // 匹配块级公式注释
    var blockMatch = text.match(/^MATH_BLOCK:(\d+)$/);
    if (blockMatch) {
      var idx = parseInt(blockMatch[1]);
      if (_mathExpressions[idx] && _mathExpressions[idx].type === 'block') {
        var div = document.createElement('div');
        div.className = 'katex-block';
        try {
          katex.render(_mathExpressions[idx].content, div, { displayMode: true, throwOnError: false });
        } catch (e) {
          div.textContent = '$$' + _mathExpressions[idx].content + '$$';
        }
        comment.parentNode.replaceChild(div, comment);
      }
    }
  });
  
  // 兼容旧的 .math-inline 和 .math-block 类
  var mathSpans = preview.querySelectorAll('.math-inline');
  mathSpans.forEach(function(el) {
    try {
      var tex = el.textContent;
      katex.render(tex, el, { throwOnError: false });
    } catch (e) {}
  });
  
  var mathBlocks = preview.querySelectorAll('.math-block');
  mathBlocks.forEach(function(el) {
    try {
      var tex = el.textContent.trim();
      katex.render(tex, el, { displayMode: true, throwOnError: false });
    } catch (e) {}
  });
  
  var mathCodeBlocks = preview.querySelectorAll('pre code.language-math, pre code.language-katex');
  mathCodeBlocks.forEach(function(codeEl) {
    try {
      var tex = codeEl.textContent.trim();
      var preEl = codeEl.parentNode;
      var container = document.createElement('div');
      container.className = 'katex-block';
      katex.render(tex, container, { displayMode: true, throwOnError: false });
      preEl.parentNode.replaceChild(container, preEl);
    } catch (e) {}
  });
}

// ===== 悬浮目录功能 =====

/**
 * 更新悬浮目录按钮和面板
 * 如果文档有标题则显示按钮，否则隐藏
 */
function updateTocFloat() {
  var btn = document.getElementById('tocFloatBtn');
  var content = document.getElementById('tocFloatContent');
  var headings = extractHeadings(editor.value);

  if (!headings || headings.length === 0) {
    btn.classList.add('hidden');
    return;
  }

  btn.classList.remove('hidden');

  var tocHtml = '<ul>';
  headings.forEach(function(h) {
    var level = h.match(/^#+/)[0].length;
    var title = h.replace(/^#+\s+/, '').replace(/[#]+$/, '').trim();
    var slug = title.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-').replace(/^-|-$/g, '');
    tocHtml += '<li class="toc-level-' + level + '"><a href="#' + slug + '" onclick="scrollToHeading(\'' + slug + '\'); return false;">' + renderTocTitle(title) + '</a></li>';
  });
  tocHtml += '</ul>';

  content.innerHTML = tocHtml;
}

/**
 * 点击目录项跳转到指定标题
 */
function scrollToHeading(slug) {
  var heading = document.getElementById(slug);
  if (heading) {
    var previewPanel = document.getElementById('previewPanel');
    if (previewPanel) {
      var headingRect = heading.getBoundingClientRect();
      var panelRect = previewPanel.getBoundingClientRect();
      var scrollTarget = previewPanel.scrollTop + (headingRect.top - panelRect.top) - 60;
      previewPanel.scrollTo({ 
        top: Math.max(0, scrollTarget), 
        behavior: 'smooth' 
      });
    } else {
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    document.getElementById('tocFloatBtn').classList.remove('open');
  }
}

/**
 * 切换悬浮目录面板的展开/收起状态
 */
function toggleTocFloat() {
  var btn = document.getElementById('tocFloatBtn');
  btn.classList.toggle('open');
}

/**
 * 监听预览面板滚动，高亮当前目录项
 */
function initTocScroll() {
  var previewPanel = document.getElementById('previewPanel');
  previewPanel.addEventListener('scroll', function() {
    var headings = preview.querySelectorAll('h1, h2, h3, h4, h5, h6');
    var tocLinks = document.querySelectorAll('.toc-float-content a');
    if (headings.length === 0 || tocLinks.length === 0) return;

    var currentHeading = null;
    var panelTop = previewPanel.getBoundingClientRect().top + 100;

    headings.forEach(function(h) {
      var rect = h.getBoundingClientRect();
      if (rect.top <= panelTop) {
        currentHeading = h.id;
      }
    });

    tocLinks.forEach(function(link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentHeading);
    });
  });
}

/**
 * 拦截预览区内的锚点链接点击，阻止默认行为并在预览面板内平滑滚动
 */
function initAnchorClick() {
  preview.addEventListener('click', function(e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    
    if (a.classList.contains('footnote-ref') || a.classList.contains('footnote-backref')) {
      return;
    }
    
    e.preventDefault();
    var targetId = a.getAttribute('href').substring(1);
    var targetEl = document.getElementById(targetId);
    if (targetEl) {
      var previewPanel = document.getElementById('previewPanel');
      if (previewPanel) {
        var targetRect = targetEl.getBoundingClientRect();
        var panelRect = previewPanel.getBoundingClientRect();
        var scrollTarget = previewPanel.scrollTop + (targetRect.top - panelRect.top) - 60;
        previewPanel.scrollTo({ 
          top: Math.max(0, scrollTarget), 
          behavior: 'smooth' 
        });
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
}

// 悬浮目录按钮点击事件
document.getElementById('tocFloatBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  toggleTocFloat();
});

// 点击页面其他地方关闭目录面板
document.addEventListener('click', function(e) {
  var btn = document.getElementById('tocFloatBtn');
  if (btn && btn.classList.contains('open') && !btn.contains(e.target)) {
    btn.classList.remove('open');
  }
});

// 初始化目录滚动监听
initTocScroll();
// 初始化预览区锚点点击拦截
initAnchorClick();

// ===== 更新状态栏 =====
function updateStatus() {
  const text = editor.value;
  const chars = text.length;
  const lines = text.split('\n').length;
  statusRight.textContent = t('statusWords') + ': ' + chars + ' | ' + t('statusLines') + ': ' + lines;
}

// ===== Toast 通知 =====
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(function() { toastEl.classList.remove('show'); }, 2500);
}

// ===== 清空编辑器 =====
function clearEditor() {
  if (editor.value.trim() === '') return;
  editor.value = '';
  fileNameEl.textContent = t('noFileOpen');
  window._openedFileName = '';
  saveToStorage();
  updatePreviewNow();
  updateStatus();
  showToast(t('contentCleared'));
}

/**
 * 获取导出用的内联补充 CSS（包含 TOC、代码块等内联样式）
 */
// ===== highlight.js 语法高亮配色（导出内嵌，随明暗主题切换）=====
function getHljsCSS() {
  if (_currentThemeMode === 'dark') {
    return [
      '.hljs { color: #c9d1d9; background: transparent; }',
      '.hljs-keyword, .hljs-selector-tag, .hljs-title.class_ { color: #ff7b72; }',
      '.hljs-string, .hljs-regexp, .hljs-addition { color: #a5d6ff; }',
      '.hljs-number, .hljs-literal, .hljs-variable, .hljs-template-variable, .hljs-tag .hljs-attr { color: #79c0ff; }',
      '.hljs-built_in, .hljs-type { color: #d2a8ff; }',
      '.hljs-comment, .hljs-quote, .hljs-deletion, .hljs-meta { color: #8b949e; }',
      '.hljs-function .hljs-title, .hljs-title.function_ { color: #d2a8ff; }',
      '.hljs-attr, .hljs-attribute { color: #79c0ff; }',
      '.hljs-symbol, .hljs-bullet, .hljs-link { color: #79c0ff; }',
      '.hljs-emphasis { font-style: italic; }',
      '.hljs-strong { font-weight: bold; }',
      '.hljs-tag { color: #7ee787; }',
      '.hljs-name { color: #7ee787; }',
      '.hljs-section { color: #79c0ff; font-weight: bold; }'
    ].join('\n');
  }
  return [
    '.hljs { color: #24292e; background: transparent; }',
    '.hljs-keyword, .hljs-selector-tag, .hljs-title.class_ { color: #d73a49; }',
    '.hljs-string, .hljs-regexp, .hljs-addition { color: #032f62; }',
    '.hljs-number, .hljs-literal, .hljs-variable, .hljs-template-variable, .hljs-tag .hljs-attr { color: #005cc5; }',
    '.hljs-built_in, .hljs-type { color: #6f42c1; }',
    '.hljs-comment, .hljs-quote, .hljs-deletion, .hljs-meta { color: #6a737d; }',
    '.hljs-function .hljs-title, .hljs-title.function_ { color: #6f42c1; }',
    '.hljs-attr, .hljs-attribute { color: #e36209; }',
    '.hljs-symbol, .hljs-bullet, .hljs-link { color: #005cc5; }',
    '.hljs-emphasis { font-style: italic; }',
    '.hljs-strong { font-weight: bold; }',
    '.hljs-tag { color: #22863a; }',
    '.hljs-name { color: #22863a; }',
    '.hljs-section { color: #005cc5; font-weight: bold; }'
  ].join('\n');
}

// 导出前确保代码已语法高亮：未加载则等待加载（加载完成会自动重渲染预览）
async function ensureHighlightForExport() {
  if (!_hljsLoaded) {
    await new Promise(function(res) { loadHighlightJS(res); });
  }
  await new Promise(function(res) { setTimeout(res, 50); });
}

// 根据已渲染 HTML 提取标题生成悬浮目录列表（依赖渲染时写入的 id）
function buildExportTocList(html) {
  var tmp = document.createElement('div');
  tmp.innerHTML = html;
  var heads = tmp.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (!heads.length) return '';
  var list = '<ul>';
  for (var i = 0; i < heads.length; i++) {
    var h = heads[i];
    var id = h.id || '';
    if (!id) continue;
    // 使用已渲染的 innerHTML（保留 <mark>/<code> 等格式），与锚点目录 renderTocTitle 的渲染一致；
    // 不再用 textContent + escapeHtml，否则 ==高亮==、行内代码等会丢失格式。
    var inner = h.innerHTML.trim();
    if (!inner) continue;
    var lvl = h.tagName.substring(1);
    list += '<li class="toc-level-' + lvl + '"><a href="#' + id + '" onclick="exportTocGo(\'' + id + '\');return false;">' + inner + '</a></li>';
  }
  list += '</ul>';
  return list;
}

function getExportExtraCSS() {
  return [
    /* [TOC] 目录样式：与“仅预览模式”完全一致（复刻 index.html 内联 .markdown-body .toc 规则）。
       关键：预览区 TOC 的链接与标题都【不设 font-size】，继承正文 16px；
       之前这里写死 .toc a=13px / .toc-title=14px，导致导出目录字号比预览小、不一致。
       故删除 font-size / .toc-title / .toc a.active，并把 toc-level 缩进改回预览的 em 单位。
       注意：悬浮目录面板(.export-toc-content)是另一套紧凑样式，不受此处影响。 */
    '.markdown-body .toc { background: var(--surface, #f5f2f1); border: 1px solid var(--border, rgba(0,0,0,0.1)); border-radius: 14px; padding: 16px 20px; margin: 1.5em 0; }',
    '.markdown-body .toc ul { list-style: none; padding-left: 0; }',
    '.markdown-body .toc li { margin: 4px 0; }',
    '.markdown-body .toc a { color: var(--accent, #e8859b); text-decoration: none !important; border-bottom: none !important; border-radius: 0 !important; }',
    '.markdown-body .toc a:hover { text-decoration: underline !important; background: transparent !important; color: var(--accent, #e8859b) !important; border-bottom-color: transparent !important; }',
    '.markdown-body .toc-level-2 { padding-left: 1.2em; }',
    '.markdown-body .toc-level-3 { padding-left: 2.4em; }',
    '.markdown-body .toc-level-4 { padding-left: 3.6em; }',
    '.markdown-body .toc-level-5 { padding-left: 4.8em; }',
    '.markdown-body .toc-level-6 { padding-left: 6em; }',
    /* [TOC] 目录内的 mark/code 与正文预览区保持一致 */
    '.markdown-body .toc mark { background: linear-gradient(120deg, rgba(var(--accent-rgb), 0.25), rgba(var(--accent-rgb), 0.12)); color: inherit; padding: 0.12em 0.26em; border-radius: 9px; border: 1px solid rgba(var(--accent-rgb), 0.32); }',
    '.markdown-body .toc code { font-family: var(--font-mono); font-size: 0.88em; padding: 0.2em 0.45em; border-radius: 7px; background: rgba(var(--accent-rgb), 0.14); color: var(--accent); font-weight: 600; border: 1px solid rgba(var(--accent-rgb), 0.32); }',
    /* Mermaid 容器 */
    '.markdown-body .mermaid { text-align: center; margin: 1.5em 0; background: var(--surface, #f5f2f1); border-radius: 14px; padding: 16px; }',
    /* 代码块基础 */
    '.markdown-body pre { background: var(--code-bg, #f5f2f1); border: 1px solid var(--border, rgba(0,0,0,0.1)); border-radius: 14px; padding: 16px 20px; overflow-x: auto; position: relative; }',
    '.markdown-body pre code { background: transparent; padding: 0; color: var(--code-ink, #443a3e); font-weight: normal; border: none; }',
    '.markdown-body code { font-family: var(--font-mono, monospace); font-size: 0.88em; padding: 0.2em 0.45em; border-radius: 7px; background: rgba(var(--accent-rgb, 232,133,155), 0.14); color: var(--accent, #e8859b); font-weight: 600; border: 1px solid rgba(var(--accent-rgb, 232,133,155), 0.32); }',
    /* 表格（仅布局兜底，颜色由主题CSS控制） */
    '.markdown-body table { width: 100%; margin: 2em 0; }',
    '.markdown-body th, .markdown-body td { padding: 0.75em 1em; }',
    '.markdown-body th { text-align: left; font-weight: 600; }',
    /* 引用块 */
    '.markdown-body blockquote { margin: 1.5em 0; padding: 1em 1.25em; background: rgba(var(--accent-rgb, 232,133,155), 0.08); border-left: 4px solid var(--accent, #e8859b); border-radius: 14px; }',
    /* 标题装饰线 */
    '.markdown-body h1::after, .markdown-body h2::after { content: ""; display: block; width: 76px; height: 3px; background: linear-gradient(90deg, rgba(var(--accent-rgb, 232,133,155), 0.45), transparent); border-radius: 999px; margin-top: 0.3em; }',
    '.markdown-body h3::after { content: ""; display: block; width: 44px; height: 2px; background: linear-gradient(90deg, rgba(var(--accent-rgb, 232,133,155), 0.32), transparent); border-radius: 999px; margin-top: 0.2em; }',
    /* 列表 */
    '.markdown-body ul, .markdown-body ol { padding-left: 1.5em; margin: 1em 0; }',
    '.markdown-body li { margin: 0.5em 0; }',
    /* 水平线（兜底样式，用 :where() 降到 0 优先级，仅在没有主题定义时才生效，避免覆盖 animal-island 的猫爪脚印分割线） */
    ':where(hr) { border: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--border-semi, rgba(0,0,0,0.15)), transparent); margin: 2em 0; }',
    /* 图片 */
    '.markdown-body img { max-width: 100%; height: auto; border-radius: 14px; display: block; margin: 1.5em auto; }',
    /* 强调、下划线、kbd */
    '.markdown-body mark { background: rgba(var(--accent-rgb, 232,133,155), 0.18); padding: 0.1em 0.3em; border-radius: 5px; }',
    '.markdown-body u { text-decoration: none; border-bottom: 2px wavy var(--accent, #e8859b); padding-bottom: 1px; }',
    '.markdown-body kbd { font-family: var(--font-mono, monospace); font-size: 0.82em; padding: 0.15em 0.4em; border: 1px solid var(--border, rgba(0,0,0,0.15)); border-bottom-width: 2px; background: var(--bg, #faf8f7); border-radius: 6px; }',
    /* 任务列表 */
    '.markdown-body .task-list-item { list-style-type: none; padding-left: 0; margin-left: -1.5em; }',
    '.markdown-body .task-list-item input { margin-right: 0.6em; accent-color: var(--accent, #e8859b); }',
    /* 表格横向滚动容器（与编辑器内联样式一致）：
       导出/打印时 collectAllStyles 的过滤正则不含 .table-scroll-wrapper，会把它丢掉，
       这里兜底补上，否则窄屏表格只会硬挤/裁切、无法左右滑动。 */
    '.table-scroll-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 2em 0; }',
    '.table-scroll-wrapper table { margin: 0; width: auto; min-width: 100%; }',
    /* 全文（含长链接/长单词）允许断词，避免窄屏横向溢出被截断 */
    '#write, #write p, #write li { overflow-wrap: break-word; word-break: break-word; }',
    '#write a { overflow-wrap: break-word; word-break: break-word; }',
    /* 移动端适配（融合方案）：阻止浏览器自动放大小字号 + 响应式断点缩小字号/间距，
       避免 860px 桌面布局在手机上标题巨大、内容被挤压。仅作用于导出 HTML。 */
    'html, body { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }',
    '@media (max-width: 768px) {',
    '  #write { line-height: 1.65; padding: 14px 12px !important; margin: 10px auto !important; border-radius: 12px; }',
    '  #write pre { overflow-x: auto !important; padding: 22px 14px !important; }',
    '  #write th, #write td { padding: 0.5em 0.6em; white-space: nowrap; }',
    '  #write blockquote { padding: 12px 14px; }',
    '  .export-toc-panel { max-width: 90vw; }',
    '}',
    '@media (max-width: 480px) {',
    '  #write { padding: 10px 8px !important; }',
    '}',
    /* 打印/导出 PDF：恢复与原始 MD_TEST_DOC.pdf 一致的外观——整页跟随当前主题配色
       （日间=浅色纸面、夜间=深色纸面），并完整保留 #write 原有的卡片/内边距样式。
       横条根因：在 body 上铺整页背景时，Chromium 仅填充 body 盒子、跨页被渲染成整页宽的彩色长条。
       修复：把主题底色铺在 html 上（html 背景会逐页重复、铺满整页），body 置透明，
       从而既消除横条，又不影响 #write 原本的居中卡片/内边距（夜间卡片圆角+阴影也保留）。
       关键：print-color-adjust:exact 强制背景图形打印（即便未勾选“背景图形”也能正常出深色纸面）。 */
    /* 顶部边距：原 @page 上边距为 0，完全依赖 #write 自身的顶部间距。
       但部分主题（如 Everforest）用 margin-top 实现顶部间距，而 Chromium 打印时
       会在分页处折叠/裁掉块级元素的顶部 margin，导致「首页无上边距、其余页有」。
       修复：给 @page 一个物理上边距（12mm，与左右下一致），并在打印时把 #write 顶部
       margin 归零，改由 @page 统一保证每页（含首页）都有一致的上边距。 */
    '@page { margin: 12mm 12mm 12mm 12mm; }',
    '@media print {',
    '  /* 强制打印背景与主题色（最核心：否则深色纸面/代码底在打印时丢失变白底浅字） */',
    '  html, body, #write, #write * {',
    '    -webkit-print-color-adjust: exact !important;',
    '    print-color-adjust: exact !important;',
    '  }',
    '  /* 消除 #write 顶部 margin 在首页被裁掉造成的上边距不一致（改由 @page 统一控制） */',
    '  #write { margin-top: 0 !important; }',
    '  #write > :first-child { margin-top: 0 !important; }',
    '  /* 深色等带卡片圆角的主题：打印时去掉 #write 圆角，避免首页顶部出现两个小圆角 */',
    '  #write { border-radius: 0 !important; }',
    '  /* 整页主题底色铺在 html 上（逐页重复、铺满整页，根绝横条）；body 透明，不抢 #write 卡片底色 */',
    '  html {',
    '    background: var(--bg, var(--ai-bg-app, var(--ai-bg-paper, #f7f3f0))) !important;',
    '  }',
    '  body {',
    '    background: transparent !important;',
    '    background-image: none !important;',
    '  }',
    '  /* 链接保留主题色并强制下划线，打印时更易辨识 */',
    '  #write a {',
    '    text-decoration: underline !important;',
    '  }',
    '  /* 短元素尽量整体不切，避免跨页被切断后背景错位 */',
    '  #write table, #write pre, #write .md-fences, #write blockquote, #write .mermaid {',
    '    break-inside: avoid-page;',
    '  }',
    '}',
  ].join('\n');
}

// ===== 导出 HTML =====
async function exportHTML() {
  var content = editor.value.trim();
  if (!content) { showToast(t('noContent')); return; }

  // 确保代码已语法高亮（必要时加载 highlight.js 并重渲染预览）
  await ensureHighlightForExport();
  var cssContent = await collectAllStyles();
  // 直接使用预览区已渲染的 HTML（包含 mermaid SVG、代码高亮等）
  fixInternalAnchors(preview);
  var htmlContent = preview.innerHTML;

  // 当前主题对应的 CSS 文件（与预览区加载的是同一份），用于导出 HTML 中追加 <link>：
  // 关键：解析成【绝对 URL】（基于当前 index.html 的 location），而不是相对路径。
  // 浏览器导出 HTML 默认存到 Downloads 等目录，相对路径 css/themes/xxx.css 会 404，
  // 导致回退到内联的 bloom 兜底样式，字号/配色与预览（如 animal-island）不一致。
  // 用绝对 file://（或 http://）URL 后，只要应用目录还在且浏览器允许 file:// 子资源，
  // 无论从哪里打开导出文件都能加载与预览完全一致的主题（含字号）。
  // 若该绝对路径也失效（如应用被移动/删除），下方内联兜底样式仍生效，不会白屏。
  var _theme = themeList[_currentThemeName] || themeList['bloom-petal'];
  var _themeCssRel = _currentThemeMode === 'dark' ? _theme.dark : _theme.light;
  var _themeCssFile = new URL(_themeCssRel, location.href).href;
  
  var footnoteStyles = `
.footnote-tooltip {
  position: fixed;
  z-index: 4000;
  background: #f5f2f1;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 12px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.15);
  padding: 12px 16px;
  max-width: 300px;
  max-height: 200px;
  overflow-y: auto;
  font-size: 13px;
  line-height: 1.6;
  display: none;
  pointer-events: none;
}
.footnote-tooltip.show { display: block; }
.footnote-ref { cursor: pointer; }
.footnote-ref.active { color: #e8859b; font-weight: bold; }
.footnote-item { margin: 4px 0; padding: 4px 8px; border-radius: 8px; }
.footnote-item.highlight { background: rgba(232,133,155,0.1); }
.footnote-content { display: inline; }
.footnote-content p { display: inline; margin: 0; }
.footnote-ref.flash { animation: footnote-flash 0.5s ease; }
@keyframes footnote-flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
.footnote-backref { color: #e8859b; text-decoration: none; font-size: 12px; margin-left: 4px; display: inline; }
.footnote-backref:hover { text-decoration: underline; }
/* 代码语言标签（导出保留） */
#write pre { position: relative; }
#write pre .code-lang-label {
  position: absolute; top: 8px; right: 12px;
  font-size: 11px; color: #666;
  background: #f6f8fa; border: 1px solid #d0d7de;
  border-radius: 6px; padding: 2px 8px;
  opacity: 0; transition: opacity 0.2s;
  pointer-events: none; z-index: 2;
}
#write pre:hover .code-lang-label { opacity: 1; }
/* highlight.js 语法高亮主题（导出内嵌，随明暗主题自动切换配色） */
` + getHljsCSS() + `
`;
  
  var footnoteScript = `
<script>
(function() {
  var tooltip = document.createElement('div');
  tooltip.className = 'footnote-tooltip';
  tooltip.id = 'footnote-tooltip';
  document.body.appendChild(tooltip);
  
  var refs = document.querySelectorAll('.footnote-ref');
  refs.forEach(function(ref) {
    ref.addEventListener('click', function(e) {
      e.preventDefault();
      var id = this.getAttribute('data-footnote-id');
      var fn = document.getElementById('fn-' + id);
      if (fn) {
        fn.classList.add('highlight');
        fn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function() { fn.classList.remove('highlight'); }, 1000);
      }
    });
    
    ref.addEventListener('mouseenter', function() {
      var id = this.getAttribute('data-footnote-id');
      var fn = document.getElementById('fn-' + id);
      if (fn && tooltip) {
        var content = fn.querySelector('span');
        if (content) {
          tooltip.innerHTML = content.innerHTML;
        }
        tooltip.classList.add('show');
        updateTooltipPosition(this, tooltip);
      }
    });
    
    ref.addEventListener('mouseleave', function() {
      if (tooltip) tooltip.classList.remove('show');
    });
    
    ref.addEventListener('mousemove', function(e) {
      if (tooltip && tooltip.classList.contains('show')) {
        updateTooltipPosition(this, tooltip);
      }
    });
  });
  
  var backRefs = document.querySelectorAll('.footnote-backref');
  backRefs.forEach(function(back) {
    back.addEventListener('click', function(e) {
      e.preventDefault();
      var id = this.getAttribute('data-footnote-ref');
      var index = this.getAttribute('data-index');
      var fnref = document.getElementById('fnref-' + id + '-' + index);
      if (fnref) {
        fnref.classList.add('flash');
        fnref.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function() { fnref.classList.remove('flash'); }, 500);
      }
    });
  });
  
  function updateTooltipPosition(target, tooltipEl) {
    var rect = target.getBoundingClientRect();
    var x = rect.left + rect.width / 2 - tooltipEl.offsetWidth / 2;
    var y = rect.top - tooltipEl.offsetHeight - 8;
    
    if (x < 10) x = 10;
    if (x + tooltipEl.offsetWidth > window.innerWidth - 10) {
      x = window.innerWidth - tooltipEl.offsetWidth - 10;
    }
    if (y < 10) {
      y = rect.bottom + 8;
    }
    
    tooltipEl.style.left = x + 'px';
    tooltipEl.style.top = y + 'px';
  }
})();
<\/script>`;
  
  // —— 导出页内交互：悬浮目录（复刻编辑器 .toc-float-btn 样式） + 宽度切换 ——
  var exportUIStyles = `
/* 导出页内：宽度切换按钮（与目录按钮同款风格，860px 居中 ↔ 浏览器全宽） */
.export-width-btn {
  position: fixed; right: 20px; bottom: 20px; top: auto; width: 44px; height: 44px;
  background: var(--surface, #f5f2f1); border: 1px solid var(--border, rgba(0,0,0,0.1));
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--accent, #e8859b); opacity: 0.6;
  transition: all 0.2s ease; z-index: 100; box-shadow: var(--shadow, 0 4px 12px rgba(0,0,0,0.05));
}
.export-width-btn:hover { opacity: 1; background: var(--accent-soft, rgba(232,133,155,0.15)); transform: scale(1.1); }
.export-width-btn .wicon { width: 20px; height: 20px; display: flex; }
.export-width-btn .wicon-svg { width: 20px; height: 20px; }
.export-width-btn .wicon-restore { display: none; }
.export-width-btn.full .wicon-expand { display: none; }
.export-width-btn.full .wicon-restore { display: flex; }
/* 导出页内：悬浮目录（复刻编辑器 .toc-float-btn 样式） */
.export-toc-btn {
  position: fixed; right: 20px; top: 100px; width: 44px; height: 44px;
  background: var(--surface, #f5f2f1); border: 1px solid var(--border, rgba(0,0,0,0.1));
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--accent, #e8859b); opacity: 0.6;
  transition: all 0.2s ease; z-index: 100; box-shadow: var(--shadow, 0 4px 12px rgba(0,0,0,0.05));
}
.export-toc-btn:hover { opacity: 1; background: var(--accent-soft, rgba(232,133,155,0.15)); transform: scale(1.1); }
.export-toc-btn.open { opacity: 1; background: var(--accent, #e8859b); color: #fff; }
.export-toc-btn svg { width: 20px; height: 20px; }
.export-toc-panel {
  position: absolute; right: 0; top: calc(100% + 8px); width: 240px; max-height: 70vh;
  overflow-y: auto; background: var(--surface, #f5f2f1); border: 1px solid var(--border, rgba(0,0,0,0.1));
  border-radius: 14px; box-shadow: var(--shadow-lg, 0 10px 30px rgba(0,0,0,0.1));
  opacity: 0; visibility: hidden; transform: translateY(-8px); transition: all 0.25s ease; overflow: hidden;
}
.export-toc-btn.open .export-toc-panel { opacity: 1; visibility: visible; transform: translateY(0); }
.export-toc-header { padding: 12px 16px; font-size: 14px; font-weight: 700; color: var(--text, #443a3e); border-bottom: 1px solid var(--border, rgba(0,0,0,0.1)); background: var(--accent-soft, rgba(232,133,155,0.1)); }
.export-toc-content { max-height: 400px; overflow-y: auto; padding: 8px 0; }
.export-toc-content ul { list-style: none; padding: 0; margin: 0; }
.export-toc-content li { margin: 0; padding: 0; }
.export-toc-content a { display: block; padding: 6px 16px; font-size: 13px; color: var(--text-semi, #7b6c71); text-decoration: none !important; border-bottom: none !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: background 0.15s ease, color 0.15s ease; border-radius: 0 !important; }
.export-toc-content a:hover { background: var(--accent-soft, rgba(232,133,155,0.1)) !important; color: var(--accent, #e8859b) !important; }
.export-toc-content a.active { color: var(--accent, #e8859b) !important; font-weight: 600; background: var(--accent-soft, rgba(232,133,155,0.12)) !important; }
.export-toc-content .toc-level-2 { padding-left: 12px; }
.export-toc-content .toc-level-3 { padding-left: 24px; }
.export-toc-content .toc-level-4 { padding-left: 36px; }
.export-toc-content .toc-level-5 { padding-left: 48px; }
.export-toc-content .toc-level-6 { padding-left: 60px; }
/* 导出悬浮目录内的 mark/code 与正文预览区保持一致（独立于 .markdown-body，需单独定义） */
.export-toc-content mark { background: linear-gradient(120deg, rgba(var(--accent-rgb), 0.25), rgba(var(--accent-rgb), 0.12)); color: inherit; padding: 0.12em 0.26em; border-radius: 9px; border: 1px solid rgba(var(--accent-rgb), 0.32); }
.export-toc-content code { font-family: var(--font-mono); font-size: 0.88em; padding: 0.2em 0.45em; border-radius: 7px; background: rgba(var(--accent-rgb), 0.14); color: var(--accent); font-weight: 600; border: 1px solid rgba(var(--accent-rgb), 0.32); }
#write.markdown-body.full-width { max-width: 100% !important; margin-left: 0; margin-right: 0; }
/* 导出页内：图片点击查看 lightbox（与渲染窗口一致） */
.img-lightbox-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.86); display: none; align-items: center; justify-content: center; z-index: 9999; overflow: hidden; touch-action: none; }
.img-lightbox-overlay.open { display: flex; }
.img-lightbox-img { max-width: 90%; max-height: 90%; transform-origin: center center; cursor: grab; user-select: none; -webkit-user-drag: none; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
.img-lightbox-img.grabbing { cursor: grabbing; }
.img-lightbox-toolbar {
  position: absolute; top: 16px; right: 16px;
  display: flex; align-items: center; gap: 16px;
  padding: 10px 12px;
  background: rgba(22, 22, 26, 0.55);
  -webkit-backdrop-filter: blur(14px) saturate(150%);
  backdrop-filter: blur(14px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 10px 34px rgba(0, 0, 0, 0.45);
  z-index: 10000;
}
.img-lb-group { display: flex; align-items: center; gap: 8px; }
.img-lb-sep { width: 1px; align-self: stretch; min-height: 22px; background: rgba(255, 255, 255, 0.16); }
.img-lb-btn {
  width: 40px; height: 40px; border-radius: 11px;
  border: none; background: rgba(255, 255, 255, 0.08);
  color: #fff; cursor: pointer; padding: 0;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.16s ease, transform 0.12s ease, color 0.16s ease, box-shadow 0.16s ease;
}
.img-lb-btn svg { width: 20px; height: 20px; display: block; pointer-events: none; }
.img-lb-btn:hover { background: rgba(255, 255, 255, 0.2); }
.img-lb-btn:active { transform: scale(0.92); background: rgba(255, 255, 255, 0.28); }
.img-lb-btn:focus-visible { outline: 2px solid rgba(255, 255, 255, 0.7); outline-offset: 2px; }
.img-lb-btn.is-disabled { opacity: 0.4; pointer-events: none; cursor: default; }
.img-lb-close {
  background: rgba(229, 72, 77, 0.18);
  color: #ff6b6b;
  margin-left: 4px;
}
.img-lb-close:hover { background: rgba(229, 72, 77, 0.34); color: #ff8585; }
.img-lb-close:active { transform: scale(0.92); background: rgba(229, 72, 77, 0.5); }
.img-lb-mini { position: fixed; right: 20px; bottom: 20px; width: 220px; max-height: 240px; background: #111; border: 1px solid rgba(255,255,255,0.22); border-radius: 10px; overflow: hidden; z-index: 10001; box-shadow: 0 10px 34px rgba(0,0,0,0.55); cursor: move; }
.img-lb-mini img { width: 100%; display: block; pointer-events: none; }
.img-lb-mini-close { position: absolute; top: 4px; right: 4px; width: 24px; height: 24px; border: none; border-radius: 50%; background: rgba(0,0,0,0.6); color: #fff; cursor: pointer; font-size: 13px; }
.img-lb-counter { position: absolute; top: 16px; left: 16px; z-index: 10000; color: #fff; font-size: 14px; background: rgba(0,0,0,0.42); padding: 4px 12px; border-radius: 999px; pointer-events: none; }
@media print { .export-width-btn, .export-toc-btn, .export-toc-panel { display: none !important; } }
`;
  var exportUIScript = `
<script>
(function(){
  var wBtn = document.getElementById('exportWidthBtn');
  if (wBtn) {
    wBtn.addEventListener('click', function(){
      var body = document.getElementById('write');
      if (!body) return;
      var fw = body.classList.toggle('full-width');
      wBtn.classList.toggle('full', fw);
    });
  }
  var tBtn = document.getElementById('exportTocBtn');
  if (tBtn) {
    tBtn.addEventListener('click', function(e){ e.stopPropagation(); tBtn.classList.toggle('open'); });
    document.addEventListener('click', function(e){
      if (tBtn.classList.contains('open') && !tBtn.contains(e.target)) tBtn.classList.remove('open');
    });
  }
})();
function exportTocGo(id){
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  var b = document.getElementById('exportTocBtn');
  if (b) b.classList.remove('open');
}
${IMG_LIGHTBOX_SCRIPT}
<\/script>`;

  var tocList = buildExportTocList(htmlContent);
  var tocUI = '';
  if (tocList) {
    tocUI = '<div class="export-toc-btn" id="exportTocBtn" title="目录" aria-label="目录">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M18 9a9 9 0 0 0-9 9"></path><path d="M6 15a9 9 0 0 0 9-9"></path></svg>'
      + '<div class="export-toc-panel" id="exportTocPanel">'
      + '<div class="export-toc-content">' + tocList + '</div>'
      + '</div>'
      + '</div>';
  }
  var widthUI = '<div class="export-width-btn" id="exportWidthBtn" title="切换阅读宽度" aria-label="切换阅读宽度">'
    + '<span class="wicon wicon-expand"><svg class="wicon-svg" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M133.8 115h756.4c20.9 0 37.8 16.9 37.8 37.8v37.8c0 20.9-16.9 37.8-37.8 37.8H133.8c-20.9 0-37.8-16.9-37.8-37.8v-37.8c0-20.9 16.9-37.8 37.8-37.8zM133.8 455.3h491.6c20.9 0 37.8 16.9 37.8 37.8v37.8c0 20.9-16.9 37.8-37.8 37.8H133.8c-20.9 0-37.8-16.9-37.8-37.8v-37.8c0-20.9 16.9-37.8 37.8-37.8zM133.8 795.6h756.4c20.9 0 37.8 16.9 37.8 37.8v37.8c0 20.9-16.9 37.8-37.8 37.8H133.8c-20.9 0-37.8-16.9-37.8-37.8v-37.8c0-20.9 16.9-37.8 37.8-37.8zM757.8 600.7V423.3c0-22 29.2-33.1 46.2-17.5l97.1 88.7c10.6 9.7 10.6 25.3 0 35L804 618.1c-17 15.6-46.2 4.6-46.2-17.4z" fill="currentColor" p-id="6039"></path></svg></span>'
    + '<span class="wicon wicon-restore"><svg class="wicon-svg" viewBox="0 0 1228 1024" xmlns="http://www.w3.org/2000/svg"><path d="M1164.151467 896.750933V1024H0v-127.249067h1164.151467zM1137.322667 0l-297.233067 292.386133 297.233067 292.386134L1228.8 494.7968l-205.824-202.410667L1228.8 89.975467 1137.322667 0zM582.0416 451.447467v127.249066H0V451.447467h582.0416z m0-445.371734v127.249067H0V6.144h582.0416z" fill="currentColor" p-id="7098"></path></svg></span>'
    + '</div>';

  var htmlDoc = '<!DOCTYPE html>\n<html lang="zh-CN" color-scheme="' + (_currentThemeMode === 'dark' ? 'dark' : 'light') + '">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">\n<title>' + fileNameEl.textContent + '<\/title>\n<style>\n' + cssContent + '\n' + footnoteStyles + '\n' + exportUIStyles + '\n' + getExportExtraCSS() + '\n<\/style>\n' +
    // 追加相对路径主题样式：从应用目录打开导出文件时，与预览区加载同一份主题（含字号），
    // 保证导出 HTML 的字体大小/配色与仅预览模式完全一致。
    '<link rel="stylesheet" href="' + _themeCssFile + '">\n<\/head>\n<body>\n<div id="write" class="markdown-body">\n' + htmlContent + '\n<\/div>\n' + tocUI + widthUI + footnoteScript + exportUIScript + '\n<\/body>\n<\/html>';

  downloadBlob(htmlDoc, getExportName('.html'), 'text/html;charset=utf-8');
  showToast(t('htmlExported'));
}

// ===== 打印 / 导出 PDF =====
async function printPreview() {
  var content = editor.value.trim();
  if (!content) { showToast(t('noContent')); return; }

  await ensureHighlightForExport();
  var cssContent = await collectAllStyles();
  fixInternalAnchors(preview);
  var htmlContent = preview.innerHTML;

  htmlContent = convertFootnotesForPrint(htmlContent);

  var printWin = window.open('', '_blank');
  var printTitle = fileNameEl.textContent.replace(/\.md$/i, '');
  var _ptheme = themeList[_currentThemeName] || themeList['bloom-petal'];
  var _pthemeCssRel = _currentThemeMode === 'dark' ? _ptheme.dark : _ptheme.light;
  var _pthemeCssFile = new URL(_pthemeCssRel, location.href).href;
  printWin.document.write('<!DOCTYPE html><html color-scheme="' + (_currentThemeMode === 'dark' ? 'dark' : 'light') + '"><head><meta charset="UTF-8"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"><title>' + printTitle + '<\/title><style>' + cssContent + getHljsCSS() + getExportExtraCSS() + 'body{margin:0;padding:0;}@media print{*{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}a{color:var(--accent,#e8859b);text-decoration:underline;}.footnotes{page-break-before:always;}.footnote-item{margin:4px 0;padding:0;border:none;background:none;}.footnote-backref{display:none;}}</style><link rel="stylesheet" href="' + _pthemeCssFile + '"></head><body><div id="write" class="markdown-body">' + htmlContent + '<\/div><script>window.onafterprint=function(){window.close();};<\/script></body></html>');
  printWin.document.close();
  printWin.focus();
  setTimeout(function() { printWin.print(); }, 500);
}

function convertFootnotesForPrint(html) {
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  var footnotes = tempDiv.querySelector('.footnotes');
  if (!footnotes) return html;
  
  var footnoteItems = footnotes.querySelectorAll('.footnote-item');
  var footnoteMap = {};
  
  footnoteItems.forEach(function(item) {
    var id = item.id.replace('fn-', '');
    var contentEl = item.querySelector('.footnote-content');
    var contentHTML = contentEl ? contentEl.innerHTML : item.innerHTML;
    // 移除返回链接，并把包裹内容的 <p> 扁平化，避免打印时返回链接被挤到下一行
    footnoteMap[id] = contentHTML
      .replace(/<a[^>]+class="footnote-backref"[^>]*>[\s\S]*?<\/a>/gi, '')
      .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1')
      .trim();
  });
  
  // 将脚注引用的 href 改为锚点，支持 PDF 内跳转；同时确保返回链接指向正确的 fnref-id-0
  var refs = tempDiv.querySelectorAll('.footnote-ref');
  refs.forEach(function(ref) {
    var id = ref.getAttribute('data-footnote-id');
    if (footnoteMap[id]) {
      ref.setAttribute('href', '#fn-' + id);
      ref.style.textDecoration = 'underline';
      ref.style.color = '#e8859b';
    }
  });
  
  // 使用 _footnoteOrder 保持正确的脚注顺序，并添加返回链接
  var footnoteHTML = '<hr style="border:1px solid #ccc;margin:20px 0;" /><div style="font-size:12px;line-height:1.6;">';
  _footnoteOrder.forEach(function(id, idx) {
    if (footnoteMap[id]) {
      footnoteHTML += '<div id="fn-' + id + '" style="margin:4px 0;text-indent:-2em;padding-left:2em;">' + (idx + 1) + '. ' + footnoteMap[id] + '<a href="#fnref-' + id + '-0" style="color:#e8859b;text-decoration:none;font-size:12px;margin-left:4px;white-space:nowrap;">↩</a></div>';
    }
  });
  footnoteHTML += '</div>';
  footnotes.innerHTML = footnoteHTML;
  
  return tempDiv.innerHTML;
}

// ===== 导出 Word =====
async function exportWord() {
  var content = editor.value.trim();
  if (!content) { showToast(t('noContent')); return; }

  // 使用预览区已渲染的 HTML，并将 mermaid SVG 转为 PNG 图片（Word 不支持 SVG）
  var htmlContent = await convertMermaidToPng(preview);
  // 移除 TOC（Word 中无法正确跳转）
  htmlContent = htmlContent.replace(/<div class="toc"[^>]*>[\s\S]*?<\/div>/gi, '');

  // 限制图片尺寸不超过 Word 页面宽度（约 550 像素）
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  var imgs = tempDiv.querySelectorAll('img');
  var maxWidth = 550;
  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    var w = parseInt(img.getAttribute('width')) || img.naturalWidth || 800;
    var h = parseInt(img.getAttribute('height')) || img.naturalHeight || 600;
    if (w > maxWidth) {
      var s = maxWidth / w;
      img.setAttribute('width', maxWidth);
      img.setAttribute('height', Math.round(h * s));
    }
  }
  htmlContent = tempDiv.innerHTML;

  var wordCSS = getThemeWordCSS();

  var wordDoc = '<html xmlns:o="urn:schemas-microsoft-com:office:office"\nxmlns:w="urn:schemas-microsoft-com:office:word"\nxmlns="http://www.w3.org/TR/REC-html40">\n<head>\n<meta charset="UTF-8">\n<title>' + fileNameEl.textContent + '<\/title>\n<!--[if gte mso 9]>\n<xml>\n<w:WordDocument>\n<w:View>Print<\/w:View>\n<w:Zoom>100<\/w:Zoom>\n<w:DoNotOptimizeForBrowser/>\n<\/w:WordDocument>\n<\/xml>\n<![endif]-->\n<style>\n' + wordCSS + '\n<\/style>\n<\/head>\n<body>\n<div id="write">\n' + htmlContent + '\n<\/div>\n<\/body>\n<\/html>';

  var blob = new Blob(['\ufeff', wordDoc], { type: 'application/msword' });
  downloadBlob(blob, getExportName('.doc'), 'application/msword');
  showToast(t('wordExported'));
}

/**
 * 等待所有 Mermaid 图表渲染完成（最多等待 5 秒）
 * 确保导出时所有图表都已生成 SVG
 */
async function waitForMermaidRender(container, timeout) {
  timeout = timeout || 5000;
  var startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    var mermaidDivs = container.querySelectorAll('.mermaid');
    var allRendered = true;
    for (var i = 0; i < mermaidDivs.length; i++) {
      if (!mermaidDivs[i].querySelector('svg')) {
        allRendered = false;
        break;
      }
    }
    if (allRendered && mermaidDivs.length > 0) return true;
    if (mermaidDivs.length === 0) return true;
    await new Promise(function(r) { setTimeout(r, 200); });
  }
  return false;
}

/**
 * 将预览区中的 mermaid SVG 元素转换为 PNG 格式的 <img> 标签
 * Word 不支持 SVG，但支持 PNG 图片
 * 对于渲染失败的图表，用代码块样式降级显示
 * 直接在真实DOM上操作（保存→替换→取HTML→恢复），确保100%可靠
 */
async function convertMermaidToPng(container) {
  if (window.mermaid) {
    try {
      var allMermaidDivs = container.querySelectorAll('.mermaid');
      var unrendered = [];
      for (var k = 0; k < allMermaidDivs.length; k++) {
        if (!allMermaidDivs[k].querySelector('svg')) {
          unrendered.push(allMermaidDivs[k]);
        }
      }
      if (unrendered.length > 0) {
        mermaid.run({ nodes: unrendered });
      }
    } catch (e) {}
    await waitForMermaidRender(container, 5000);
  }

  var originalHtml = container.innerHTML;
  var mermaidEls = container.querySelectorAll('.mermaid');
  var replacements = [];

  for (var i = 0; i < mermaidEls.length; i++) {
    var div = mermaidEls[i];
    var svg = div.querySelector('svg');
    // 从 data-mermaid-src 属性获取原始代码（用于降级显示）
    var srcCode = decodeURIComponent(div.getAttribute('data-mermaid-src') || '') || div.textContent || 'Mermaid 图表';

    if (!svg) {
      replacements.push({ el: div, html: buildFallbackCodeBlock(srcCode) });
      continue;
    }

    try {
      var svgClone = svg.cloneNode(true);
      svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svgClone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

      var rect = svg.getBoundingClientRect();
      var w = Math.round(rect.width) || parseInt(svg.getAttribute('width')) || 800;
      var h = Math.round(rect.height) || parseInt(svg.getAttribute('height')) || 600;

      svgClone.setAttribute('width', w);
      svgClone.setAttribute('height', h);
      if (!svgClone.getAttribute('viewBox')) {
        svgClone.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      }

      var MAX_SIZE = 4000;
      var finalW = w, finalH = h;
      if (finalW > MAX_SIZE) { var s = MAX_SIZE / finalW; finalW = MAX_SIZE; finalH = Math.round(finalH * s); }
      if (finalH > MAX_SIZE) { var s = MAX_SIZE / finalH; finalH = MAX_SIZE; finalW = Math.round(finalW * s); }
      if (finalW < 400) { var s = 400 / finalW; finalW = 400; finalH = Math.round(finalH * s); }

      var svgStr = new XMLSerializer().serializeToString(svgClone);
      var svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);

      var pngDataUrl = await svgToPng(svgDataUrl, finalW, finalH, 4);

      if (pngDataUrl && pngDataUrl.length > 2000) {
        var maxWidth = 550;
        var displayW = finalW;
        var displayH = finalH;
        if (displayW > maxWidth) {
          var s = maxWidth / displayW;
          displayW = maxWidth;
          displayH = Math.round(displayH * s);
        }
        var imgHtml = '<div style="text-align:center;margin:1.5em 0;"><img src="' + pngDataUrl + '" width="' + displayW + '" height="' + displayH + '" style="max-width:100%;"/></div>';
        replacements.push({ el: div, html: imgHtml });
      } else {
        replacements.push({ el: div, html: buildFallbackCodeBlock(srcCode) });
      }
    } catch (e) {
      console.warn('Mermaid 转 PNG 失败:', e);
      replacements.push({ el: div, html: buildFallbackCodeBlock(srcCode) });
    }
  }

  for (var r = 0; r < replacements.length; r++) {
    var rep = replacements[r];
    if (rep.el && rep.el.parentNode) {
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = rep.html;
      var newNode = tempDiv.firstChild;
      rep.el.parentNode.replaceChild(newNode, rep.el);
    }
  }

  var resultHtml = container.innerHTML;
  container.innerHTML = originalHtml;
  if (window.mermaid) {
    try { mermaid.run({ nodes: container.querySelectorAll('.mermaid') }); } catch(e) {}
  }

  return resultHtml;
}

/**
 * 构建降级用的代码块HTML
 */
function buildFallbackCodeBlock(code) {
  return '<pre style="background:#f5f2f1;border:1px solid #ddd;border-radius:8px;padding:16px;margin:1.5em 0;overflow:auto;font-family:Consolas,monospace;font-size:14px;line-height:1.6;white-space:pre-wrap;"><code>' + escapeHtml(code) + '</code></pre>';
}

/**
 * 将 SVG URL 转换为 PNG data URL
 * @param {string} svgUrl - SVG 文件 URL
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @param {number} scale - 缩放倍数（默认 4）
 */
function svgToPng(svgDataUrl, width, height, scale) {
  scale = scale || 4;
  return new Promise(function(resolve, reject) {
    var attempts = [
      { type: 'dataUrl', url: svgDataUrl }
    ];

    // 尝试从data URL解析出SVG字符串，同时生成blob URL作为备选
    try {
      var svgStr = decodeURIComponent(svgDataUrl.replace('data:image/svg+xml;charset=utf-8,', ''));
      var blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      var blobUrl = URL.createObjectURL(blob);
      attempts.push({ type: 'blobUrl', url: blobUrl });
    } catch(e) {}

    var currentAttempt = 0;
    var lastError = null;

    function tryNext() {
      if (currentAttempt >= attempts.length) {
        reject(lastError || new Error('所有 SVG 加载方式都失败'));
        return;
      }

      var attempt = attempts[currentAttempt++];
      var img = new Image();
      img.onload = function() {
        try {
          var nw = img.naturalWidth || width;
          var nh = img.naturalHeight || height;
          if (nw < 10 || nh < 10) { nw = width; nh = height; }
          var canvas = document.createElement('canvas');
          canvas.width = Math.round(nw * scale);
          canvas.height = Math.round(nh * scale);
          var ctx = canvas.getContext('2d');
          // 白色背景（避免透明背景在某些情况下的问题）
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.scale(scale, scale);
          ctx.drawImage(img, 0, 0, nw, nh);
          var dataUrl = canvas.toDataURL('image/png');
          // 清理blob URL
          if (attempt.type === 'blobUrl') { try { URL.revokeObjectURL(attempt.url); } catch(e) {} }
          // 验证：图片数据不能太小（说明可能是空白）
          if (dataUrl && dataUrl.length > 2000) {
            resolve(dataUrl);
          } else {
            lastError = new Error('生成的PNG太小，可能是空白图');
            tryNext();
          }
        } catch (e) {
          lastError = e;
          if (attempt.type === 'blobUrl') { try { URL.revokeObjectURL(attempt.url); } catch(e) {} }
          tryNext();
        }
      };
      img.onerror = function() {
        lastError = new Error('SVG 加载失败: ' + attempt.type);
        if (attempt.type === 'blobUrl') { try { URL.revokeObjectURL(attempt.url); } catch(e) {} }
        tryNext();
      };
      img.src = attempt.url;
    }

    tryNext();
  });
}

/**
 * 将Mermaid相关的CSS规则嵌入到SVG中
 * Mermaid生成的SVG使用外部CSS类（如.node、.edge、.label等），
 * 序列化后脱离了原文档环境，需要把相关CSS规则作为<style>标签嵌入SVG
 * 比逐元素内联更可靠，能保留CSS的完整功能
 */
function embedMermaidStyles(svgClone) {
  try {
    var cssText = '';
    var sheets = document.styleSheets;
    for (var i = 0; i < sheets.length; i++) {
      try {
        var rules = sheets[i].cssRules || sheets[i].rules;
        if (!rules) continue;
        for (var j = 0; j < rules.length; j++) {
          var rule = rules[j];
          var text = rule.cssText;
          // 收集mermaid相关的CSS规则（包括mermaid id选择器、各类图表样式）
          if (/mermaid|\.label|\.node|\.edge|\.cluster|\.arrowhead|\.flowchart|\.sequence|#mermaid-\d+/i.test(text)) {
            cssText += text + '\n';
          }
        }
      } catch (e) {}
    }
    
    if (cssText) {
      var styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
      styleEl.textContent = cssText;
      svgClone.insertBefore(styleEl, svgClone.firstChild);
    }
  } catch (e) {
    console.warn('嵌入Mermaid CSS失败:', e);
  }
}

/**
 * 获取 CSS 变量的计算后颜色值（浏览器会将 oklch/color-mix 转为 rgb/rgba）
 * getComputedStyle().getPropertyValue() 返回的是原始声明值，可能含 oklch/color-mix
 * Word 不支持这些现代函数，需通过临时元素获取计算后的 rgb/rgba 值
 */
function getComputedCSSVar(varName, fallback) {
  try {
    var tempEl = document.createElement('div');
    tempEl.style.color = 'var(' + varName + ')';
    tempEl.style.display = 'none';
    document.body.appendChild(tempEl);
    var computed = getComputedStyle(tempEl).color;
    document.body.removeChild(tempEl);
    if (computed && computed.indexOf('rgb') === 0) {
      return computed;
    }
  } catch (e) {}
  return fallback;
}

/**
 * 从当前主题的实时 CSS 变量生成 Word 导出专用 CSS
 * 通过临时元素读取计算后的颜色值，确保 Word 能正确解析（不含 oklch/color-mix）
 */
function getThemeWordCSS() {
  var bg = getComputedCSSVar('--bg', '#faf8f7');
  var surface = getComputedCSSVar('--surface', '#f5f2f1');
  var text = getComputedCSSVar('--text', '#443a3e');
  var textSemi = getComputedCSSVar('--text-semi', '#7b6c71');
  var accent = getComputedCSSVar('--accent', '#e8859b');
  var border = getComputedCSSVar('--border', 'rgba(68,58,62,0.20)');

  // 从 border 提取 RGB 分量，使用更高不透明度（Word 中低透明度边框不可见）
  var borderRgb = border.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  var solidBorder = borderRgb ? 'rgb(' + borderRgb[1] + ',' + borderRgb[2] + ',' + borderRgb[3] + ')' : border;
  var semiBorder = borderRgb ? 'rgba(' + borderRgb[1] + ',' + borderRgb[2] + ',' + borderRgb[3] + ',0.5)' : border;

  return [
    '@charset "UTF-8";',
    'body { font-family: "Microsoft YaHei", "PingFang SC", sans-serif; background: ' + bg + '; color: ' + text + '; font-size: 16px; line-height: 1.8; }',
    '#write { max-width: 100%; padding: 20px; }',
    '#write p { margin: 1.1em 0; }',
    '#write a { color: ' + accent + '; text-decoration: underline; }',
    '#write a:hover { background: transparent; }',
    '#write h1, #write h2, #write h3, #write h4, #write h5, #write h6 { color: ' + text + '; font-weight: bold; margin: 1.5em 0 0.5em; }',
    '#write h1 { font-size: 2em; border-bottom: 2px solid ' + semiBorder + '; padding-bottom: 0.3em; }',
    '#write h2 { font-size: 1.5em; border-bottom: 2px solid ' + semiBorder + '; padding-bottom: 0.2em; }',
    '#write h3 { font-size: 1.25em; }',
    '#write h4 { font-size: 1.1em; }',
    '#write hr { border: none; border-top: 2px solid ' + semiBorder + '; margin: 2em 0; }',
    '#write blockquote { margin: 1em 0; padding: 1em 1.5em; border-left: 4px solid ' + accent + '; background: ' + surface + '; color: ' + text + '; }',
    '#write ul, #write ol { padding-left: 2em; margin: 1em 0; }',
    '#write li { margin: 0.4em 0; }',
    '#write table { border-collapse: collapse; width: 100%; margin: 1.5em 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }',
    '#write th, #write td { padding: 8px 12px; border: 1px solid ' + solidBorder + '; mso-border-alt: 0.5pt solid ' + solidBorder + '; }',
    '#write th { background: ' + surface + '; font-weight: bold; border: 1px solid ' + solidBorder + '; }',
    '#write code { font-family: Consolas, monospace; font-size: 0.9em; padding: 2px 6px; background: ' + surface + '; color: ' + accent + '; border: 1px solid ' + semiBorder + '; }',
    '#write pre { background: ' + surface + '; padding: 16px; margin: 1.5em 0; overflow: auto; border: 1px solid ' + solidBorder + '; }',
    '#write pre code { background: transparent; padding: 0; color: ' + text + '; border: none; }',
    '#write img { max-width: 100%; }',
    '#write mark { background: ' + surface + '; color: inherit; padding: 2px 4px; }',
    '#write kbd { font-family: Consolas, monospace; padding: 2px 6px; border: 1px solid ' + semiBorder + '; border-bottom-width: 2px; background: ' + bg + '; }',
    '#write strong { font-weight: bold; }',
    '#write em { font-style: italic; }',
  ].join('\n');
}

// ===== 保存为 .md 文件 =====
function saveMarkdown() {
  var content = editor.value;
  if (!content.trim()) { showToast(t('noContent')); return; }
  downloadBlob(content, getExportName('.md'), 'text/markdown;charset=utf-8');
  showToast(t('mdSaved'));
}

// ===== 辅助函数 =====

/**
 * 收集页面所有激活的样式规则，确保导出 HTML 与渲染窗口所见即所得
 * 导出HTML的包裹元素为 <div id="write" class="markdown-body">
 * 所以 #write 选择器能匹配主题CSS，但仍需补充：
 * 1. themeCompat 兼容层（变量映射）
 * 2. 编辑器内联样式中的 .markdown-body 细节样式
 * 3. 通用兜底样式
 */
async function collectAllStyles() {
  // 兜底：在文档最前预置 RGB 辅助变量，确保任意主题/模式在导出 HTML 与打印 PDF
  // （均为独立文档，不继承 index.html 全局 :root）中 rgba(var(--xxx), a) 不失效。
  // 置于最前：主题自身 :root 在后，若已定义同名变量则覆盖此处，缺失时回退到此。
  var darkScheme = (_currentThemeMode === 'dark') ? '  color-scheme: dark;\n' : '';
  var rgbSafeFallback = '\n/* export/print rgb-safe fallback */\n' +
    ':root {\n' +
    darkScheme +
    '  --white-rgb: 255, 255, 255;\n' +
    '  --black-rgb: 0, 0, 0;\n' +
    '  --ink-rgb: 255, 255, 255;\n' +
    '  --accent-rgb: 232, 133, 155;\n' +
    '  --text-rgb: 68, 58, 62;\n' +
    '  --code-muted-rgb: 130, 130, 130;\n' +
    '}\n';
  var allCSS = rgbSafeFallback;

  // 1. fetch 主题 CSS 文件（包含 :root 变量、#write 样式等）
  var theme = themeList[_currentThemeName];
  var cssFile = _currentThemeMode === 'dark' ? theme.dark : theme.light;
  var themeCSS = '';
  try {
    var resp = await fetch(cssFile);
    if (resp.ok) {
      themeCSS = await resp.text();
    }
  } catch (e) {}

  if (!themeCSS) {
    try {
      var styleSheets = document.styleSheets;
      for (var i = 0; i < styleSheets.length; i++) {
        var sheet = styleSheets[i];
        if (sheet.href && sheet.href.indexOf(cssFile) !== -1) {
          var rules = [];
          for (var j = 0; j < sheet.cssRules.length; j++) {
            rules.push(sheet.cssRules[j].cssText);
          }
          if (rules.length > 0) { themeCSS = rules.join('\n'); break; }
        }
      }
    } catch (e) {}
  }

  if (!themeCSS) {
    themeCSS = _currentThemeMode === 'dark' ? getDarkSafeCSS() : getSafeCSS();
  }

  allCSS += themeCSS;

  // 2. 从 document.styleSheets 收集内联样式表中的内容渲染规则
  //    过滤掉编辑器 UI 样式，只保留 .markdown-body / 内容元素 / :root 等
  try {
    var sheets = document.styleSheets;
    for (var si = 0; si < sheets.length; si++) {
      var s = sheets[si];
      // 跳过外部 CSS 文件（主题CSS已经单独处理）
      if (s.href) continue;
      try {
        for (var ri = 0; ri < s.cssRules.length; ri++) {
          var rule = s.cssRules[ri];
          var ruleText = rule.cssText;
          // 跳过 @charset 和 @keyframes
          if (ruleText.indexOf('@charset') === 0) continue;
          // 跳过编辑器 UI 样式
          if (/toolbar|statusbar|toast|editor-panel|\.editor\b|#editor\b|theme-selector|theme-dropdown|\.btn|file-input|\.split-|mode-btn|toc-float-btn|toc-float-content|\.open-btn|icon-btn|fmt-/i.test(ruleText)) continue;
          // 注意：不再跳过 .markdown-body blockquote —— 渲染窗口(#preview.markdown-body)中
          // 该基础规则特异性高于主题 blockquote，本就生效；导出须一致以"渲染窗口为准"。
          // 跳过 #write { max-width: 100% !important } 这类强制撑满规则，
          // 否则会覆盖导出时 860px 居中的默认宽度，导致“切换为浏览器宽度”按钮失效
          if (/max-width:\s*100%\s*!important/i.test(ruleText)) continue;
          // 收集内容相关样式
          if (/\.markdown-body|#write|#preview|\.preview-panel|:root|\.toc\b|\.mermaid|\.md-fences|\.md-alert|\.task-list-item|@media\s+print/i.test(ruleText)) {
            allCSS += '\n' + ruleText;
          }
        }
      } catch (e) {}
    }
  } catch (e) {}

  // 3. 附加 themeCompat 兼容层（变量映射）
  var compatStyle = document.getElementById('themeCompat');
  if (compatStyle && compatStyle.textContent) {
    allCSS += '\n' + compatStyle.textContent;
  }

  // 4. 通用兜底样式
  //    说明：.markdown-body blockquote 已由上方 document.styleSheets 收集（与渲染窗口一致）；
  //          此处仅补 display:block 兜底，避免个别主题把 blockquote 设为 flex 导致子元素横排。
  allCSS += '\n\n/* export compat */\n' +
    '#write.markdown-body { max-width: 860px; margin: 30px auto 60px; padding: 52px 80px 96px; box-sizing: border-box; line-height: 1.8; font-size: 16px; }\n' +
    /* 通用水平线兜底：用 :where() 降到 0 优先级，仅在主题未定义 hr 时生效，避免覆盖 animal-island 的猫爪分割线 */
    ':where(hr) { border: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--border-semi, rgba(0,0,0,0.15)), transparent); margin: 2em 0; }\n' +
    '#write pre { background: var(--code-bg, #f5f2f1); color: var(--code-text, #7b6c71); border: 1px solid rgba(var(--accent-rgb, 232,133,155), 0.18); border-radius: 16px; padding: 1.4em; margin: 2em 0; overflow: auto; font-family: var(--font-mono, monospace); font-size: 14.5px; line-height: 1.6; position: relative; }\n' +
    '#write pre::before { content: ""; display: block; width: 64px; height: 10px; margin-bottom: 12px; border-radius: 0; background: radial-gradient(circle at 5px 5px, var(--code-dot-red, #d87070) 5px, transparent 5.5px), radial-gradient(circle at 23px 5px, var(--code-dot-yellow, #d8c870) 5px, transparent 5.5px), radial-gradient(circle at 41px 5px, var(--code-dot-green, #70c888) 5px, transparent 5.5px); background-size: 64px 10px; background-repeat: no-repeat; }\n' +
    '#write pre code { background: transparent; padding: 0; color: var(--code-ink, #443a3e); font-weight: normal; border: none; }\n' +
    // blockquote 修复：主题CSS可能设为 display:flex 导致子元素水平排列，恢复为 block
    '#write blockquote { display: block; }\n' +
    // 代码块圆点修复：确保 padding-top 足够容纳三色圆点（top:14px + height:10px + 间距 = 至少36px）
    '#write pre { padding-top: 20px; }\n';

  // 4.5 打印/PDF 安全兜底（防御性）：无论主题 CSS 来源如何，都在打印媒体下用 rgba 覆盖高风险变量，
  //     避免 color-mix(in oklch, ...) 在打印/PDF 渲染管线支持不完整时退化成实色黑块（如顶部横条）。
  //     限定在 @media print 内，避免影响导出 HTML 的屏幕显示（不改变 Everforest 等主题的边框外观）。
  //     利用 CSS 层叠：后写的同名变量覆盖前面的定义。--text-rgb/--accent-rgb 由主题 :root 提供。
  allCSS += '\n\n/* export print-safe rgba fallback (override color-mix oklch) */\n' +
    '@media print {\n' +
    '  :root {\n' +
    '    --shadow-sm: none;\n' +
    '    --shadow: none;\n' +
    '    --shadow-lg: none;\n' +
    '    --border: rgba(var(--text-rgb, 68, 58, 62), 0.10);\n' +
    '    --border-semi: rgba(var(--text-rgb, 68, 58, 62), 0.15);\n' +
    '    --accent-soft: rgba(var(--accent-rgb, 232, 133, 155), 0.12);\n' +
    '    --muted: rgba(var(--text-rgb, 68, 58, 62), 0.55);\n' +
    '  }\n' +
    '}\n';

  return allCSS;
}

/**
 * 从 Markdown 内容中提取第一个标题（h1 > h2 > h3 > h4 > h5 > h6）
 * 返回去掉 # 符号的标题文本，如果没有标题则返回空字符串
 */
function extractTitleFromMarkdown(text) {
  // 去掉 YAML front matter
  text = text.replace(/^---\n[\s\S]*?\n---\n?/, '');
  // 从 h1 到 h6 依次查找
  for (var level = 1; level <= 6; level++) {
    var hashes = '';
    for (var i = 0; i < level; i++) hashes += '#';
    var regex = new RegExp('^' + hashes + ' +(.+)$', 'm');
    var match = text.match(regex);
    if (match) {
      return match[1].trim().replace(/[#]+$/, '').trim();
    }
  }
  return '';
}

/**
 * 生成导出文件名
 * 规则：
 * 1. 如果是从本地打开的文件，使用原文件名（去掉扩展名）
 * 2. 如果是未命名文件，自动提取 Markdown 第一个标题作为文件名
 */
function getExportName(ext) {
  var name;

  // 规则1：优先使用本地打开的文件名（去掉扩展名）
  if (window._openedFileName) {
    name = window._openedFileName.replace(/\.(md|markdown|txt|text)$/i, '');
  }
  // 规则2：未命名/未打开文件，从 Markdown 内容提取标题
  else if (fileNameEl.textContent === t('unnamed') || fileNameEl.textContent === t('noFileOpen')) {
    name = extractTitleFromMarkdown(editor.value);
    if (!name) name = t('unnamed');
  }
  // 兜底：使用当前显示的文件名（去掉扩展名）
  else {
    name = fileNameEl.textContent.replace(/\.(md|markdown|txt|text)$/i, '');
  }

  // 清理非法文件名字符
  name = name.replace(/[\\/:*?"<>|]/g, '_').trim();
  // 限制长度，避免文件名过长
  if (name.length > 100) name = name.substring(0, 100);

  return name + ext;
}

function downloadBlob(content, filename, mimeType) {
  var blob;
  if (typeof content === 'string') {
    blob = new Blob([content], { type: mimeType });
  } else {
    blob = content;
  }
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * （已移除早期 getInlineCSS() / fetchThemeCSS()：二者逻辑已被 collectAllStyles()
 *  完全取代，属冗余死代码。保留 getSafeCSS / getDarkSafeCSS 作为 fetch 失败时的回退。）
 */

/**
 * Word 导出专用 CSS —— 所有 oklch 替换为 hex，去除不支持的属性
 */
function getWordCSS() {
  return [
    '@charset "UTF-8";',
    'body { font-family: "Microsoft YaHei", "PingFang SC", sans-serif; background: #faf8f7; color: #443a3e; font-size: 16px; line-height: 1.8; }',
    '#write { max-width: 100%; padding: 20px; }',
    '#write p { margin: 1.1em 0; }',
    '#write a { color: #e8859b; text-decoration: underline; }',
    '#write h1, #write h2, #write h3, #write h4, #write h5, #write h6 { color: #443a3e; font-weight: bold; margin: 1.5em 0 0.5em; }',
    '#write h1 { font-size: 2em; border-bottom: 1px solid #f0d0d8; padding-bottom: 0.3em; }',
    '#write h2 { font-size: 1.5em; border-bottom: 1px solid #f0d8e0; padding-bottom: 0.2em; }',
    '#write h3 { font-size: 1.25em; }',
    '#write h4 { font-size: 1.1em; }',
    '#write hr { border: none; border-top: 1px solid #ddd; margin: 2em 0; }',
    '#write blockquote { margin: 1em 0; padding: 1em 1.5em; border-left: 4px solid #e8859b; background: #fdf2f5; color: #443a3e; }',
    '#write ul, #write ol { padding-left: 2em; margin: 1em 0; }',
    '#write li { margin: 0.4em 0; }',
    '#write table { border-collapse: collapse; width: 100%; margin: 1.5em 0; }',
    '#write th, #write td { padding: 8px 12px; border: 1px solid #ddd; }',
    '#write th { background: #f5f2f1; font-weight: bold; }',
    '#write code { font-family: Consolas, monospace; font-size: 0.9em; padding: 2px 6px; background: #fdf2f5; color: #e8859b; border: 1px solid #f0d0d8; }',
    '#write pre { background: #f5f2f1; padding: 16px; margin: 1.5em 0; overflow: auto; border: 1px solid #e8d0d8; }',
    '#write pre code { background: transparent; padding: 0; color: #443a3e; border: none; }',
    '#write img { max-width: 100%; }',
    '#write mark { background: #fdf2f5; color: inherit; padding: 2px 4px; }',
    '#write kbd { font-family: Consolas, monospace; padding: 2px 6px; border: 1px solid #ccc; border-bottom-width: 2px; background: #faf8f7; }',
    '#write strong { font-weight: bold; }',
    '#write em { font-style: italic; }',
  ].join('\n');
}

/**
 * Word 导出暗色 CSS
 */
function getDarkWordCSS() {
  return [
    '@charset "UTF-8";',
    'body { font-family: "Microsoft YaHei", "PingFang SC", sans-serif; background: #484347; color: #fff5f8; font-size: 16px; line-height: 1.8; }',
    '#write { max-width: 100%; padding: 20px; }',
    '#write p { margin: 1.1em 0; color: #fff5f8; }',
    '#write a { color: #f0adc8; text-decoration: underline; }',
    '#write h1, #write h2, #write h3, #write h4, #write h5, #write h6 { color: #fff5f8; font-weight: bold; margin: 1.5em 0 0.5em; }',
    '#write h1 { font-size: 2em; border-bottom: 1px solid rgba(255, 170, 200, 0.32); padding-bottom: 0.3em; }',
    '#write h2 { font-size: 1.5em; border-bottom: 1px solid rgba(255, 170, 200, 0.24); padding-bottom: 0.2em; }',
    '#write h3 { font-size: 1.25em; }',
    '#write h4 { font-size: 1.1em; }',
    '#write hr { border: none; border-top: 1px solid rgba(255, 245, 248, 0.22); margin: 2em 0; }',
    '#write blockquote { margin: 1em 0; padding: 1em 1.5em; border-left: 4px solid #f0adc8; background: rgba(255, 170, 200, 0.12); color: #fff5f8; }',
    '#write ul, #write ol { padding-left: 2em; margin: 1em 0; }',
    '#write li { margin: 0.4em 0; }',
    '#write table { border-collapse: collapse; width: 100%; margin: 1.5em 0; }',
    '#write th, #write td { padding: 8px 12px; border: 1px solid rgba(255, 245, 248, 0.12); }',
    '#write th { background: #565152; font-weight: bold; }',
    '#write code { font-family: Consolas, monospace; font-size: 0.9em; padding: 2px 6px; background: rgba(255, 170, 200, 0.18); color: #f0adc8; border: 1px solid rgba(255, 170, 200, 0.30); }',
    '#write pre { background: #3c383a; padding: 16px; margin: 1.5em 0; overflow: auto; border: 1px solid rgba(255, 170, 200, 0.15); }',
    '#write pre code { background: transparent; padding: 0; color: #fff5f8; border: none; }',
    '#write img { max-width: 100%; }',
    '#write mark { background: rgba(255, 170, 200, 0.25); color: inherit; padding: 2px 4px; }',
    '#write kbd { font-family: Consolas, monospace; padding: 2px 6px; border: 1px solid rgba(255, 245, 248, 0.22); border-bottom-width: 2px; background: #484347; }',
    '#write strong { font-weight: bold; }',
    '#write em { font-style: italic; }',
  ].join('\n');
}

/**
 * 安全 CSS —— 完整 bloom-petal 风格，不含 oklch / color-mix 替换为 hex / rgba
 * 用于 PDF 导出（html2canvas 不支持 oklch）
 * 颜色对照表（从 bloom-petal.css 提取）：
 *   --accent: oklch(64% 0.22 350)     → #e8859b
 *   --bg: oklch(98% 0.01 350)         → #faf8f7
 *   --surface: oklch(96% 0.015 350)   → #f5f2f1
 *   --surface-2: oklch(94% 0.02 350)  → #efede8
 *   --text: oklch(25% 0.02 354)       → #443a3e
 *   --text-semi: oklch(45% 0.02 354)  → #7b6c71
 *   --success: oklch(70% 0.1 150)      → #7cb87c
 *   --warning: oklch(75% 0.1 75)       → #d4c87a
 *   --error: oklch(60% 0.12 25)        → #c47070
 *   --info: oklch(62% 0.1 250)         → #7070c4
 *   --important: oklch(65% 0.16 280)   → #9070c4
 *   --code-dot-red: oklch(65% 0.12 25) → #d87070
 *   --code-dot-yellow: oklch(78% 0.12 85) → #d8c870
 *   --code-dot-green: oklch(72% 0.12 145) → #70c888
 */
function getSafeCSS() {
  return [
    '@charset "UTF-8";',
    ':root {',
    '  --space-unit: 8px;',
    '  --space-3xs: calc(var(--space-unit) * 0.25);',
    '  --space-2xs: calc(var(--space-unit) * 0.5);',
    '  --space-xs: calc(var(--space-unit) * 1);',
    '  --space-sm: calc(var(--space-unit) * 1.5);',
    '  --space-md: calc(var(--space-unit) * 2);',
    '  --space-lg: calc(var(--space-unit) * 3);',
    '  --space-xl: calc(var(--space-unit) * 4);',
    '  --space-2xl: calc(var(--space-unit) * 6);',
    '  --space-3xl: calc(var(--space-unit) * 8);',
    '  --accent: #e8859b;',
    '  --accent-rgb: 232, 133, 155;',
    '  --accent-hover: #d6788d;',
    '  --accent-active: #c56b80;',
    '  --accent-soft: rgba(232, 133, 155, 0.12);',
    '  --success: #7cb87c;',
    '  --warning: #d4c87a;',
    '  --error: #c47070;',
    '  --info: #7070c4;',
    '  --important: #9070c4;',
    '  --bg: #faf8f7;',
    '  --surface: #f5f2f1;',
    '  --surface-2: #efede8;',
    '  --text: #443a3e;',
    '  --text-rgb: 68, 58, 62;',
    '  --text-semi: #7b6c71;',
    '  --muted: rgba(68, 58, 62, 0.55);',
    '  --border: rgba(68, 58, 62, 0.10);',
    '  --border-semi: rgba(68, 58, 62, 0.20);',
    '  --shadow-sm: 0 2px 8px rgba(68, 58, 62, 0.04);',
    '  --shadow: 0 10px 30px rgba(68, 58, 62, 0.06);',
    '  --shadow-lg: 0 24px 60px rgba(68, 58, 62, 0.10);',
    '  --font-sans: "MiSans", "PingFang SC", "Microsoft YaHei", sans-serif;',
    '  --font-mono: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Monaco, Consolas, monospace;',
    '  --selection: rgba(232, 133, 155, 0.20);',
    '  --code-bg: var(--surface);',
    '  --code-text: var(--text-semi);',
    '  --code-ink: var(--text);',
    '  --code-dot-red: #d87070;',
    '  --code-dot-yellow: #d8c870;',
    '  --code-dot-green: #70c888;',
    '  --white-rgb: 255, 255, 255;',
    '  --black-rgb: 0, 0, 0;',
    '}',
    'html, body {',
    '  background: radial-gradient(1400px circle at 16% 10%, rgba(232, 133, 155, 0.08), transparent 36%), linear-gradient(150deg, rgba(232, 133, 155, 0.05), transparent 48%), linear-gradient(180deg, rgba(255, 255, 255, 0.7), transparent 340px), #faf8f7;',
    '  color: #443a3e;',
    '  font-family: "MiSans", "PingFang SC", "Microsoft YaHei", sans-serif;',
    '  -webkit-font-smoothing: antialiased;',
    '}',
    '::selection { background: rgba(232, 133, 155, 0.20); }',
    '#write {',
    '  max-width: 860px;',
    '  line-height: 1.8;',
    '  font-size: 16px;',
    '  color: #443a3e;',
    '  margin: 0 auto;',
    '  padding: 48px 32px 64px;',
    '  background: linear-gradient(180deg, rgba(232, 133, 155, 0.12), transparent 460px), linear-gradient(120deg, rgba(255,255,255,0.70), transparent 70%);',
    '  border: 1px solid rgba(68, 58, 62, 0.10);',
    '  border-radius: 24px;',
    '  box-shadow: 0 24px 60px rgba(68, 58, 62, 0.10);',
    '}',
    '#write p { margin: 1.1em 0; }',
    '#write a { color: #e8859b; text-decoration: none; border-bottom: 1px solid transparent; }',
    '#write a:hover { border-bottom-color: #e8859b; background: transparent; }',
    '#write h1, #write h2, #write h3, #write h4, #write h5, #write h6 { color: #443a3e; font-weight: 800; line-height: 1.25; margin: 48px 0 16px; letter-spacing: -0.015em; position: relative; }',
    '#write h1 { font-size: 2.25em; letter-spacing: -0.02em; border-bottom: 1px solid rgba(232, 133, 155, 0.3); padding-bottom: 0.3em; }',
    '#write h2 { font-size: 1.68em; border-bottom: 1px solid rgba(232, 133, 155, 0.22); padding-bottom: 0.24em; color: rgba(68, 58, 62, 0.9); }',
    '#write h3 { font-size: 1.32em; color: rgba(68, 58, 62, 0.86); }',
    '#write h4 { font-size: 1.15em; color: rgba(68, 58, 62, 0.8); }',
    '#write h1::after, #write h2::after { content: ""; position: absolute; left: 0; bottom: -0.5em; width: 76px; height: 3px; background: linear-gradient(90deg, rgba(232, 133, 155, 0.45), transparent); border-radius: 999px; }',
    '#write h3::after { content: ""; position: absolute; left: 0; bottom: -0.38em; width: 44px; height: 2px; background: linear-gradient(90deg, rgba(232, 133, 155, 0.32), transparent); border-radius: 999px; }',
    '#write h4::after { content: ""; position: absolute; left: 0; bottom: -0.34em; width: 32px; height: 2px; background: linear-gradient(90deg, rgba(232, 133, 155, 0.22), transparent); border-radius: 999px; }',
    '#write hr { border: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(68, 58, 62, 0.20), transparent); margin: 64px 0; }',
    '#write blockquote { margin: 32px 0; padding: 24px 32px; background: rgba(232, 133, 155, 0.08); border-left: 4px solid #e8859b; border-radius: 14px; color: #443a3e; position: relative; box-shadow: 0 2px 8px rgba(232, 133, 155, 0.08); }',
    '#write blockquote p:first-child { margin-top: 0; }',
    '#write blockquote p:last-child { margin-bottom: 0; }',
    '#write ul, #write ol { padding-left: 1.5em; margin: 1em 0; }',
    '#write li { margin: 0.5em 0; }',
    '#write li>ul, #write li>ol { margin: 0.4em 0; }',
    '#write ul li::marker { color: rgba(232, 133, 155, 0.72); font-size: 0.98em; font-weight: 700; }',
    '#write ol li::marker { color: rgba(232, 133, 155, 0.72); font-weight: 800; font-variant-numeric: tabular-nums; }',
    '#write table { border-collapse: separate; border-spacing: 0; width: 100%; margin: 2em 0; border: 1px solid rgba(68, 58, 62, 0.10); border-radius: 14px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02); }',
    '#write th, #write td { padding: 0.75em 1em; border-bottom: 1px solid rgba(68, 58, 62, 0.10); }',
    '#write th { text-align: left; background: #f5f2f1; font-weight: 600; color: #443a3e; }',
    '#write tr:last-child td { border-bottom: 0; }',
    '#write tr:nth-child(even) td { background: rgba(232, 133, 155, 0.02); }',
    '#write code { font-family: ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace; font-size: 0.88em; padding: 0.2em 0.45em; border-radius: 7px; background: rgba(232, 133, 155, 0.14); color: #e8859b; font-weight: 600; border: 1px solid rgba(232, 133, 155, 0.32); }',
    '#write pre { background: #f5f2f1; color: #7b6c71; border: 1px solid rgba(232, 133, 155, 0.18); border-radius: 16px; padding: 1.4em; margin: 2em 0; overflow: auto; box-shadow: 0 18px 50px rgba(68, 58, 62, 0.12); font-family: ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace; font-size: 14.5px; line-height: 1.6; position: relative; }',
    '#write pre::before { content: ""; display: block; width: 64px; height: 10px; margin-bottom: 12px; border-radius: 0; background: radial-gradient(circle at 5px 5px, #d87070 5px, transparent 5.5px), radial-gradient(circle at 23px 5px, #d8c870 5px, transparent 5.5px), radial-gradient(circle at 41px 5px, #70c888 5px, transparent 5.5px); background-size: 64px 10px; background-repeat: no-repeat; }',
    '#write pre code { background: transparent; padding: 0; color: #443a3e; font-weight: normal; border: none; }',
    '#write img { max-width: 100%; height: auto; border-radius: 14px; box-shadow: 0 10px 30px rgba(68, 58, 62, 0.06); display: block; margin: 1.5em auto; }',
    '#write mark { background: linear-gradient(120deg, rgba(232, 133, 155, 0.25), rgba(232, 133, 155, 0.12)); color: inherit; padding: 0.12em 0.26em; border-radius: 9px; border: 1px solid rgba(232, 133, 155, 0.32); box-shadow: 0 10px 26px rgba(232, 133, 155, 0.18); }',
    '#write u { text-decoration: none; background-image: linear-gradient(120deg, rgba(232, 133, 155, 0.5), rgba(232, 133, 155, 0.18)); background-repeat: no-repeat; background-size: 100% 0.16em; background-position: 0 90%; border-radius: 4px; padding-bottom: 2px; }',
    '#write kbd { font-family: ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace; font-size: 0.85em; padding: 0.2em 0.5em; border: 1px solid rgba(68, 58, 62, 0.20); border-bottom-width: 3px; border-radius: 8px; background: #faf8f7; color: #443a3e; margin: 0 0.2em; }',
    '#write strong { font-weight: 800; }',
    '#write em { font-style: italic; }',
    '#write del { text-decoration: line-through; opacity: 0.7; }',
  ].join('\n');
}

/**
 * 安全 CSS（暗色版本）—— bloom-petal-dark 风格，不含 oklch / color-mix
 * 颜色对照表（从 bloom-petal-dark.css 提取）：
 *   --accent: oklch(75% 0.18 350)      → #f0adc8
 *   --accent-rgb: 255, 170, 200
 *   --bg: oklch(28% 0.02 350)          → #484347
 *   --surface: oklch(34% 0.02 350)      → #565152
 *   --surface-2: oklch(40% 0.02 350)     → #645f5c
 *   --text: oklch(98% 0.01 350)         → #fff5f8
 *   --text-rgb: 255, 245, 248
 *   --text-semi: oklch(86% 0.02 350)     → #e4dce0
 *   --ink-rgb: 228, 220, 224
 *   --code-bg: oklch(24% 0.02 350)      → #3c383a
 *   --code-dot-red: oklch(65% 0.12 25)  → #d87070
 *   --code-dot-yellow: oklch(78% 0.12 85) → #d8c870
 *   --code-dot-green: oklch(72% 0.12 145) → #70c888
 */
function getDarkSafeCSS() {
  return [
    '@charset "UTF-8";',
    ':root {',
    '  --space-unit: 8px;',
    '  --space-3xs: calc(var(--space-unit) * 0.25);',
    '  --space-2xs: calc(var(--space-unit) * 0.5);',
    '  --space-xs: calc(var(--space-unit) * 1);',
    '  --space-sm: calc(var(--space-unit) * 1.5);',
    '  --space-md: calc(var(--space-unit) * 2);',
    '  --space-lg: calc(var(--space-unit) * 3);',
    '  --space-xl: calc(var(--space-unit) * 4);',
    '  --space-2xl: calc(var(--space-unit) * 6);',
    '  --space-3xl: calc(var(--space-unit) * 8);',
    '  --accent: #f0adc8;',
    '  --accent-rgb: 255, 170, 200;',
    '  --accent-hover: #f5bcd2;',
    '  --accent-active: #facadc;',
    '  --accent-soft: rgba(255, 170, 200, 0.18);',
    '  --success: #8cc48c;',
    '  --warning: #dcd48c;',
    '  --error: #d47878;',
    '  --info: #8888d4;',
    '  --important: #b088d4;',
    '  --bg: #484347;',
    '  --surface: #565152;',
    '  --surface-2: #645f5c;',
    '  --text: #fff5f8;',
    '  --text-rgb: 255, 245, 248;',
    '  --text-semi: #e4dce0;',
    '  --muted: rgba(255, 245, 248, 0.70);',
    '  --border: rgba(255, 245, 248, 0.12);',
    '  --border-semi: rgba(255, 245, 248, 0.22);',
    '  --shadow: 0 16px 48px rgba(0, 0, 0, 0.25);',
    '  --shadow-lg: 0 30px 80px rgba(0, 0, 0, 0.30);',
    '  --font-sans: "MiSans", "PingFang SC", "Microsoft YaHei", sans-serif;',
    '  --font-mono: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Monaco, Consolas, monospace;',
    '  --selection: rgba(240, 173, 200, 0.35);',
    '  --code-bg: #3c383a;',
    '  --code-text: var(--text-semi);',
    '  --code-ink: var(--text);',
    '  --code-dot-red: #d87070;',
    '  --code-dot-yellow: #d8c870;',
    '  --code-dot-green: #70c888;',
    '  --white-rgb: 255, 255, 255;',
    '  --black-rgb: 0, 0, 0;',
    '}',
    'html, body {',
    '  background: radial-gradient(1200px circle at 18% 8%, rgba(255, 170, 200, 0.06), transparent 36%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 300px), #484347;',
    '  color: #fff5f8;',
    '  font-family: "MiSans", "PingFang SC", "Microsoft YaHei", sans-serif;',
    '  -webkit-font-smoothing: antialiased;',
    '}',
    '::selection { background: rgba(240, 173, 200, 0.35); }',
    '#write {',
    '  max-width: 880px;',
    '  line-height: 1.85;',
    '  letter-spacing: 0.015em;',
    '  font-size: 16px;',
    '  color: #fff5f8;',
    '  margin: 0 auto;',
    '  padding: 48px 32px 64px;',
    '  background: linear-gradient(180deg, rgba(255, 170, 200, 0.18), transparent 460px);',
    '  border: 1px solid rgba(255, 245, 248, 0.12);',
    '  border-radius: 22px;',
    '  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.30);',
    '}',
    '#write p { margin: 1.1em 0; color: #fff5f8; }',
    '#write a { color: #f0adc8; text-decoration: none; border-bottom: 1px solid transparent; }',
    '#write a:hover { color: #f5bcd2; border-bottom-color: rgba(255, 170, 200, 0.55); background: transparent; }',
    '#write h1, #write h2, #write h3, #write h4, #write h5, #write h6 { color: #fff5f8; font-weight: 800; line-height: 1.35; margin: 24px 0 16px; letter-spacing: -0.02em; position: relative; }',
    '#write h1 { font-size: 2.35em; border-bottom: 1px solid rgba(255, 170, 200, 0.32); padding-bottom: 0.35em; text-shadow: 0 10px 36px rgba(0, 0, 0, 0.35); }',
    '#write h2 { font-size: 1.82em; border-bottom: 1px solid rgba(255, 170, 200, 0.24); padding-bottom: 0.3em; color: rgba(228, 220, 224, 0.92); }',
    '#write h3 { font-size: 1.36em; color: rgba(228, 220, 224, 0.88); }',
    '#write h4 { font-size: 1.18em; color: rgba(228, 220, 224, 0.82); }',
    '#write h1::after, #write h2::after { content: ""; position: absolute; left: 0; bottom: -0.52em; width: 78px; height: 3px; background: linear-gradient(90deg, rgba(255, 170, 200, 0.5), transparent); border-radius: 999px; }',
    '#write h3::after { content: ""; position: absolute; left: 0; bottom: -0.4em; width: 48px; height: 2px; background: linear-gradient(90deg, rgba(255, 170, 200, 0.35), transparent); border-radius: 999px; }',
    '#write h4::after { content: ""; position: absolute; left: 0; bottom: -0.35em; width: 36px; height: 2px; background: linear-gradient(90deg, rgba(255, 170, 200, 0.25), transparent); border-radius: 999px; }',
    '#write hr { border: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(255, 245, 248, 0.22), transparent); margin: 48px 0; }',
    '#write blockquote { margin: 24px 0; padding: 24px 32px; background: rgba(255, 170, 200, 0.12); border: 1px solid rgba(255, 170, 200, 0.18); border-left: 4px solid #f0adc8; border-radius: 14px; color: #fff5f8; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25); position: relative; }',
    '#write blockquote p:first-child { margin-top: 0; }',
    '#write blockquote p:last-child { margin-bottom: 0; }',
    '#write ul, #write ol { padding-left: 1.5em; margin: 1em 0; }',
    '#write li { margin: 0.5em 0; }',
    '#write li>ul, #write li>ol { margin: 0.4em 0; }',
    '#write ul li::marker { color: rgba(255, 170, 200, 0.72); font-size: 0.98em; font-weight: 700; }',
    '#write ol li::marker { color: rgba(255, 170, 200, 0.72); font-weight: 800; font-variant-numeric: tabular-nums; }',
    '#write table { border-collapse: separate; border-spacing: 0; width: 100%; margin: 2em 0; border: 1px solid rgba(255, 245, 248, 0.12); border-radius: 14px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }',
    '#write th, #write td { padding: 0.75em 1em; border-bottom: 1px solid rgba(255, 245, 248, 0.12); }',
    '#write th { text-align: left; background: #565152; font-weight: 600; color: #fff5f8; }',
    '#write tr:last-child td { border-bottom: 0; }',
    '#write tr:nth-child(even) td { background: rgba(255, 170, 200, 0.03); }',
    '#write code { font-family: ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace; font-size: 0.88em; padding: 0.2em 0.45em; border-radius: 7px; background: rgba(255, 170, 200, 0.18); color: #f0adc8; font-weight: 600; border: 1px solid rgba(255, 170, 200, 0.30); }',
    '#write pre { background: #3c383a; color: #e4dce0; border: 1px solid rgba(255, 170, 200, 0.15); border-radius: 16px; padding: 1.4em; margin: 2em 0; overflow: auto; box-shadow: 0 18px 50px rgba(0, 0, 0, 0.25); font-family: ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace; font-size: 14.5px; line-height: 1.6; position: relative; }',
    '#write pre::before { content: ""; display: block; width: 64px; height: 10px; margin-bottom: 12px; border-radius: 0; background: radial-gradient(circle at 5px 5px, #d87070 5px, transparent 5.5px), radial-gradient(circle at 23px 5px, #d8c870 5px, transparent 5.5px), radial-gradient(circle at 41px 5px, #70c888 5px, transparent 5.5px); background-size: 64px 10px; background-repeat: no-repeat; }',
    '#write pre code { background: transparent; padding: 0; color: #fff5f8; font-weight: normal; border: none; }',
    '#write img { max-width: 100%; height: auto; border-radius: 14px; box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25); display: block; margin: 1.5em auto; }',
    '#write mark { background: linear-gradient(120deg, rgba(255, 170, 200, 0.30), rgba(255, 170, 200, 0.15)); color: inherit; padding: 0.12em 0.26em; border-radius: 9px; border: 1px solid rgba(255, 170, 200, 0.30); }',
    '#write u { text-decoration: none; background-image: linear-gradient(120deg, rgba(255, 170, 200, 0.5), rgba(255, 170, 200, 0.20)); background-repeat: no-repeat; background-size: 100% 0.16em; background-position: 0 90%; border-radius: 4px; padding-bottom: 2px; }',
    '#write kbd { font-family: ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace; font-size: 0.85em; padding: 0.2em 0.5em; border: 1px solid rgba(255, 245, 248, 0.22); border-bottom-width: 3px; border-radius: 8px; background: #484347; color: #fff5f8; margin: 0 0.2em; }',
    '#write strong { font-weight: 800; }',
    '#write em { font-style: italic; }',
    '#write del { text-decoration: line-through; opacity: 0.7; }',
  ].join('\n');
}

// ===== 图片点击查看 lightbox（渲染窗口与导出 HTML 共用同一份脚本） =====
// 功能：滚轮向上放大/向下缩小、拖拽平移、关闭按钮、画中画（原生 PiP，失败回退浮动小窗）
var IMG_LIGHTBOX_SCRIPT = `
(function(){
  function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }
  var ICON = {
    prev:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    next:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    zoomin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
    zoomout:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
    rotL:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
    rotR:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10"/></svg>',
    reset:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="1" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="1" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="23" y2="12"/></svg>',
    pip:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="19" height="14" rx="2"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="17" x2="12" y2="20"/></svg>',
    close:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
  };
  function init(root){
    if (!root || root.__imgLbBound) return;
    root.__imgLbBound = true;
    root.addEventListener('click', function(e){
      var t = e.target;
      if (!t || t.tagName !== 'IMG') return;
      if (t.closest('.katex, .katex-html, .mermaid, pre, code')) return;
      e.preventDefault();
      openLb(t, root);
    });
  }
  function openLb(img, root){
    if (!root) root = (img.closest('#preview') || img.closest('#write')) || document;
    var ov = document.createElement('div');
    ov.className = 'img-lightbox-overlay';
    ov.innerHTML =
      '<div class="img-lightbox-toolbar">' +
        '<div class="img-lb-group">' +
          '<button class="img-lb-btn" data-act="prev" title="上一张 (←)">' + ICON.prev + '</button>' +
          '<button class="img-lb-btn" data-act="next" title="下一张 (→)">' + ICON.next + '</button>' +
        '</div>' +
        '<span class="img-lb-sep"></span>' +
        '<div class="img-lb-group">' +
          '<button class="img-lb-btn" data-act="in" title="放大">' + ICON.zoomin + '</button>' +
          '<button class="img-lb-btn" data-act="out" title="缩小">' + ICON.zoomout + '</button>' +
          '<button class="img-lb-btn" data-act="rot-left" title="向左旋转 90° ([)">' + ICON.rotL + '</button>' +
          '<button class="img-lb-btn" data-act="rot-right" title="向右旋转 90° (])">' + ICON.rotR + '</button>' +
          '<button class="img-lb-btn" data-act="reset" title="重置缩放与旋转">' + ICON.reset + '</button>' +
        '</div>' +
        '<span class="img-lb-sep"></span>' +
        '<div class="img-lb-group">' +
          '<button class="img-lb-btn" data-act="pip" title="画中画">' + ICON.pip + '</button>' +
        '</div>' +
        '<button class="img-lb-btn img-lb-close" data-act="close" title="关闭查看器 (Esc)">' + ICON.close + '</button>' +
      '</div>' +
      '<div class="img-lb-counter"></div>' +
      '<img class="img-lightbox-img">';
    var im = ov.querySelector('.img-lightbox-img');
    var counter = ov.querySelector('.img-lb-counter');
    var prevBtn = ov.querySelector('[data-act="prev"]');
    var nextBtn = ov.querySelector('[data-act="next"]');
    document.body.appendChild(ov);
    requestAnimationFrame(function(){ ov.classList.add('open'); });
    var scale = 1, tx = 0, ty = 0, rot = 0;
    function apply(){ im.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ') rotate(' + rot + 'deg)'; }
    function reset(){ scale = 1; tx = 0; ty = 0; rot = 0; apply(); }
    function rotate(delta){ rot = (rot + delta) % 360; apply(); }
    var imgs = Array.prototype.slice.call(root.querySelectorAll('img')).filter(function(el){
      return !el.closest('.katex, .katex-html, .mermaid, pre, code');
    });
    var idx = imgs.indexOf(img); if (idx < 0) idx = 0;
    function showImg(n){
      if (!imgs.length) return;
      idx = (n + imgs.length) % imgs.length;
      var el = imgs[idx];
      im.src = el.currentSrc || el.src;
      im.alt = el.alt || '';
      counter.textContent = (idx + 1) + ' / ' + imgs.length;
      prevBtn.classList.toggle('is-disabled', imgs.length <= 1);
      nextBtn.classList.toggle('is-disabled', imgs.length <= 1);
      reset();
    }
    showImg(idx);
    function onWheel(e){
      e.preventDefault();
      var f = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      var ns = clamp(scale * f, 0.2, 12);
      if (ns === scale) return;
      var r = ov.getBoundingClientRect();
      var cx = e.clientX - r.left - r.width / 2;
      var cy = e.clientY - r.top - r.height / 2;
      tx = cx - (cx - tx) * (ns / scale);
      ty = cy - (cy - ty) * (ns / scale);
      scale = ns; apply();
    }
    var dragging = false, sx = 0, sy = 0, stx = 0, sty = 0;
    function onDown(e){
      if (scale <= 1) return;
      dragging = true; sx = e.clientX; sy = e.clientY; stx = tx; sty = ty;
      im.classList.add('grabbing'); e.preventDefault();
    }
    function onMove(e){
      if (!dragging) return;
      tx = stx + (e.clientX - sx); ty = sty + (e.clientY - sy); apply();
    }
    function onUp(){ dragging = false; im.classList.remove('grabbing'); }
    var tDrag = false, tsx = 0, tsy = 0, ttx = 0, tty = 0;
    function onTS(e){
      if (scale <= 1) return;
      var t0 = e.touches[0]; tDrag = true; tsx = t0.clientX; tsy = t0.clientY; ttx = tx; tty = ty;
    }
    function onTM(e){
      if (!tDrag) return;
      var t0 = e.touches[0]; tx = ttx + (t0.clientX - tsx); ty = tty + (t0.clientY - tsy); apply();
    }
    function onTE(){ tDrag = false; }
    ov.addEventListener('wheel', onWheel, { passive: false });
    im.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    im.addEventListener('touchstart', onTS, { passive: true });
    im.addEventListener('touchmove', onTM, { passive: true });
    im.addEventListener('touchend', onTE);
    ov.querySelector('.img-lightbox-toolbar').addEventListener('click', function(e){
      var b = e.target.closest('.img-lb-btn'); if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'in'){ scale = clamp(scale * 1.2, 0.2, 12); apply(); }
      else if (act === 'out'){ scale = clamp(scale / 1.2, 0.2, 12); apply(); }
      else if (act === 'rot-left'){ rotate(-90); }
      else if (act === 'rot-right'){ rotate(90); }
      else if (act === 'reset'){ reset(); }
      else if (act === 'prev'){ showImg(idx - 1); }
      else if (act === 'next'){ showImg(idx + 1); }
      else if (act === 'close'){ closeLb(); }
      else if (act === 'pip'){ doPiP(im.src); }
    });
    ov.addEventListener('click', function(e){ if (e.target === ov) closeLb(); });
    function closeLb(){
      ov.classList.remove('open');
      setTimeout(function(){ ov.remove(); }, 150);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e){
      if (e.key === 'Escape') { closeLb(); }
      else if (e.key === 'ArrowLeft') { showImg(idx - 1); }
      else if (e.key === 'ArrowRight') { showImg(idx + 1); }
      else if (e.key === '[') { rotate(-90); }
      else if (e.key === ']') { rotate(90); }
    }
    document.addEventListener('keydown', onKey);
    function doPiP(url){
      try {
        if (!document.pictureInPictureEnabled) throw 0;
        var tmp = new Image();
        tmp.crossOrigin = 'anonymous';
        tmp.onload = function(){
          try {
            var c = document.createElement('canvas');
            c.width = tmp.naturalWidth || 800; c.height = tmp.naturalHeight || 600;
            c.getContext('2d').drawImage(tmp, 0, 0);
            var v = document.createElement('video');
            v.muted = true; v.srcObject = c.captureStream();
            v.play().then(function(){ return v.requestPictureInPicture(); }).catch(function(){ fallbackMini(url); });
          } catch (err){ fallbackMini(url); }
        };
        tmp.onerror = function(){ fallbackMini(url); };
        tmp.src = url;
      } catch (err){ fallbackMini(url); }
    }
    function fallbackMini(url){
      if (document.querySelector('.img-lb-mini')) return;
      var mini = document.createElement('div');
      mini.className = 'img-lb-mini';
      mini.innerHTML = '<img src="' + url + '" alt=""><button class="img-lb-mini-close" title="关闭">✕</button>';
      document.body.appendChild(mini);
      var mDrag = false, mx = 0, my = 0, mtx = 0, mty = 0;
      mini.addEventListener('mousedown', function(e){
        if (e.target.closest('.img-lb-mini-close')) return;
        mDrag = true; mx = e.clientX; my = e.clientY; mtx = mini.offsetLeft; mty = mini.offsetTop;
      });
      window.addEventListener('mousemove', function(e){
        if (!mDrag) return;
        mini.style.left = (mtx + e.clientX - mx) + 'px';
        mini.style.top = (mty + e.clientY - my) + 'px';
        mini.style.right = 'auto'; mini.style.bottom = 'auto';
      });
      window.addEventListener('mouseup', function(){ mDrag = false; });
      mini.querySelector('.img-lb-mini-close').addEventListener('click', function(e){ e.stopPropagation(); mini.remove(); });
    }
  }
  init(document.getElementById('preview'));
  init(document.getElementById('write'));
})();
`;
(function injectImageLightbox(){
  if (document.getElementById('preview')) {
    var s = document.createElement('script');
    s.textContent = IMG_LIGHTBOX_SCRIPT;
    document.body.appendChild(s);
  }
})();

// ===== 拖拽分隔线调整面板比例 =====
var divider = document.getElementById('divider');
var editorPanel = document.getElementById('editorPanel');
var previewPanel = document.getElementById('previewPanel');
var isDragging = false;

divider.addEventListener('mousedown', function(e) {
  isDragging = true;
  divider.classList.add('active');
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';
  e.preventDefault();
});

document.addEventListener('mousemove', function(e) {
  if (!isDragging) return;
  var container = document.querySelector('.editor-container');
  var rect = container.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var pct = Math.max(20, Math.min(80, (x / rect.width) * 100));
  editorPanel.style.flex = 'none';
  editorPanel.style.width = pct + '%';
  previewPanel.style.flex = 'none';
  previewPanel.style.width = (100 - pct) + '%';
});

document.addEventListener('mouseup', function() {
  if (isDragging) {
    isDragging = false;
    divider.classList.remove('active');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }
});

// ===== 同步滚动（任务5）— 基于标题对齐 =====
var _syncScroll = localStorage.getItem('kattybb-sync-scroll') !== 'false';

function toggleSyncScroll() {
  _syncScroll = !_syncScroll;
  localStorage.setItem('kattybb-sync-scroll', _syncScroll);
  var btn = document.getElementById('syncScrollBtn');
  if (_syncScroll) {
    btn.classList.add('active');
    showToast(t('syncScrollOn'));
  } else {
    btn.classList.remove('active');
    showToast(t('syncScrollOff'));
  }
}

/**
 * 获取编辑器中所有标题的行号和层级
 * 返回 [{line: 行号(0-based), level: 标题层级, text: 标题文本}, ...]
 */
function getEditorHeadings() {
  var lines = editor.value.split('\n');
  var headings = [];
  var inFencedBlock = false;
  var fenceChar = '';
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var fenceMatch = line.match(/^(```+|~~~+)/);
    if (fenceMatch) {
      if (!inFencedBlock) {
        inFencedBlock = true;
        fenceChar = fenceMatch[1];
      } else if (line.trim() === fenceChar) {
        inFencedBlock = false;
        fenceChar = '';
      }
      continue;
    }
    if (inFencedBlock || line.match(/^( {4}|\t)/)) continue;
    var m = line.match(/^(#{1,6})\s+(.+)$/);
    if (m) {
      headings.push({ line: i, level: m[1].length, text: m[2].replace(/[#]+$/, '').trim() });
    }
  }
  return headings;
}

/**
 * 获取预览区中所有标题元素的位置
 * 返回 [{top: 相对于预览面板顶部的位置, level: 标题层级, id: 标题id}, ...]
 */
function getPreviewHeadings() {
  var headingEls = preview.querySelectorAll('h1, h2, h3, h4, h5, h6');
  var panelRect = previewPanel.getBoundingClientRect();
  var result = [];
  headingEls.forEach(function(el) {
    var rect = el.getBoundingClientRect();
    result.push({
      top: rect.top - panelRect.top + previewPanel.scrollTop,
      level: parseInt(el.tagName.charAt(1)),
      id: el.id
    });
  });
  return result;
}

/**
 * 基于标题对齐的同步滚动：编辑器 → 预览
 * 找到编辑器当前可见的标题区间，映射到预览区对应标题的位置
 */
function syncEditorToPreview() {
  var eHeadings = getEditorHeadings();
  var pHeadings = getPreviewHeadings();

  if (eHeadings.length === 0 || pHeadings.length === 0) {
    var maxEditor = editor.scrollHeight - editor.clientHeight;
    var ratio = maxEditor > 0 ? editor.scrollTop / maxEditor : 0;
    var maxPreview = previewPanel.scrollHeight - previewPanel.clientHeight;
    previewPanel.scrollTop = ratio * maxPreview;
    return;
  }

  var currentScroll = editor.scrollTop;
  var currentLine = currentScroll / (parseFloat(getComputedStyle(editor).lineHeight) || 24);

  var eIdx = -1;
  for (var i = eHeadings.length - 1; i >= 0; i--) {
    if (eHeadings[i].line <= currentLine) {
      eIdx = i;
      break;
    }
  }

  if (eIdx < 0) {
    var firstELine = eHeadings[0].line;
    var firstPTop = pHeadings.length > 0 ? pHeadings[0].top : 0;
    var ratio = firstELine > 0 ? currentLine / firstELine : 0;
    previewPanel.scrollTop = ratio * firstPTop;
    return;
  }

  var eStart = eHeadings[eIdx].line;
  var eEnd = (eIdx + 1 < eHeadings.length) ? eHeadings[eIdx + 1].line : editor.value.split('\n').length;

  var pStart = (eIdx < pHeadings.length) ? pHeadings[eIdx].top : (previewPanel.scrollHeight - previewPanel.clientHeight);
  var pEnd = (eIdx + 1 < pHeadings.length) ? pHeadings[eIdx + 1].top : (previewPanel.scrollHeight - previewPanel.clientHeight);

  var eRatio = (eEnd > eStart) ? (currentLine - eStart) / (eEnd - eStart) : 0;
  eRatio = Math.max(0, Math.min(1, eRatio));
  previewPanel.scrollTop = pStart + eRatio * (pEnd - pStart);
}

/**
 * 基于标题对齐的同步滚动：预览 → 编辑器
 */
function syncPreviewToEditor() {
  var eHeadings = getEditorHeadings();
  var pHeadings = getPreviewHeadings();

  if (eHeadings.length === 0 || pHeadings.length === 0) {
    var maxPreview = previewPanel.scrollHeight - previewPanel.clientHeight;
    var ratio = maxPreview > 0 ? previewPanel.scrollTop / maxPreview : 0;
    var maxEditor = editor.scrollHeight - editor.clientHeight;
    editor.scrollTop = ratio * maxEditor;
    return;
  }

  var currentScroll = previewPanel.scrollTop;

  var pIdx = -1;
  for (var i = pHeadings.length - 1; i >= 0; i--) {
    if (pHeadings[i].top <= currentScroll + 10) {
      pIdx = i;
      break;
    }
  }

  if (pIdx < 0) {
    var firstPTop = pHeadings[0].top;
    var firstELine = eHeadings[0].line;
    var ratio = firstPTop > 0 ? currentScroll / firstPTop : 0;
    var lineHeight = parseFloat(getComputedStyle(editor).lineHeight) || 24;
    editor.scrollTop = ratio * firstELine * lineHeight;
    return;
  }

  var pStart = pHeadings[pIdx].top;
  var pEnd = (pIdx + 1 < pHeadings.length) ? pHeadings[pIdx + 1].top : (previewPanel.scrollHeight - previewPanel.clientHeight);

  var eStartLine = (pIdx < eHeadings.length) ? eHeadings[pIdx].line : 0;
  var eEndLine = (pIdx + 1 < eHeadings.length) ? eHeadings[pIdx + 1].line : editor.value.split('\n').length;

  var pRatio = (pEnd > pStart) ? (currentScroll - pStart) / (pEnd - pStart) : 0;
  pRatio = Math.max(0, Math.min(1, pRatio));
  var targetLine = eStartLine + pRatio * (eEndLine - eStartLine);
  var lineHeight = parseFloat(getComputedStyle(editor).lineHeight) || 24;
  editor.scrollTop = targetLine * lineHeight;
}

// 同步滚动监听
var _isSyncing = false;
editor.addEventListener('scroll', function() {
  if (!_syncScroll || _isSyncing || _isPreviewUpdating()) return;
  _isSyncing = true;
  syncEditorToPreview();
  requestAnimationFrame(function() { _isSyncing = false; });
});

previewPanel.addEventListener('scroll', function() {
  if (!_syncScroll || _isSyncing || _isPreviewUpdating()) return;
  _isSyncing = true;
  syncPreviewToEditor();
  requestAnimationFrame(function() { _isSyncing = false; });
});

// ===== 视图模式（任务8）=====
var _viewMode = localStorage.getItem('kattybb-view-mode') || 'split';

function setViewMode(mode) {
  _viewMode = mode;
  localStorage.setItem('kattybb-view-mode', mode);
  applyViewMode();
}

function applyViewMode() {
  var ep = document.getElementById('editorPanel');
  var pp = document.getElementById('previewPanel');
  var dv = document.getElementById('divider');
  var fmtToolbar = document.getElementById('fmtToolbar');

  // 重置 flex/width
  ep.style.flex = '';
  ep.style.width = '';
  pp.style.flex = '';
  pp.style.width = '';
  pp.style.maxWidth = '';
  pp.style.padding = '';

  var noteBtn = document.getElementById('noteToggleBtn');
  var wideBtn = document.getElementById('wideScreenBtn');
  var notePanel = document.getElementById('notePanel');

  if (_viewMode === 'editor') {
    ep.style.display = 'flex';
    pp.style.display = 'none';
    dv.style.display = 'none';
    ep.style.flex = '1';
    if (noteBtn) noteBtn.style.display = 'none';
    if (wideBtn) wideBtn.style.display = 'none';
    if (notePanel) notePanel.style.display = 'none';
    if (fmtToolbar) fmtToolbar.style.display = 'flex';
  } else if (_viewMode === 'preview') {
    ep.style.display = 'none';
    pp.style.display = 'block';
    dv.style.display = 'none';
    pp.style.flex = '1';
    if (noteBtn) noteBtn.style.display = 'inline-flex';
    if (wideBtn) wideBtn.style.display = 'inline-flex';
    if (_isWideScreen) {
      notePanel.style.display = 'none';
      _noteVisible = false;
      pp.style.maxWidth = '100%';
      pp.style.padding = '0';
      var markdownBody = pp.querySelector('.markdown-body');
      if (markdownBody) {
        markdownBody.style.maxWidth = '100%';
        markdownBody.style.margin = '0';
        markdownBody.style.borderRadius = '0';
        markdownBody.style.border = 'none';
        markdownBody.style.boxShadow = 'none';
        markdownBody.style.background = 'transparent';
        markdownBody.style.padding = '20px 40px';
      }
    } else {
      if (_noteVisible && notePanel) notePanel.style.display = 'flex';
      else if (notePanel) notePanel.style.display = 'none';
    }
    if (noteBtn) noteBtn.classList.toggle('active', _noteVisible);
    if (wideBtn) {
      wideBtn.classList.toggle('active', _isWideScreen);
      wideBtn.title = _isWideScreen ? t('wideScreenOff') : t('wideScreenOn');
    }
    if (fmtToolbar) fmtToolbar.style.display = 'none';
  } else {
    ep.style.display = 'flex';
    pp.style.display = 'block';
    dv.style.display = 'block';
    ep.style.flex = '1';
    pp.style.flex = '1';
    if (noteBtn) noteBtn.style.display = 'none';
    if (wideBtn) wideBtn.style.display = 'none';
    if (notePanel) notePanel.style.display = 'none';
    if (fmtToolbar) fmtToolbar.style.display = 'flex';
  }

  // 更新按钮状态
  document.getElementById('viewModeEditor').classList.toggle('active', _viewMode === 'editor');
  document.getElementById('viewModeSplit').classList.toggle('active', _viewMode === 'split');
  document.getElementById('viewModePreview').classList.toggle('active', _viewMode === 'preview');
}

// ===== 宽屏模式 =====

function toggleWideScreen() {
  _isWideScreen = !_isWideScreen;
  localStorage.setItem('kattybb-wide-screen', _isWideScreen);
  
  var previewPanel = document.getElementById('previewPanel');
  var notePanel = document.getElementById('notePanel');
  var wideBtn = document.getElementById('wideScreenBtn');
  var noteBtn = document.getElementById('noteToggleBtn');

  if (wideBtn) {
    wideBtn.classList.toggle('active', _isWideScreen);
    wideBtn.title = _isWideScreen ? t('wideScreenOff') : t('wideScreenOn');
  }

  if (_isWideScreen) {
    previewPanel.style.maxWidth = '100%';
    previewPanel.style.padding = '0';
    var markdownBody = previewPanel.querySelector('.markdown-body');
    if (markdownBody) {
      markdownBody.style.maxWidth = '100%';
      markdownBody.style.margin = '0';
      markdownBody.style.borderRadius = '0';
      markdownBody.style.border = 'none';
      markdownBody.style.boxShadow = 'none';
      markdownBody.style.background = 'transparent';
      markdownBody.style.padding = '20px 40px';
    }
    if (notePanel) {
      notePanel.style.display = 'none';
      _noteVisible = false;
    }
    if (noteBtn) {
      noteBtn.classList.remove('active');
    }
  } else {
    previewPanel.style.maxWidth = '';
    previewPanel.style.padding = '';
    var markdownBody = previewPanel.querySelector('.markdown-body');
    if (markdownBody) {
      markdownBody.style.maxWidth = '';
      markdownBody.style.margin = '';
      markdownBody.style.borderRadius = '';
      markdownBody.style.border = '';
      markdownBody.style.boxShadow = '';
      markdownBody.style.background = '';
      markdownBody.style.padding = '';
    }
  }
}

// ===== Tab 键支持 =====
editor.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    var start = editor.selectionStart;
    var end = editor.selectionEnd;
    editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
    editor.selectionStart = editor.selectionEnd = start + 4;
    updatePreviewNow();
    saveToStorage();
  }
});

// ===== 拖放文件支持 =====
function loadDroppedFile(file) {
  var reader = new FileReader();
  reader.onload = function(event) {
    editor.value = event.target.result;
    fileNameEl.textContent = file.name;
    window._openedFileName = file.name.replace(/\.(md|markdown|txt|text)$/i, '');
    saveToStorage();
    updatePreviewNow();
    updateStatus();
    showToast(t('fileOpened') + ': ' + file.name);
  };
  reader.onerror = function() {
    showToast(t('fileReadError'));
  };
  reader.readAsText(file);
}

// 编辑器面板拖放
editor.addEventListener('dragover', function(e) {
  e.preventDefault();
  e.stopPropagation();
});

editor.addEventListener('dragleave', function(e) {
  e.preventDefault();
  e.stopPropagation();
});

editor.addEventListener('drop', function(e) {
  e.preventDefault();
  e.stopPropagation();

  var file = e.dataTransfer.files[0];
  if (file && (file.name.endsWith('.md') || file.name.endsWith('.markdown') || file.name.endsWith('.txt'))) {
    loadDroppedFile(file);
  } else {
    showToast(t('dropFileHint'));
  }
});

// 预览面板拖放（支持仅预览模式）
var _previewDragCounter = 0;
previewPanel.addEventListener('dragenter', function(e) {
  e.preventDefault();
  e.stopPropagation();
  _previewDragCounter++;
  previewPanel.classList.add('drag-over');
});

previewPanel.addEventListener('dragleave', function(e) {
  e.preventDefault();
  e.stopPropagation();
  _previewDragCounter--;
  if (_previewDragCounter <= 0) {
    _previewDragCounter = 0;
    previewPanel.classList.remove('drag-over');
  }
});

previewPanel.addEventListener('dragover', function(e) {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = 'copy';
});

previewPanel.addEventListener('drop', function(e) {
  e.preventDefault();
  e.stopPropagation();
  _previewDragCounter = 0;
  previewPanel.classList.remove('drag-over');

  var file = e.dataTransfer.files[0];
  if (file && (file.name.endsWith('.md') || file.name.endsWith('.markdown') || file.name.endsWith('.txt'))) {
    loadDroppedFile(file);
  } else {
    showToast(t('dropFileHint'));
  }
});

// ===== 笔记功能 =====
var _noteVisible = true;
var _noteMode = localStorage.getItem('kattybb-note-mode') || 'rich';
var _noteEditor = null;
var _noteTextarea = null;
var _notePanel = null;
var _noteToolbar = null;
var _noteSaveTimer = null;
var _noteFgColor = '#e8859b';
var _noteBgColor = '#fff59d';
var _noteRichHtmlCache = '';
var _noteLinkSavedRange = null;
var _noteEditorScrollTop = 0;

function initNotePanel() {
  _notePanel = document.getElementById('notePanel');
  _noteEditor = document.getElementById('noteEditor');
  _noteTextarea = document.getElementById('noteTextarea');
  _noteToolbar = document.getElementById('noteToolbar');

  var savedContent = localStorage.getItem('kattybb-note-content') || '';
  var savedMode = localStorage.getItem('kattybb-note-mode') || 'rich';

  if (savedMode === 'text') {
    _noteTextarea.value = savedContent;
  } else {
    _noteEditor.innerHTML = savedContent;
  }
  _noteMode = savedMode;
  updateNoteModeUI();

  _noteEditor.addEventListener('input', function() {
    noteAutoSave();
  });
  _noteTextarea.addEventListener('input', function() {
    noteAutoSave();
  });
  
  _noteEditor.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      var sel = window.getSelection();
      if (!sel.rangeCount) return;
      
      var range = sel.getRangeAt(0);
      var container = range.commonAncestorContainer;
      if (container.nodeType === 3) container = container.parentNode;
      
      var taskLine = container.closest('.note-task-line');
      if (taskLine) {
        e.preventDefault();
        
        var textNode = taskLine.lastChild;
        var textContent = textNode ? textNode.textContent : '';
        var trimmedText = textContent.trim();
        
        // 如果任务行文本为空，连续两次回车退出任务列表模式
        if (trimmedText === '') {
          // 移除空任务行，插入普通段落
          var p = document.createElement('p');
          p.innerHTML = '<br>';
          taskLine.parentNode.insertBefore(p, taskLine.nextSibling);
          taskLine.parentNode.removeChild(taskLine);
          
          range.selectNodeContents(p);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          noteAutoSave();
          return;
        }
        
        // 计算光标在文本节点中的偏移，拆分文本
        var offset = 0;
        var startNode = range.startContainer;
        if (startNode.nodeType === 3) {
          offset = range.startOffset;
        } else {
          // 光标可能在 checkbox input 上，offset 是子节点索引
          offset = range.startOffset;
          var childAtOffset = taskLine.childNodes[offset];
          if (childAtOffset && childAtOffset.nodeType === 3) {
            startNode = childAtOffset;
            offset = 0;
          }
        }
        
        var beforeText = '';
        var afterText = '';
        if (startNode && startNode.nodeType === 3 && textNode.contains(startNode)) {
          beforeText = startNode.textContent.substring(0, offset);
          afterText = startNode.textContent.substring(offset);
        } else {
          // 光标不在文本节点中（如选在 checkbox 上），整个文本移到新行
          afterText = textContent;
        }
        
        // 更新当前行的文本
        textNode.textContent = beforeText || ' ';
        
        // 创建新任务行，包含光标后的内容
        var newTaskLine = document.createElement('div');
        newTaskLine.className = 'note-task-line';
        
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'note-task-checkbox';
        checkbox.onchange = function() {
          this.classList.toggle('checked', this.checked);
          noteAutoSave();
        };
        newTaskLine.appendChild(checkbox);
        
        var newText = afterText || ' ';
        var newTextNode = document.createTextNode(newText);
        newTaskLine.appendChild(newTextNode);
        
        taskLine.parentNode.insertBefore(newTaskLine, taskLine.nextSibling);
        
        // 光标定位到新行文本节点开头（checkbox 之后）
        range.setStart(newTextNode, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        
        noteAutoSave();
      }
    }
    
    // 处理 Backspace 删除 checkbox
    if (e.key === 'Backspace') {
      var sel = window.getSelection();
      if (!sel.rangeCount) return;
      
      var range = sel.getRangeAt(0);
      var container = range.commonAncestorContainer;
      if (container.nodeType === 3) container = container.parentNode;
      
      var taskLine = container.closest('.note-task-line');
      if (taskLine) {
        var checkbox = taskLine.querySelector('.note-task-checkbox');
        var textNode = taskLine.lastChild;
        var textContent = textNode ? textNode.textContent : '';
        
        if (range.collapsed) {
          if (textContent.trim() === '') {
            // 文本为空，删除整个任务行
            e.preventDefault();
            var prevLine = taskLine.previousElementSibling;
            taskLine.parentNode.removeChild(taskLine);
            
            if (prevLine) {
              range.selectNodeContents(prevLine.lastChild || prevLine);
              range.collapse(false);
              sel.removeAllRanges();
              sel.addRange(range);
            }
            noteAutoSave();
          } else if (checkbox && range.startOffset === 0 && range.startContainer === textNode) {
            // 光标在文本开头，移除 checkbox 但保留文本
            e.preventDefault();
            checkbox.parentNode.removeChild(checkbox);
            if (textContent.startsWith(' ')) {
              textNode.textContent = textContent.substring(1);
            }
            noteAutoSave();
          }
        } else {
          // 有选中内容，检查是否选中了整个任务行
          var selectedText = range.toString();
          if (selectedText.trim() === textContent.trim()) {
            e.preventDefault();
            taskLine.parentNode.removeChild(taskLine);
            noteAutoSave();
          }
        }
      }
    }
  });

  _noteEditor.setAttribute('data-placeholder', t('notePlaceholder'));

  initNoteToolbar();
  initColorPickers();
  makeNoteDraggable();
  makeNoteResizable();
  
  var savedWidth = localStorage.getItem('kattybb-note-width');
  var savedHeight = localStorage.getItem('kattybb-note-height');
  var savedLeft = localStorage.getItem('kattybb-note-left');
  var savedTop = localStorage.getItem('kattybb-note-top');
  if (savedWidth) _notePanel.style.width = savedWidth + 'px';
  if (savedHeight) _notePanel.style.height = savedHeight + 'px';
  if (savedLeft) {
    _notePanel.style.left = savedLeft + 'px';
  }
  if (savedTop) {
    _notePanel.style.top = savedTop + 'px';
  } else {
    _notePanel.style.top = '60px';
  }
}

function showNoteFgCustomColor() {
  var input = document.getElementById('noteFgColorInput');
  var code = document.getElementById('noteFgColorCode');
  input.style.display = 'block';
  code.style.display = 'block';
  input.click();
}

function showNoteBgCustomColor() {
  var input = document.getElementById('noteBgColorInput');
  var code = document.getElementById('noteBgColorCode');
  input.style.display = 'block';
  code.style.display = 'block';
  input.click();
}

function initNoteToolbar() {
  var headingDropdown = document.getElementById('noteHeadingDropdown');
  var headingToggle = document.getElementById('noteHeadingToggle');
  headingToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    headingDropdown.classList.toggle('open');
  });
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#noteHeadingDropdown')) {
      headingDropdown.classList.remove('open');
    }
  });
}

function initColorPickers() {
  var fgPicker = document.getElementById('noteFgColorPicker');
  var bgPicker = document.getElementById('noteBgColorPicker');

  fgPicker.querySelector('.note-color-toggle').addEventListener('click', function(e) {
    e.stopPropagation();
    fgPicker.classList.toggle('open');
    bgPicker.classList.remove('open');
  });
  bgPicker.querySelector('.note-color-toggle').addEventListener('click', function(e) {
    e.stopPropagation();
    bgPicker.classList.toggle('open');
    fgPicker.classList.remove('open');
  });

  fgPicker.querySelectorAll('.note-color-item').forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      var color = this.dataset.color;
      if (color === 'default') {
        color = _currentThemeMode === 'dark' ? '#ffffff' : '#000000';
      }
      noteSetFgColor(color);
      fgPicker.querySelectorAll('.note-color-item').forEach(function(i) { i.classList.remove('selected'); });
      this.classList.add('selected');
      fgPicker.classList.remove('open');
    });
  });
  bgPicker.querySelectorAll('.note-color-item').forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      var color = this.dataset.color;
      if (color === 'transparent') {
        noteRemoveBgColor();
        bgPicker.querySelectorAll('.note-color-item').forEach(function(i) { i.classList.remove('selected'); });
        this.classList.add('selected');
        bgPicker.classList.remove('open');
        return;
      }
      noteSetBgColor(color);
      bgPicker.querySelectorAll('.note-color-item').forEach(function(i) { i.classList.remove('selected'); });
      this.classList.add('selected');
      bgPicker.classList.remove('open');
    });
  });

  var fgInput = document.getElementById('noteFgColorInput');
  var fgCode = document.getElementById('noteFgColorCode');
  fgInput.addEventListener('input', function() {
    noteSetFgColor(this.value);
    fgCode.value = this.value;
    fgPicker.querySelectorAll('.note-color-item').forEach(function(i) { i.classList.remove('selected'); });
  });
  fgCode.addEventListener('input', function() {
    var color = this.value.trim();
    if (/^#[0-9A-Fa-f]{6}$/.test(color) || /^rgb\([0-9]+,\s*[0-9]+,\s*[0-9]+\)$/.test(color)) {
      noteSetFgColor(color);
      fgInput.value = color;
      fgPicker.querySelectorAll('.note-color-item').forEach(function(i) { i.classList.remove('selected'); });
    }
  });

  var bgInput = document.getElementById('noteBgColorInput');
  var bgCode = document.getElementById('noteBgColorCode');
  bgInput.addEventListener('input', function() {
    noteSetBgColor(this.value);
    bgCode.value = this.value;
    bgPicker.querySelectorAll('.note-color-item').forEach(function(i) { i.classList.remove('selected'); });
  });
  bgCode.addEventListener('input', function() {
    var color = this.value.trim();
    if (/^#[0-9A-Fa-f]{6}$/.test(color) || /^rgb\([0-9]+,\s*[0-9]+,\s*[0-9]+\)$/.test(color)) {
      noteSetBgColor(color);
      bgInput.value = color;
      bgPicker.querySelectorAll('.note-color-item').forEach(function(i) { i.classList.remove('selected'); });
    }
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.note-color-picker')) {
      fgPicker.classList.remove('open');
      bgPicker.classList.remove('open');
      fgInput.style.display = 'none';
      fgCode.style.display = 'none';
      bgInput.style.display = 'none';
      bgCode.style.display = 'none';
    }
  });
}

function noteSetFgColor(color) {
  _noteFgColor = color;
  _noteEditor.focus();
  document.execCommand('foreColor', false, color);
  _noteEditor.focus();
  noteAutoSave();
  var underline = document.getElementById('noteFgColorUnderline');
  if (underline) underline.setAttribute('fill', color);
  var input = document.getElementById('noteFgColorInput');
  if (input) input.value = color;
  var code = document.getElementById('noteFgColorCode');
  if (code) code.value = color;
}

function noteSetBgColor(color) {
  _noteBgColor = color;
  _noteEditor.focus();
  document.execCommand('hiliteColor', false, color);
  _noteEditor.focus();
  noteAutoSave();
  var highlight = document.getElementById('noteBgHighlight');
  if (highlight) highlight.setAttribute('fill', color);
  var input = document.getElementById('noteBgColorInput');
  if (input) input.value = color;
  var code = document.getElementById('noteBgColorCode');
  if (code) code.value = color;
}

function noteRemoveBgColor() {
  _noteEditor.focus();
  document.execCommand('hiliteColor', false, 'transparent');
  _noteEditor.focus();
  noteAutoSave();
}

function noteRemoveFormat() {
  _noteEditor.focus();
  
  var sel = window.getSelection();
  if (sel.rangeCount === 0) return;
  
  var range = sel.getRangeAt(0);
  
  if (range.collapsed) {
    // 未选中内容：保留段落结构和换行，只清除格式
    var children = Array.from(_noteEditor.childNodes);
    var newHtml = '';
    children.forEach(function(node) {
      if (node.nodeType === 3) {
        // 文本节点
        var text = node.textContent;
        if (text.trim()) {
          newHtml += '<div>' + escapeHtml(text) + '</div>';
        }
      } else if (node.nodeType === 1) {
        // 元素节点
        var tagName = node.tagName.toLowerCase();
        if (tagName === 'br') {
          newHtml += '<br>';
        } else if (tagName === 'div' || tagName === 'p') {
          var text = node.textContent || '';
          newHtml += '<div>' + escapeHtml(text) + '</div>';
        } else if (tagName === 'input' && node.className === 'note-task-checkbox') {
          var parentDiv = document.createElement('div');
          parentDiv.className = 'note-task-line';
          parentDiv.innerHTML = '<input type="checkbox" class="note-task-checkbox"> ' + escapeHtml(node.nextSibling ? node.nextSibling.textContent : '');
          newHtml += parentDiv.outerHTML;
        } else {
          var text = node.textContent || '';
          if (text.trim()) {
            newHtml += '<div>' + escapeHtml(text) + '</div>';
          }
        }
      }
    });
    
    _noteEditor.innerHTML = newHtml || '<div><br></div>';
    noteAutoSave();
    
    range = document.createRange();
    range.selectNodeContents(_noteEditor);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    
    return;
  }
  
  // 选中了内容：只清除选中内容的格式，保留换行
  var fragment = range.extractContents();
  var tempDiv = document.createElement('div');
  tempDiv.appendChild(fragment);
  
  var plainText = tempDiv.textContent || '';
  
  var textNode = document.createTextNode(plainText);
  range.insertNode(textNode);
  
  range.selectNodeContents(textNode);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
  
  _noteEditor.focus();
  noteAutoSave();
}

function unwrapNode(node) {
  var parent = node.parentNode;
  if (!parent) return;
  
  while (node.firstChild) {
    parent.insertBefore(node.firstChild, node);
  }
  
  parent.removeChild(node);
}

function makeNoteDraggable() {
  var header = document.getElementById('noteHeader');
  var panel = _notePanel;
  var isDragging = false;
  var startX, startY, startLeft, startTop;

  header.addEventListener('mousedown', function(e) {
    if (e.target.closest('button') || e.target.closest('.note-mode-switch') || e.target.closest('.note-clear-text-btn')) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = panel.offsetLeft;
    startTop = panel.offsetTop;
    e.preventDefault();
    e.stopPropagation();
    panel.style.pointerEvents = 'none';
    if (_noteEditor) {
      _noteEditor.blur();
      window.getSelection().removeAllRanges();
    }
    if (_noteTextarea) _noteTextarea.blur();
    document.body.style.cursor = 'move';
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    var dx = e.clientX - startX;
    var dy = e.clientY - startY;
    panel.style.left = (startLeft + dx) + 'px';
    panel.style.top = (startTop + dy) + 'px';
    panel.style.right = 'auto';
  });

  document.addEventListener('mouseup', function(e) {
    if (isDragging) {
      isDragging = false;
      panel.style.pointerEvents = '';
      document.body.style.cursor = '';
      localStorage.setItem('kattybb-note-left', panel.offsetLeft);
      localStorage.setItem('kattybb-note-top', panel.offsetTop);
    }
  });
}

function makeNoteResizable() {
  var brHandle = document.getElementById('noteResizeBr');
  var blHandle = document.getElementById('noteResizeBl');
  var panel = _notePanel;
  var isResizing = false;
  var startX, startY, startW, startH, startLeft;
  var isBr = false;

  function startResize(e, br) {
    isResizing = true;
    isBr = br;
    startX = e.clientX;
    startY = e.clientY;
    startW = panel.offsetWidth;
    startH = panel.offsetHeight;
    startLeft = panel.offsetLeft;
    e.preventDefault();
    e.stopPropagation();
    panel.style.pointerEvents = 'none';
  }

  brHandle.addEventListener('mousedown', function(e) {
    startResize(e, true);
  });

  blHandle.addEventListener('mousedown', function(e) {
    startResize(e, false);
  });

  document.addEventListener('mousemove', function(e) {
    if (!isResizing) return;
    var dx = e.clientX - startX;
    var dy = e.clientY - startY;
    var newH = Math.max(200, startH + dy);

    if (isBr) {
      var newW = Math.max(240, startW + dx);
      panel.style.width = newW + 'px';
    } else {
      var newW = Math.max(240, startW - dx);
      var newLeft = Math.max(0, startLeft + dx);
      panel.style.width = newW + 'px';
      panel.style.left = newLeft + 'px';
    }
    panel.style.height = newH + 'px';
  });

  document.addEventListener('mouseup', function() {
    if (isResizing) {
      isResizing = false;
      panel.style.pointerEvents = '';
      localStorage.setItem('kattybb-note-width', panel.offsetWidth);
      localStorage.setItem('kattybb-note-height', panel.offsetHeight);
      localStorage.setItem('kattybb-note-left', panel.offsetLeft);
    }
  });
}

function toggleNotePanel() {
  _noteVisible = !_noteVisible;
  _notePanel.style.display = _noteVisible ? 'flex' : 'none';
  var btn = document.getElementById('noteToggleBtn');
  if (btn) {
    btn.classList.toggle('active', _noteVisible);
    btn.title = _noteVisible ? t('noteHide') : t('noteShow');
  }
}

function switchNoteMode(mode) {
  if (mode === _noteMode) return;
  if (mode === 'text') {
    _noteRichHtmlCache = _noteEditor.innerHTML;
    var text = htmlToPlainText(_noteRichHtmlCache);
    _noteTextarea.value = text;
    _noteEditor.style.display = 'none';
    _noteTextarea.style.display = 'block';
    _noteToolbar.style.display = 'none';
  } else {
    var text = _noteTextarea.value;
    var cachedText = htmlToPlainText(_noteRichHtmlCache);
    if (text === cachedText && _noteRichHtmlCache) {
      _noteEditor.innerHTML = _noteRichHtmlCache;
    } else {
      _noteEditor.innerHTML = plainTextToHtml(text);
    }
    _noteRichHtmlCache = '';
    _noteTextarea.style.display = 'none';
    _noteEditor.style.display = 'block';
    _noteToolbar.style.display = 'flex';
  }
  _noteMode = mode;
  localStorage.setItem('kattybb-note-mode', _noteMode);
  updateNoteModeUI();
  noteAutoSave();
}

function updateNoteModeUI() {
  var tabs = document.querySelectorAll('.note-mode-tab');
  tabs.forEach(function(tab) {
    tab.classList.toggle('active', tab.dataset.mode === _noteMode);
  });
  var clearTextBtn = document.getElementById('noteClearTextBtn');
  if (_noteMode === 'rich') {
    _noteToolbar.style.display = 'flex';
    _noteEditor.style.display = 'block';
    _noteTextarea.style.display = 'none';
    if (clearTextBtn) clearTextBtn.style.display = 'none';
  } else {
    _noteToolbar.style.display = 'none';
    _noteEditor.style.display = 'none';
    _noteTextarea.style.display = 'block';
    if (clearTextBtn) clearTextBtn.style.display = 'inline-flex';
  }
}

function htmlToPlainText(html) {
  var tmp = document.createElement('div');
  tmp.innerHTML = html;
  function extractText(node, isLastChild) {
    var result = '';
    for (var i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i];
      var isLast = (i === node.childNodes.length - 1);
      if (child.nodeType === 3) {
        result += child.textContent;
      } else if (child.nodeType === 1) {
        var tag = child.tagName.toLowerCase();
        var childText = extractText(child, isLast);
        if (tag === 'br') {
          result += '\n';
        } else if (['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote', 'pre', 'tr'].indexOf(tag) >= 0) {
          result += childText;
          if (!isLast) result += '\n';
        } else {
          result += childText;
        }
      }
    }
    return result;
  }
  var text = extractText(tmp, true);
  text = text.replace(/\r\n/g, '\n');
  text = text.replace(/\n{3,}/g, '\n\n');
  return text.trim();
}

function plainTextToHtml(text) {
  return text.replace(/\n/g, '<br>');
}

function noteExec(cmd) {
  _noteEditor.focus();
  document.execCommand(cmd, false, null);
  _noteEditor.focus();
  noteAutoSave();
}

function noteToggleTask() {
  _noteEditor.focus();
  var sel = window.getSelection();
  if (!sel.rangeCount) return;
  
  var range = sel.getRangeAt(0);
  var container = range.commonAncestorContainer;
  if (container.nodeType === 3) container = container.parentNode;
  
  // ===== 多行/多块选区检测（必须在单行检测之前，否则跨块选区被误判为单行）=====
  var selectedText = range.toString();
  var clonedFragment = range.cloneContents();
  var blockItems = [];
  for (var ci = 0; ci < clonedFragment.childNodes.length; ci++) {
    var child = clonedFragment.childNodes[ci];
    var txt = child.textContent || '';
    if (child.nodeType === 1) {
      blockItems.push({ text: txt.trim(), type: 'block' });
    } else if (child.nodeType === 3 && txt.trim() !== '') {
      blockItems.push({ text: txt.trim(), type: 'text' });
    }
  }
  
  // 块检测优先（contentEditable 跨块选区 range.toString() 不产生换行符），否则按换行拆分
  var items;
  var isMultiBlock = blockItems.length >= 2;
  if (isMultiBlock) {
    items = blockItems;
  } else {
    items = selectedText.split('\n').filter(function(l) { return l.trim() !== ''; })
      .map(function(l) { return { text: l.trim(), type: 'line' }; });
  }
  
  // 多行/多块 → 每行创建独立 checkbox
  if (items.length > 1) {
    var fragment = document.createDocumentFragment();
    items.forEach(function(item) {
      if (item.text === '') return;
      var checkboxLine = document.createElement('div');
      checkboxLine.className = 'note-task-line';
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.className = 'note-task-checkbox';
      cb.onchange = function() {
        this.classList.toggle('checked', this.checked);
        noteAutoSave();
      };
      checkboxLine.appendChild(cb);
      checkboxLine.appendChild(document.createTextNode(' ' + item.text));
      fragment.appendChild(checkboxLine);
    });
    
    range.deleteContents();
    range.insertNode(fragment);
    
    var lastLine = fragment.querySelector('.note-task-line:last-child');
    if (lastLine) {
      var txtNode = lastLine.lastChild;
      if (txtNode) {
        range.selectNodeContents(txtNode);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
    
    _noteEditor.focus();
    noteAutoSave();
    return;
  }
  
  // ===== 单行选区处理 =====
  
  // 检查是否在 li 元素内
  var li = container.closest('li');
  if (li) {
    var checkbox = li.querySelector('.note-task-checkbox');
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      checkbox.classList.toggle('checked', checkbox.checked);
      noteAutoSave();
      return;
    }
    
    var checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.className = 'note-task-checkbox';
    checkboxInput.onchange = function() {
      this.classList.toggle('checked', this.checked);
      noteAutoSave();
    };
    li.insertBefore(checkboxInput, li.firstChild);
    noteAutoSave();
    return;
  }
  
  // 检查是否已在任务行内
  var taskLine = container.closest('.note-task-line');
  if (taskLine) {
    var checkbox = taskLine.querySelector('.note-task-checkbox');
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      checkbox.classList.toggle('checked', checkbox.checked);
      var textNode = taskLine.lastChild;
      if (textNode) {
        range.selectNodeContents(textNode);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      noteAutoSave();
      return;
    }
  }
  
  // 检查父元素是否已有 checkbox
  var p = container.closest('p');
  var div = container.closest('div');
  var parentBlock = p || div || container;
  
  var existingCheckbox = parentBlock.querySelector('.note-task-checkbox');
  if (existingCheckbox) {
    existingCheckbox.checked = !existingCheckbox.checked;
    existingCheckbox.classList.toggle('checked', existingCheckbox.checked);
    var textNode = parentBlock.lastChild;
    if (textNode && textNode.nodeType === 3) {
      range.selectNodeContents(textNode);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    noteAutoSave();
    return;
  }
  
  // 创建新的任务行
  var checkboxLine = document.createElement('div');
  checkboxLine.className = 'note-task-line';
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'note-task-checkbox';
  checkbox.onchange = function() {
    this.classList.toggle('checked', this.checked);
    noteAutoSave();
  };
  
  var textContent = selectedText.trim() !== '' ? ' ' + selectedText : ' ';
  
  checkboxLine.appendChild(checkbox);
  checkboxLine.appendChild(document.createTextNode(textContent));
  
  range.deleteContents();
  range.insertNode(checkboxLine);
  
  // 光标移到文本末尾，便于编辑
  range.selectNodeContents(checkboxLine.lastChild);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
  
  _noteEditor.focus();
  noteAutoSave();
}

function noteHeading(level) {
  _noteEditor.focus();
  if (level === 0) {
    document.execCommand('formatBlock', false, 'p');
  } else {
    document.execCommand('formatBlock', false, 'h' + level);
  }
  _noteEditor.focus();
  noteAutoSave();
  var headingText = document.getElementById('noteHeadingText');
  if (headingText) {
    headingText.dataset.level = level;
    if (level === 1) headingText.textContent = t('noteHeadingH1');
    else if (level === 2) headingText.textContent = t('noteHeadingH2');
    else if (level === 3) headingText.textContent = t('noteHeadingH3');
    else headingText.textContent = t('noteHeadingNormal');
  }
  document.getElementById('noteHeadingDropdown').classList.remove('open');
}

function noteLink() {
  var modal = document.getElementById('noteLinkModal');
  var titleInput = document.getElementById('noteLinkTitle');
  var urlInput = document.getElementById('noteLinkUrl');
  var sel = window.getSelection();
  var selectedText = '';
  // 保存滚动位置
  _noteEditorScrollTop = _noteEditor.scrollTop;
  if (sel.rangeCount > 0) {
    _noteLinkSavedRange = sel.getRangeAt(0).cloneRange();
    selectedText = _noteLinkSavedRange.toString();
  } else {
    _noteLinkSavedRange = null;
  }
  titleInput.value = selectedText;
  urlInput.value = 'https://';
  modal.style.display = 'flex';
  titleInput.focus();
}

function closeNoteLinkModal() {
  document.getElementById('noteLinkModal').style.display = 'none';
}

function insertNoteLink() {
  var title = document.getElementById('noteLinkTitle').value.trim();
  var url = document.getElementById('noteLinkUrl').value.trim();
  closeNoteLinkModal();
  if (!url) return;
  
  _noteEditor.focus();
  
  if (_noteLinkSavedRange) {
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(_noteLinkSavedRange);
    
    // 直接创建链接元素
    var link = document.createElement('a');
    link.href = url;
    link.textContent = title || url;
    link.target = '_blank';
    
    // 删除选区内容并插入链接
    _noteLinkSavedRange.deleteContents();
    _noteLinkSavedRange.insertNode(link);
    
    // 将光标移到链接后面
    var newRange = document.createRange();
    newRange.setStartAfter(link);
    newRange.collapse(true);
    sel.removeAllRanges();
    sel.addRange(newRange);
  } else {
    // 没有保存选区时，使用 execCommand 创建链接
    document.execCommand('createLink', false, url);
    var links = _noteEditor.querySelectorAll('a');
    if (links.length > 0) {
      var lastLink = links[links.length - 1];
      lastLink.textContent = title || url;
      lastLink.target = '_blank';
    }
  }
  
  // 恢复滚动位置
  _noteEditor.scrollTop = _noteEditorScrollTop;
  
  _noteLinkSavedRange = null;
  noteAutoSave();
}

function noteAutoSave() {
  if (_noteSaveTimer) {
    clearTimeout(_noteSaveTimer);
  }
  _noteSaveTimer = setTimeout(function() {
    var content;
    if (_noteMode === 'rich') {
      content = _noteEditor.innerHTML;
    } else {
      content = _noteTextarea.value;
    }
    localStorage.setItem('kattybb-note-content', content);
  }, 300);
}

function noteClear() {
  document.getElementById('noteClearModal').style.display = 'flex';
}

function closeNoteClearModal() {
  document.getElementById('noteClearModal').style.display = 'none';
}

function confirmNoteClear() {
  closeNoteClearModal();
  if (_noteMode === 'rich') {
    _noteEditor.innerHTML = '';
  } else {
    _noteTextarea.value = '';
  }
  localStorage.removeItem('kattybb-note-content');
  showToast(t('noteCleared'));
}

// ===== Ctrl+S 保存提示 =====
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    saveToStorage();
    showToast(t('autoSaved'));
  }
});

// 初始化状态
applyTheme();
updateThemeUI();
updateStatus();
// 同步滚动按钮初始状态（任务5）
if (!_syncScroll) {
  document.getElementById('syncScrollBtn').classList.remove('active');
}
// 应用视图模式（任务8）
applyViewMode();
initNotePanel();
updateThemeUI(); // 再次调用以更新笔记面板的夜间模式样式
statusLeft.textContent = t('statusAutoSave');
applyLang();

// ===== 格式工具栏（编辑/格式化功能区）=====
function fmtSetText(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text;
}

// 更新格式工具栏语言
function applyFmtLang() {
  var tips = {
    'fmtCutTip': 'fmtCut', 'fmtCopyTip': 'fmtCopy', 'fmtCopyBlockTip': 'fmtCopyBlock',
    'fmtDeleteTip': 'fmtDelete', 'fmtCopyPasteTip': 'fmtCopyPasteLabel',
    'fmtBoldTip': 'fmtBold', 'fmtItalicTip': 'fmtItalic', 'fmtUnderlineTip': 'fmtUnderline',
    'fmtStrikethroughTip': 'fmtStrikethrough', 'fmtHighlightTip': 'fmtHighlight',
    'fmtCodeTip': 'fmtCode', 'fmtKbdTip': 'fmtKbd',
    'fmtLinkTip': 'fmtLink', 'fmtQuoteTip': 'fmtQuote', 'fmtOlTip': 'fmtOL',
    'fmtUlTip': 'fmtUL', 'fmtTaskTip': 'fmtTask', 'fmtParagraphTip': 'fmtParagraph',
    'fmtInsertTip': 'fmtInsert'
  };
  Object.keys(tips).forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.setAttribute('data-tip', t(tips[id]));
  });
  fmtSetText('fmtCopyPasteLabel', t('fmtCopyPasteLabel'));
  fmtSetText('fmtParagraphLabel', t('fmtParagraph'));
  fmtSetText('fmtInsertLabel', t('fmtInsert'));
  fmtSetText('fmtCopyMdText', t('fmtCopyMd'));
  fmtSetText('fmtCopyHtmlText', t('fmtCopyHtml'));
  fmtSetText('fmtCopySimpText', t('fmtCopySimp'));
  fmtSetText('fmtCopyPlainText', t('fmtCopyPlain'));
  fmtSetText('fmtPastePlainText', t('fmtPastePlain'));
  fmtSetText('fmtH1Text', t('fmtH1'));
  fmtSetText('fmtH2Text', t('fmtH2'));
  fmtSetText('fmtH3Text', t('fmtH3'));
  fmtSetText('fmtH4Text', t('fmtH4'));
  fmtSetText('fmtH5Text', t('fmtH5'));
  fmtSetText('fmtH6Text', t('fmtH6'));
  fmtSetText('fmtNormalText', t('fmtNormal'));
  fmtSetText('fmtInsImgText', t('fmtInsImg'));
  fmtSetText('fmtInsFootnoteText', t('fmtInsFootnote'));
  fmtSetText('fmtInsLinkRefText', t('fmtInsLinkRef'));
  fmtSetText('fmtInsHrText', t('fmtInsHr'));
  fmtSetText('fmtInsTableText', t('fmtInsTable'));
  fmtSetText('fmtInsCodeText', t('fmtInsCode'));
  fmtSetText('fmtInsFormulaText', t('fmtInsFormula'));
  fmtSetText('fmtInsGithubAlertText', t('fmtInsGithubAlert'));
  fmtSetText('fmtAlertNoteText', t('fmtAlertNote'));
  fmtSetText('fmtAlertTipText', t('fmtAlertTip'));
  fmtSetText('fmtAlertImportantText', t('fmtAlertImportant'));
  fmtSetText('fmtAlertWarningText', t('fmtAlertWarning'));
  fmtSetText('fmtAlertCautionText', t('fmtAlertCaution'));
  fmtSetText('fmtInsTocText', t('fmtInsToc'));
  fmtSetText('fmtInsYamlText', t('fmtInsYaml'));
  fmtSetText('fmtInsAboveText', t('fmtInsAbove'));
  fmtSetText('fmtInsBelowText', t('fmtInsBelow'));
}

// ===== 选区与行操作辅助函数 =====
function fmtGetSelection() {
  return { start: editor.selectionStart, end: editor.selectionEnd, text: editor.value.substring(editor.selectionStart, editor.selectionEnd) };
}
function fmtGetLineBounds(pos) {
  var value = editor.value;
  var p = (pos === undefined) ? editor.selectionStart : pos;
  var lineStart = value.lastIndexOf('\n', p - 1) + 1;
  var lineEnd = value.indexOf('\n', p);
  if (lineEnd === -1) lineEnd = value.length;
  return { start: lineStart, end: lineEnd };
}
function fmtGetSelectionLineBounds() {
  var value = editor.value;
  var start = editor.selectionStart;
  var end = editor.selectionEnd;
  var lineStart = value.lastIndexOf('\n', start - 1) + 1;
  var lineEnd = value.indexOf('\n', end);
  if (lineEnd === -1) lineEnd = value.length;
  return { start: lineStart, end: lineEnd };
}
function fmtAfterEdit() {
  editor.focus();
  updatePreviewNow();
  saveToStorage();
  updateStatus();
  updateFmtActiveStates();
}
// 在光标处插入文本（可指定插入后选区范围）
function fmtInsertAtCursor(text, selFrom, selTo) {
  var start = editor.selectionStart;
  var end = editor.selectionEnd;
  editor.value = editor.value.substring(0, start) + text + editor.value.substring(end);
  if (selFrom !== undefined && selTo !== undefined) {
    editor.selectionStart = start + selFrom;
    editor.selectionEnd = start + selTo;
  } else {
    editor.selectionStart = editor.selectionEnd = start + text.length;
  }
  fmtAfterEdit();
}
// 包裹选区
function fmtWrapSelection(prefix, suffix, placeholder) {
  var sel = fmtGetSelection();
  var text = sel.text.length ? sel.text : (placeholder || '');
  var insertion = prefix + text + suffix;
  editor.value = editor.value.substring(0, sel.start) + insertion + editor.value.substring(sel.end);
  if (sel.text.length) {
    editor.selectionStart = sel.start + prefix.length;
    editor.selectionEnd = sel.start + prefix.length + text.length;
  } else {
    editor.selectionStart = editor.selectionEnd = sel.start + prefix.length + text.length;
  }
  fmtAfterEdit();
}
// 切换行内包裹（已包裹则移除）
function fmtToggleWrap(prefix, suffix, placeholder) {
  suffix = suffix || prefix;
  var sel = fmtGetSelection();
  var value = editor.value;
  var before = value.substring(sel.start - prefix.length, sel.start);
  var after = value.substring(sel.end, sel.end + suffix.length);
  if (sel.start >= prefix.length && before === prefix && sel.end + suffix.length <= value.length && after === suffix) {
    editor.value = value.substring(0, sel.start - prefix.length) + value.substring(sel.start, sel.end) + value.substring(sel.end + suffix.length);
    editor.selectionStart = sel.start - prefix.length;
    editor.selectionEnd = sel.end - prefix.length;
    fmtAfterEdit();
  } else {
    fmtWrapSelection(prefix, suffix, placeholder);
  }
}
// 切换每行的前缀（已全部带前缀则移除，否则添加）
function fmtToggleLinePrefix(prefix, checkRegex) {
  var bounds = fmtGetSelectionLineBounds();
  var block = editor.value.substring(bounds.start, bounds.end);
  var lines = block.split('\n');
  var allHave = lines.every(function(line) { return checkRegex ? checkRegex.test(line) : line.indexOf(prefix) === 0; });
  var newLines = lines.map(function(line) {
    if (allHave) {
      return checkRegex ? line.replace(checkRegex, '') : line.substring(prefix.length);
    }
    return prefix + line;
  });
  var newBlock = newLines.join('\n');
  editor.value = editor.value.substring(0, bounds.start) + newBlock + editor.value.substring(bounds.end);
  editor.selectionStart = bounds.start;
  editor.selectionEnd = bounds.start + newBlock.length;
  fmtAfterEdit();
}

// ===== 剪贴板辅助 =====
function fmtCopyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      showToast(t('fmtToastCopied'));
    }).catch(function() { fmtCopyFallback(text); });
  } else {
    fmtCopyFallback(text);
  }
}
function fmtCopyFallback(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); showToast(t('fmtToastCopied')); }
  catch (e) { showToast(t('fmtToastCopyFail')); }
  document.body.removeChild(ta);
}

// ===== 下拉菜单逻辑 =====
function toggleFmtMenu(menuId, trigger) {
  var menu = document.getElementById(menuId);
  var isOpen = menu.classList.contains('open');
  closeAllFmtMenus();
  if (!isOpen) {
    menu.classList.add('open');
    trigger.classList.add('open');
    if (menuId === 'paragraphMenu') updateParagraphCheckmarks();
  }
}
function closeAllFmtMenus() {
  document.querySelectorAll('.fmt-menu.open').forEach(function(m) { m.classList.remove('open'); });
  document.querySelectorAll('.fmt-trigger.open').forEach(function(t) { t.classList.remove('open'); });
}
document.addEventListener('click', function(e) {
  if (!e.target.closest('.fmt-dropdown-wrap')) closeAllFmtMenus();
});

// ===== 分组1：剪贴复制组 =====
function fmtCut() {
  var sel = fmtGetSelection();
  if (!sel.text) { showToast(t('fmtToastNoSelection')); return; }
  fmtCopyText(sel.text);
  editor.value = editor.value.substring(0, sel.start) + editor.value.substring(sel.end);
  editor.selectionStart = editor.selectionEnd = sel.start;
  fmtAfterEdit();
  closeAllFmtMenus();
}
function fmtCopy() {
  var sel = fmtGetSelection();
  if (!sel.text) { showToast(t('fmtToastNoSelection')); return; }
  fmtCopyText(sel.text);
  closeAllFmtMenus();
}
function fmtCopyBlock() {
  var bounds = fmtGetSelectionLineBounds();
  var block = editor.value.substring(bounds.start, bounds.end);
  fmtCopyText(block);
  closeAllFmtMenus();
}
function fmtDelete() {
  var sel = fmtGetSelection();
  if (sel.text) {
    editor.value = editor.value.substring(0, sel.start) + editor.value.substring(sel.end);
    editor.selectionStart = editor.selectionEnd = sel.start;
  } else {
    var bounds = fmtGetSelectionLineBounds();
    var value = editor.value;
    var end = bounds.end;
    if (end < value.length && value.charAt(end) === '\n') end++;
    editor.value = value.substring(0, bounds.start) + value.substring(end);
    editor.selectionStart = editor.selectionEnd = bounds.start;
  }
  fmtAfterEdit();
  closeAllFmtMenus();
}
function fmtCopyAsMarkdown() {
  var sel = fmtGetSelection();
  fmtCopyText(sel.text || editor.value);
  closeAllFmtMenus();
}
function fmtCopyAsHTML() {
  var sel = fmtGetSelection();
  var md = sel.text || editor.value;
  var html = marked.parse(preprocessMarkdown(md), { renderer: renderer });
  fmtCopyText(html);
  closeAllFmtMenus();
}
function fmtCopySimplified() {
  var sel = fmtGetSelection();
  var md = sel.text || editor.value;
  var simplified = md
    .replace(/```[\w]*\n([\s\S]*?)```/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s+/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/^-\s\[[ xX]\]\s/gm, '');
  fmtCopyText(simplified);
  closeAllFmtMenus();
}
function fmtCopyMarkdown() {
  var sel = fmtGetSelection();
  var text = sel.text || editor.value;
  fmtCopyText(text);
  document.getElementById('fmtContextMenu').classList.remove('show');
}
function fmtCopyHtml() {
  var sel = fmtGetSelection();
  var md = sel.text || editor.value;
  var html = marked.parse(preprocessMarkdown(md), { renderer: renderer });
  fmtCopyText(html);
  document.getElementById('fmtContextMenu').classList.remove('show');
}
function fmtCopyPlainText() {
  var sel = fmtGetSelection();
  var md = sel.text || editor.value;
  var html = marked.parse(preprocessMarkdown(md), { renderer: renderer });
  var div = document.createElement('div');
  div.innerHTML = html;
  fmtCopyText((div.textContent || div.innerText || '').replace(/\n{3,}/g, '\n\n'));
  document.getElementById('fmtContextMenu').classList.remove('show');
}
function fmtPastePlainText() {
  if (navigator.clipboard && navigator.clipboard.readText) {
    navigator.clipboard.readText().then(function(text) {
      fmtInsertAtCursor(text);
      document.getElementById('fmtContextMenu').classList.remove('show');
    }).catch(function() { showToast(t('fmtToastPasteFail')); });
  } else {
    showToast(t('fmtToastPasteFail'));
  }
}

function fmtInsertTOC() {
  fmtInsertAtCursor('\n[TOC]\n');
  document.getElementById('fmtContextMenu').classList.remove('show');
}

// ===== 分组2：基础文本格式组 =====
function fmtBold() { fmtToggleWrap('**', '**', '粗体'); closeAllFmtMenus(); }
function fmtItalic() { fmtToggleWrap('*', '*', '斜体'); closeAllFmtMenus(); }
function fmtUnderline() { fmtToggleWrap('<u>', '</u>', '下划线'); closeAllFmtMenus(); }
function fmtStrikethrough() { fmtToggleWrap('~~', '~~', '删除线'); closeAllFmtMenus(); }
function fmtHighlight() { fmtToggleWrap('==', '==', '高亮'); closeAllFmtMenus(); }
function fmtKbd() { fmtToggleWrap('<kbd>', '</kbd>', '键盘'); closeAllFmtMenus(); }
function fmtInlineCode() { fmtToggleWrap('`', '`', 'code'); closeAllFmtMenus(); }
function fmtQuote() { fmtToggleLinePrefix('> ', /^>\s/); closeAllFmtMenus(); }
function fmtUnorderedList() { fmtToggleLinePrefix('- ', /^[-*+]\s/); closeAllFmtMenus(); }
function fmtOrderedList() {
  var bounds = fmtGetSelectionLineBounds();
  var block = editor.value.substring(bounds.start, bounds.end);
  var lines = block.split('\n');
  var allOrdered = lines.every(function(line) { return /^\d+\.\s/.test(line); });
  var newLines;
  if (allOrdered) {
    newLines = lines.map(function(line) { return line.replace(/^\d+\.\s/, ''); });
  } else {
    newLines = lines.map(function(line, i) { return (i + 1) + '. ' + line; });
  }
  var newBlock = newLines.join('\n');
  editor.value = editor.value.substring(0, bounds.start) + newBlock + editor.value.substring(bounds.end);
  editor.selectionStart = bounds.start;
  editor.selectionEnd = bounds.start + newBlock.length;
  fmtAfterEdit();
  closeAllFmtMenus();
}
function fmtTaskList() { fmtToggleLinePrefix('- [ ] ', /^-\s\[[ xX]\]\s/); closeAllFmtMenus(); }

// ===== 分组3：段落样式组 =====
function fmtSetHeading(level) {
  var bounds = fmtGetSelectionLineBounds();
  var line = editor.value.substring(bounds.start, bounds.end);
  var stripped = line.replace(/^#{1,6}\s+/, '');
  var newLine = (level === 0) ? stripped : '#'.repeat(level) + ' ' + stripped;
  editor.value = editor.value.substring(0, bounds.start) + newLine + editor.value.substring(bounds.end);
  editor.selectionStart = bounds.start;
  editor.selectionEnd = bounds.start + newLine.length;
  fmtAfterEdit();
  closeAllFmtMenus();
}
function fmtSetParagraph() { fmtSetHeading(0); }
function updateParagraphCheckmarks() {
  var bounds = fmtGetLineBounds();
  var line = editor.value.substring(bounds.start, bounds.end);
  var m = line.match(/^(#{1,6})\s/);
  var level = m ? m[1].length : 0;
  var items = document.querySelectorAll('#paragraphMenu .fmt-item');
  items.forEach(function(item, i) {
    var isMatch = (i < 6 && (i + 1) === level) || (i === 6 && level === 0);
    item.classList.toggle('checked', isMatch);
  });
}

// ===== 分组4：插入元素组 =====
function fmtInsertImage() {
  var url = window.prompt(t('fmtImgInputUrl'), 'https://');
  if (url === null) { closeAllFmtMenus(); return; }
  var title = window.prompt(t('fmtImgInputTitle'), '') || '';
  var sel = fmtGetSelection();
  var alt = sel.text || title || 'image';
  var insertion = '![' + alt + '](' + url + (title ? ' "' + title + '"' : '') + ')';
  fmtInsertAtCursor(insertion);
  closeAllFmtMenus();
}
function fmtInsertFootnote() {
  closeAllFmtMenus();
  openFmtModal('插入脚注', [
    { name: 'content', label: '脚注内容', value: '', placeholder: '输入脚注内容' }
  ], function(data) {
    var content = data.content || '';
    if (!content) return;
    
    var sel = fmtGetSelection();
    var value = editor.value;
    var refs = value.match(/\[\^(\d+)\]/g) || [];
    var max = 0;
    refs.forEach(function(r) {
      var n = parseInt(r.match(/\d+/)[0]);
      if (n > max) max = n;
    });
    var num = max + 1;
    var marker = '[^' + num + ']';
    
    editor.value = value.substring(0, sel.start) + marker + value.substring(sel.end);
    
    var endPos = editor.value.length;
    if (!editor.value.endsWith('\n')) {
      editor.value += '\n';
      endPos++;
    }
    if (!editor.value.substring(endPos - 2, endPos).includes('\n\n')) {
      editor.value += '\n';
      endPos++;
    }
    editor.value += marker + ': ' + content + '\n';
    
    editor.selectionStart = editor.selectionEnd = sel.start + marker.length;
    fmtAfterEdit();
  });
}
function fmtInsertLinkRef() {
  var sel = fmtGetSelection();
  var value = editor.value;
  var refs = value.match(/\[(\d+)\]:/g) || [];
  var max = 0;
  refs.forEach(function(r) { var n = parseInt(r.match(/\d+/)[0]); if (n > max) max = n; });
  var num = max + 1;
  var text = sel.text || 'link';
  var marker = '[' + text + '][' + num + ']';
  editor.value = value.substring(0, sel.start) + marker + value.substring(sel.end);
  editor.value += '\n\n[' + num + ']: https://\n';
  editor.selectionStart = editor.selectionEnd = sel.start + marker.length;
  fmtAfterEdit();
  closeAllFmtMenus();
}
function fmtInsertHr() { fmtInsertAtCursor('\n\n---\n\n'); closeAllFmtMenus(); }
function fmtInsertTable() {
  fmtInsertAtCursor('\n| 列1 | 列2 | 列3 |\n| --- | --- | --- |\n| 内容 | 内容 | 内容 |\n\n');
  closeAllFmtMenus();
}
function fmtInsertCodeBlock() {
  var sel = fmtGetSelection();
  var code = sel.text || '';
  var insertion = '\n```\n' + code + '\n```\n';
  editor.value = editor.value.substring(0, sel.start) + insertion + editor.value.substring(sel.end);
  if (code) {
    editor.selectionStart = sel.start + 5;
    editor.selectionEnd = sel.start + 5 + code.length;
  } else {
    var pos = sel.start + 5;
    editor.selectionStart = editor.selectionEnd = pos;
  }
  fmtAfterEdit();
  closeAllFmtMenus();
}
function fmtInsertFormula() { fmtInsertAtCursor('\n$$\n\n$$\n', 4, 4); closeAllFmtMenus(); }
function fmtInsertToc() { fmtInsertAtCursor('\n[TOC]\n\n'); closeAllFmtMenus(); }
function fmtInsertGithubAlert() {
  fmtInsertAtCursor('\n> [!NOTE]\n> \n', 11, 11);
  closeAllFmtMenus();
  hideContextMenu();
}
function fmtInsertGithubAlertType(type) {
  fmtInsertAtCursor('\n> [!' + type + ']\n> \n', 11, 11);
  closeAllFmtMenus();
  hideContextMenu();
}
function fmtInsertYaml() {
  var value = editor.value;
  if (/^---\n[\s\S]*?\n---/.test(value)) { closeAllFmtMenus(); return; }
  var yaml = '---\ntitle: \ndate: \ntags: []\n---\n\n';
  editor.value = yaml + value;
  editor.selectionStart = editor.selectionEnd = yaml.indexOf('title: ') + 7;
  fmtAfterEdit();
  closeAllFmtMenus();
}
function fmtInsertParagraphAbove() {
  var bounds = fmtGetLineBounds();
  editor.value = editor.value.substring(0, bounds.start) + '\n' + editor.value.substring(bounds.start);
  editor.selectionStart = editor.selectionEnd = bounds.start;
  fmtAfterEdit();
  closeAllFmtMenus();
}
function fmtInsertParagraphBelow() {
  var bounds = fmtGetLineBounds();
  var value = editor.value;
  var pos = bounds.end;
  if (pos < value.length) pos++;
  editor.value = value.substring(0, pos) + '\n' + value.substring(pos);
  editor.selectionStart = editor.selectionEnd = pos;
  fmtAfterEdit();
  closeAllFmtMenus();
}

// ===== 按钮激活状态跟踪 =====
function updateFmtActiveStates() {
  var value = editor.value;
  var start = editor.selectionStart, end = editor.selectionEnd;
  var hasSel = start !== end;
  function setBtn(id, on) { var el = document.getElementById(id); if (el) el.classList.toggle('active', on); }
  if (!hasSel) {
    setBtn('fmtBoldTip', false); setBtn('fmtItalicTip', false); setBtn('fmtCodeTip', false);
    return;
  }
  var before2 = value.substring(Math.max(0, start - 2), start);
  var after2 = value.substring(end, Math.min(value.length, end + 2));
  setBtn('fmtBoldTip', before2.slice(-2) === '**' && after2.slice(0, 2) === '**');
  var before1 = value.substring(Math.max(0, start - 1), start);
  var after1 = value.substring(end, Math.min(value.length, end + 1));
  setBtn('fmtItalicTip', before1 === '*' && after1 === '*' && before2.slice(-2) !== '**');
  setBtn('fmtCodeTip', before1 === '`' && after1 === '`');
}

function fmtInsertLink() {
  fmtLink();
}

// ===== 插入弹窗表单 =====
var _fmtModalCallback = null;

function openFmtModal(title, fields, callback) {
  var overlay = document.getElementById('fmtModalOverlay');
  var titleEl = document.getElementById('fmtModalTitle');
  var bodyEl = document.getElementById('fmtModalBody');
  var cancelBtn = document.getElementById('fmtModalCancel');
  var okBtn = document.getElementById('fmtModalOk');
  
  titleEl.textContent = title;
  cancelBtn.textContent = t('fmtLinkInputCancel');
  okBtn.textContent = t('fmtLinkInputOk');
  
  var html = '';
  fields.forEach(function(f) {
    html += '<div class="fmt-form-group">' +
      '<label class="fmt-form-label">' + f.label + '</label>' +
      '<input type="text" class="fmt-form-input" id="fmtModalInput_' + f.name + '" value="' + (f.value || '').replace(/"/g, '&quot;') + '" placeholder="' + (f.placeholder || '') + '">' +
      '</div>';
  });
  bodyEl.innerHTML = html;
  
  _fmtModalCallback = callback;
  overlay.classList.add('show');
  
  setTimeout(function() {
    var firstInput = bodyEl.querySelector('.fmt-form-input');
    if (firstInput) firstInput.focus();
  }, 50);
}

function closeFmtModal() {
  document.getElementById('fmtModalOverlay').classList.remove('show');
  _fmtModalCallback = null;
}

function submitFmtModal() {
  if (!_fmtModalCallback) return;
  var bodyEl = document.getElementById('fmtModalBody');
  var inputs = bodyEl.querySelectorAll('.fmt-form-input');
  var data = {};
  inputs.forEach(function(input) {
    var name = input.id.replace('fmtModalInput_', '');
    data[name] = input.value.trim();
  });
  _fmtModalCallback(data);
  closeFmtModal();
}

// 替换链接插入为弹窗
function fmtLink() {
  closeAllFmtMenus();
  var sel = fmtGetSelection();
  openFmtModal(t('fmtLinkInputTitle'), [
    { name: 'text', label: t('fmtLinkInputLabelTitle'), value: sel.text, placeholder: t('fmtLinkInputLabelTitle') },
    { name: 'url', label: t('fmtLinkInputLabelUrl'), value: '', placeholder: 'https://' }
  ], function(data) {
    var text = data.text || 'link';
    var url = data.url;
    if (!url) return;
    var insertion = '[' + text + '](' + url + ')';
    editor.value = editor.value.substring(0, sel.start) + insertion + editor.value.substring(sel.end);
    editor.selectionStart = sel.start;
    editor.selectionEnd = sel.start + insertion.length;
    fmtAfterEdit();
  });
}

// 替换图像插入为弹窗
function fmtInsertImage() {
  closeAllFmtMenus();
  var sel = fmtGetSelection();
  openFmtModal(t('fmtLinkInputTitle'), [
    { name: 'alt', label: t('fmtImgInputTitle'), value: sel.text, placeholder: t('fmtImgInputTitle') },
    { name: 'url', label: t('fmtImgInputUrl'), value: '', placeholder: 'https://' }
  ], function(data) {
    var alt = data.alt || 'image';
    var url = data.url;
    if (!url) return;
    var insertion = '![' + alt + '](' + url + ')';
    fmtInsertAtCursor(insertion);
  });
}

// ===== 右键菜单 =====
function showContextMenu(e) {
  e.preventDefault();
  var menu = document.getElementById('fmtContextMenu');
  menu.style.left = e.clientX + 'px';
  menu.style.top = e.clientY + 'px';
  menu.classList.add('show');
}

function hideContextMenu() {
  document.getElementById('fmtContextMenu').classList.remove('show');
}

document.addEventListener('click', hideContextMenu);
document.addEventListener('contextmenu', function(e) {
  if (!e.target.closest('#editor') && !e.target.closest('.fmt-toolbar')) {
    hideContextMenu();
  }
});
editor.addEventListener('contextmenu', showContextMenu);

// ===== 脚注渲染支持 =====
renderer.footnote = function(token) {
  var id = token.id;
  var tokens = token.tokens || [];
  var text = this.parser.parseInline(tokens);
  return '<sup id="fnref-' + id + '"><a href="javascript:void(0)" class="footnote-ref" data-footnote-id="' + id + '">[' + id + ']</a></sup>';
};

renderer.footnoteref = function(token) {
  var id = token.id;
  return '<sup id="fnref-' + id + '"><a href="javascript:void(0)" class="footnote-ref" data-footnote-id="' + id + '">[' + id + ']</a></sup>';
};

renderer.footnotes = function(tokens) {
  var out = '<div class="footnotes">\n<hr>\n<ol>\n';
  tokens.forEach(function(token) {
    var id = token.id;
    var text = this.parser.parseInline(token.tokens);
    out += '<li id="fn-' + id + '" class="footnote-item">' + text + ' <a href="javascript:void(0)" class="footnote-backref" data-footnote-ref="' + id + '">↩ 返回原文</a></li>\n';
  }, this);
  out += '</ol>\n</div>';
  return out;
};

// ===== 脚注交互功能 =====
var _footnoteTooltip = null;
var _footnoteCurrentId = null;
var _footnoteInteractionInitialized = false;

function initFootnoteInteraction() {
  if (_footnoteInteractionInitialized) return;
  _footnoteInteractionInitialized = true;
  
  var preview = document.getElementById('preview');
  if (!preview) return;
  
  preview.addEventListener('mouseover', function(e) {
    var ref = e.target.closest('.footnote-ref');
    if (ref) {
      showFootnoteTooltip(ref, e);
    }
  });
  
  preview.addEventListener('mouseout', function(e) {
    if (_footnoteTooltip && !_footnoteTooltip.contains(e.relatedTarget)) {
      hideFootnoteTooltip();
    }
  });
  
  preview.addEventListener('click', function(e) {
    var ref = e.target.closest('.footnote-ref');
    if (ref) {
      e.preventDefault();
      e.stopPropagation();
      var id = ref.getAttribute('data-footnote-id');
      scrollToFootnote(id);
    }
    
    var backref = e.target.closest('.footnote-backref');
    if (backref) {
      e.preventDefault();
      e.stopPropagation();
      var id = backref.getAttribute('data-footnote-ref');
      var index = backref.getAttribute('data-index');
      scrollToFootnoteRef('fnref-' + id + '-' + index);
    }
  });
}

function showFootnoteTooltip(ref, e) {
  var id = ref.getAttribute('data-footnote-id');
  var footnote = document.getElementById('fn-' + id);
  if (!footnote) return;
  
  _footnoteCurrentId = id;
  
  if (!_footnoteTooltip) {
    _footnoteTooltip = document.createElement('div');
    _footnoteTooltip.className = 'footnote-tooltip';
    document.body.appendChild(_footnoteTooltip);
  }
  
  var content = footnote.cloneNode(true);
  var backrefs = content.querySelectorAll('.footnote-backref');
  backrefs.forEach(function(el) { el.remove(); });
  
  _footnoteTooltip.innerHTML = content.innerHTML;
  _footnoteTooltip.style.left = (e.clientX + 12) + 'px';
  _footnoteTooltip.style.top = (e.clientY + 12) + 'px';
  _footnoteTooltip.classList.add('show');
  
  ref.classList.add('active');
}

function hideFootnoteTooltip() {
  if (_footnoteTooltip) {
    _footnoteTooltip.classList.remove('show');
  }
  document.querySelectorAll('.footnote-ref.active').forEach(function(el) {
    el.classList.remove('active');
  });
  _footnoteCurrentId = null;
}

function scrollToFootnote(id) {
  var footnote = document.getElementById('fn-' + id);
  if (!footnote) return;
  
  document.querySelectorAll('.footnote-item').forEach(function(el) {
    el.classList.remove('highlight');
  });
  
  footnote.classList.add('highlight');
  
  var previewPanel = document.getElementById('previewPanel');
  if (previewPanel) {
    var footnoteRect = footnote.getBoundingClientRect();
    var panelRect = previewPanel.getBoundingClientRect();
    var scrollTarget = previewPanel.scrollTop + (footnoteRect.top - panelRect.top) - 80;
    
    var wasSyncScroll = _syncScroll;
    _syncScroll = false;
    
    previewPanel.scrollTo({ 
      top: Math.max(0, scrollTarget), 
      behavior: 'smooth' 
    });
    
    setTimeout(function() {
      _syncScroll = wasSyncScroll;
    }, 1000);
  } else {
    footnote.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  setTimeout(function() {
    footnote.classList.remove('highlight');
  }, 3000);
}

function scrollToFootnoteRef(id) {
  var ref = document.getElementById(id);
  if (!ref) return;
  
  ref.classList.add('flash');
  
  var previewPanel = document.getElementById('previewPanel');
  if (previewPanel) {
    var refRect = ref.getBoundingClientRect();
    var panelRect = previewPanel.getBoundingClientRect();
    var scrollTarget = previewPanel.scrollTop + (refRect.top - panelRect.top) - 80;
    
    var wasSyncScroll = _syncScroll;
    _syncScroll = false;
    
    previewPanel.scrollTo({ 
      top: Math.max(0, scrollTarget), 
      behavior: 'smooth' 
    });
    
    setTimeout(function() {
      _syncScroll = wasSyncScroll;
    }, 1000);
  } else {
    ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  setTimeout(function() {
    ref.classList.remove('flash');
  }, 1000);
}

// 在 updatePreview 后初始化脚注交互
var _originalUpdatePreview = updatePreview;
updatePreview = function() {
  _originalUpdatePreview();
};

// ===== 公式渲染支持 (KaTeX) =====
function loadKaTeX() {
  if (window.katex) return;
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
  document.head.appendChild(link);
  
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
  script.onload = function() {
    updatePreviewNow();
  };
  document.head.appendChild(script);
}

renderer.codespan = function(token) {
  // 行内代码始终渲染为字面 <code>；公式应使用 $...$ / $$...$$ 语法，
  // 不能用反引号包裹（反引号内是"转义为字面代码"的语义），否则表格单元格
  // 中的 `$x$` 会被误渲染成公式，破坏其它内容。
  var text = token.text || '';
  return '<code>' + escapeHtml(text) + '</code>';
};

renderer.fence = function(token) {
  var text = token.text || '';
  var lang = token.lang || '';
  if (lang === 'math' || lang === 'katex') {
    loadKaTeX();
    return '<pre><code class="language-math">' + escapeHtml(text) + '</code></pre>';
  }
  return '<pre><code>' + escapeHtml(text) + '</code></pre>';
};

function fmtInsertFormula() {
  fmtInsertAtCursor('\n```math\n\n```\n', 9, 9);
  closeAllFmtMenus();
}

// ===== 格式工具栏快捷键（独立监听，不影响原有 Tab 处理） =====
editor.addEventListener('keydown', function(e) {
  if (!(e.ctrlKey || e.metaKey)) return;
  var key = e.key.toLowerCase();
  if (e.shiftKey) {
    switch (key) {
      case 'c': e.preventDefault(); fmtCopyAsMarkdown(); return;
      case 'v': e.preventDefault(); fmtPastePlainText(); return;
      case 'i': e.preventDefault(); fmtInsertImage(); return;
      case 'k': e.preventDefault(); fmtInsertCodeBlock(); return;
      case 'm': e.preventDefault(); fmtInsertFormula(); return;
    }
  } else {
    if (key >= '0' && key <= '6') {
      e.preventDefault();
      var n = parseInt(key, 10);
      if (n === 0) fmtSetParagraph(); else fmtSetHeading(n);
      return;
    }
    if (key === 't') { e.preventDefault(); fmtInsertTable(); return; }
  }
});

// 选区变化时更新按钮激活态
editor.addEventListener('keyup', updateFmtActiveStates);
editor.addEventListener('mouseup', updateFmtActiveStates);
editor.addEventListener('select', updateFmtActiveStates);

// ===== 撤销/重做系统 =====
var _undoStack = [];
var _redoStack = [];
var _undoMaxSize = 100;
var _undoDebounce = null;
var _lastContent = '';

function saveUndoPoint() {
  clearTimeout(_undoDebounce);
  _undoDebounce = setTimeout(function() {
    var content = editor.value;
    if (content !== _lastContent) {
      _undoStack.push(content);
      _lastContent = content;
      if (_undoStack.length > _undoMaxSize) _undoStack.shift();
      _redoStack = [];
    }
  }, 50);
}

function fmtUndo() {
  if (_undoStack.length <= 1) return;
  var current = editor.value;
  _redoStack.push(current);
  var prev = _undoStack.pop();
  _lastContent = prev;
  editor.value = prev;
  fmtAfterEdit();
}

function fmtRedo() {
  if (_redoStack.length === 0) return;
  var current = editor.value;
  _undoStack.push(current);
  var next = _redoStack.pop();
  _lastContent = next;
  editor.value = next;
  fmtAfterEdit();
}

editor.addEventListener('input', saveUndoPoint);

editor.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey)) {
    if (e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      fmtUndo();
      return;
    }
    if ((e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
      e.preventDefault();
      fmtRedo();
      return;
    }
  }
});

_undoStack.push(editor.value);
_lastContent = editor.value;


// ===== Site Pet =====
var _petEle = null;
var _petVisible = localStorage.getItem('kattybb-pet-visible') !== 'false';
var _petDraggable = null;

function makePetDraggable(pet) {
}

function togglePet() {
  var btn = document.getElementById('petToggleBtn');
  if (!_petEle) {
    if (typeof createSitePet === 'function') {
      _petEle = createSitePet('example');
      _petEle.style.zIndex = '201';
    }
    _petVisible = true;
  } else {
    _petVisible = !_petVisible;
    _petEle.style.display = _petVisible ? 'block' : 'none';
  }
  localStorage.setItem('kattybb-pet-visible', _petVisible);
  if (btn) {
    btn.classList.toggle('active', _petVisible);
    btn.title = _petVisible ? t('petHide') : t('petShow');
  }
}

if (typeof createSitePet === 'function') {
  if (_petVisible) {
    _petEle = createSitePet('example');
    _petEle.style.zIndex = '201';
  } else {
    var petBtn = document.getElementById('petToggleBtn');
    if (petBtn) petBtn.classList.remove('active');
  }
}
