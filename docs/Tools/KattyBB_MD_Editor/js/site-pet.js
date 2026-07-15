function createSitePet(gfx) {
  if (!gfx) {
    gfx = 'sprite';
  }
  const ANI = {
    IDEL1: 0,
    IDEL2: 1,
    IDEL3: 2,
    RIGHT: 3,
    DOWN: 4,
    LEFT: 5,
    UP: 6,
    PET: 7,
    SLEEP: 8
  };

  // 点击摸摸时随机弹出的内置文案（无需联网也能正常使用）
  const PET_PHRASES = [
    '好舒服呀～(◡ ‿ ◡)',
    '再多摸摸嘛 (✿◡‿◡)',
    '嘿嘿，开心！',
    '你也喜欢我吗？',
    '喵呜～被摸到啦！',
    '再来一次好不好嘛~',
    '毛都被摸炸啦！',
    '嘻嘻，好痒呀~',
    '要抱抱！(๑˘︶˘๑)',
    '今天心情不错哦！',
    '摸摸头，元气满满！',
    '嗯...再蹭一下~',
    '你发现我啦！',
    '继续陪我玩嘛~',
    '呼噜呼噜~(*´ω`*)',
    '啊！酥酥麻麻的~',
    '摸得我都不想动了',
    '主人最好了！',
    '再摸摸就要飞起来啦~',
    '嘿，别停呀！',
    '被你摸到，好开心鸭~',
    '这里这里，多摸摸这里~',
    '啊呜，好幸福呀~',
    '感觉自己在发光✨',
    '摸你爹干啥😕',
    '你听说了吗，咱们村来了个交Katty的，非常牛逼克拉斯',
    '莫挨老子，小心把我搞桥哒',
    '搞了学习不啦？',
    '行，摸了个中不溜的！',
    '得劲魔法🧙‍♀️！！！！',   
    '我来不及道声晚安😴有点混乱有点缓慢😵‍💫',   
    '柳下闻瑶琴起舞和一曲🎤，仿佛映当年翩若惊鸿影💃',    
    '摸摸就不无聊啦~'
  ];

  var ele = document.createElement("div");
  ele.style.position = 'fixed';
  ele.style.width = '64px';
  ele.style.height = '64px';
  ele.style.backgroundImage = `url(assets/example.png)`;
  ele.style.backgroundRepeat = 'no-repeat';
  ele.style.backgroundPosition = '0px 0px';
  ele.style.zIndex = '9999';
  document.body.appendChild(ele);

  // ------- 对话气泡元素 -------
  var bubble = document.createElement('div');
  bubble.style.position = 'fixed';
  bubble.style.maxWidth = '180px';
  bubble.style.padding = '6px 10px';
  bubble.style.background = '#ffffff';
  bubble.style.border = '1px solid #ddd';
  bubble.style.borderRadius = '12px';
  bubble.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
  bubble.style.fontSize = '13px';
  bubble.style.lineHeight = '1.4';
  bubble.style.color = '#333';
  bubble.style.zIndex = '10000';
  bubble.style.opacity = '0';
  bubble.style.pointerEvents = 'none';
  bubble.style.transition = 'opacity 200ms ease, transform 200ms ease';
  bubble.style.transform = 'translateY(4px)';
  bubble.style.fontFamily = '"Microsoft YaHei", "PingFang SC", sans-serif';
  bubble.style.whiteSpace = 'pre-wrap';
  bubble.style.textAlign = 'center';

  var bubbleTail = document.createElement('div');
  bubbleTail.style.position = 'absolute';
  bubbleTail.style.bottom = '-6px';
  bubbleTail.style.left = '50%';
  bubbleTail.style.marginLeft = '-6px';
  bubbleTail.style.width = '0';
  bubbleTail.style.height = '0';
  bubbleTail.style.borderLeft = '6px solid transparent';
  bubbleTail.style.borderRight = '6px solid transparent';
  bubbleTail.style.borderTop = '6px solid #ffffff';
  bubble.appendChild(bubbleTail);

  var bubbleText = document.createElement('div');
  bubble.appendChild(bubbleText);
  document.body.appendChild(bubble);

  var bubbleHideTimeout = null;

  const MaxFrame = 8;
  var anim = 0;
  var frame = 0;
  var sleep = 0;
  var x = -64;
  var moving = false;
  var y = Math.floor(Math.floor(window.innerHeight / 64) / 2) * 64;
  ele.style.top = `${y}px`;
  ele.style.left = `${x}px`;
  ele.style.transition = 'top 1500ms linear, left 1500ms linear';

  // ------- 拖拽相关状态 -------
  var dragging = false;
  var dragMoved = false;
  var dragStartX = 0;
  var dragStartY = 0;
  var dragOffsetX = 0;
  var dragOffsetY = 0;

  var positionBubble = () => {
    var bubbleWidth = bubble.offsetWidth || 180;
    var bubbleHeight = bubble.offsetHeight || 40;
    var left = x + 32 - bubbleWidth / 2;
    left = Math.max(4, Math.min(left, window.innerWidth - bubbleWidth - 4));
    var top = y - bubbleHeight - 12;
    if (top < 4) {
      top = y + 64 + 12;
    }
    bubble.style.left = `${left}px`;
    bubble.style.top = `${top}px`;
  };

  var showBubble = (text) => {
    bubbleText.textContent = text;
    clearTimeout(bubbleHideTimeout);
    positionBubble();
    bubble.style.opacity = '1';
    bubble.style.transform = 'translateY(0)';
    bubbleHideTimeout = setTimeout(() => {
      bubble.style.opacity = '0';
      bubble.style.transform = 'translateY(4px)';
    }, 1800);
  };

  var randomPhrase = () => PET_PHRASES[Math.floor(Math.random() * PET_PHRASES.length)];

  // 可选：调用免费的「一言」API（https://hitokoto.cn，无需 Key，支持跨域）
  // 用来偶尔换一句更新鲜的文案，请求失败或超时会自动忽略，不影响内置文案的使用。
  var fetchExtraLine = () => {
    var controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    var timer = controller ? setTimeout(() => controller.abort(), 2500) : null;
    return fetch('https://v1.hitokoto.cn/?encode=text', controller ? { signal: controller.signal } : {})
      .then((res) => {
        if (!res.ok) throw new Error('bad response');
        return res.text();
      })
      .then((text) => {
        text = text && text.trim();
        return (text && text.length <= 40) ? text : null;
      })
      .catch(() => null)
      .finally(() => { if (timer) clearTimeout(timer); });
  };

  // 内置文案至少展示这么久，避免被 API 结果过快覆盖导致用户还没看清就变了
  const MIN_BUILTIN_DISPLAY_MS = 1300;

  var triggerBubble = () => {
    // 先立即显示一句内置文案，保证点击有即时反馈
    showBubble(randomPhrase());
    var shownAt = Date.now();
    // 30% 概率尝试用免费 API 换一句更新鲜的文案（网络不可用时会静默失败）
    if (Math.random() < 0.3 && typeof fetch === 'function') {
      fetchExtraLine().then((line) => {
        if (!line) return;
        var elapsed = Date.now() - shownAt;
        var wait = Math.max(0, MIN_BUILTIN_DISPLAY_MS - elapsed);
        setTimeout(() => showBubble(line), wait);
      });
    }
  };

  var setAnim = (a) => {
    frame = 0;
    anim = a;
  };
  var update = () => {
    let bgX = -64 * frame;
    let bgY = -64 * anim;
    let pos = `${bgX}px ${bgY}px `;
    ele.style.backgroundPosition = pos;
    frame += 1;
    if (frame >= MaxFrame) {
      if (sleep > 0) {
        sleep -= 1;
        moving = false;
        setAnim(ANI.SLEEP);
      } else {
        if (((Math.round(Math.random() * 100000) % 2) == 0) && (x >= 0)) {
          let a = (Math.round(Math.random() * 100000) % 5) - 2;
          if (a < 0) a = 0;
          moving = false;
          setAnim(a);
        } else if (((Math.round(Math.random() * 100000) % 8) != 0) || (x < 0)) {
          let d = Math.round(Math.random() * 100000) % 4;
          let sx = 0;
          let sy = 0;
          let a = null;
          if (d == 3) {
            a = ANI.UP;
            sy = -64;
          } else if (d == 2) {
            a = ANI.DOWN;
            sy = 64;
          } else if (d == 1) {
            a = ANI.LEFT;
            sx = -64;
          } else {
            a = ANI.RIGHT;
            sx = 64;
          }
          if (x <= 0) {
            sx = 64;
            sy = 0;
            a = ANI.RIGHT;
          } else if (x >= (window.innerWidth - 64)) {
            sx = -64;
            sy = 0;
            a = ANI.LEFT;
          } else if (y <= 0) {
            sy = 64;
            sx = 0;
            a = ANI.DOWN;
          } else if (y >= (window.innerHeight - 64)) {
            sy = -64;
            sx = 0;
            a = ANI.UP;
          }
          x += sx;
          y += sy;
          moving = true;
          ele.style.top = `${y}px`;
          ele.style.left = `${x}px`;
          setAnim(a);
        } else {
          sleep = 5;
          moving = false;
          setAnim(ANI.SLEEP);
        }
      }
    }
    if (dragging) {
      ele.style.cursor = 'grabbing';
    } else if ((!moving) && (anim != ANI.PET)) {
      // 睡觉状态(sleep > 0)也允许点击，所以这里不再要求 sleep <= 0
      ele.style.cursor = 'pointer';
    } else {
      ele.style.cursor = 'default';
    }
    if (bubble.style.opacity === '1') {
      positionBubble();
    }
  };
  setInterval(update, 150);
  var click = () => {
    if (dragMoved) {
      // 这次是拖拽产生的点击，不触发摸摸反应
      dragMoved = false;
      return;
    }
    // 去掉了 sleep <= 0 的限制，睡觉时也可以点击摸摸
    if ((!moving) && (anim != ANI.PET)) {
      setAnim(ANI.PET);
      triggerBubble();
    }
  };
  ele.addEventListener('click', click);

  // ------- 拖拽事件 -------
  var getPoint = (e) => (e.touches && e.touches.length ? e.touches[0] : e);

  var onDragStart = (e) => {
    var point = getPoint(e);
    // 用元素实际渲染位置作为起点，避免宠物正在移动过渡中时坐标跳变
    var rect = ele.getBoundingClientRect();
    x = rect.left;
    y = rect.top;
    dragging = true;
    dragMoved = false;
    dragStartX = point.clientX;
    dragStartY = point.clientY;
    dragOffsetX = point.clientX - x;
    dragOffsetY = point.clientY - y;
    ele.style.transition = 'none';
    ele.style.left = `${x}px`;
    ele.style.top = `${y}px`;
    if (e.cancelable) e.preventDefault();
  };

  var onDragMove = (e) => {
    if (!dragging) return;
    var point = getPoint(e);
    if (Math.abs(point.clientX - dragStartX) > 3 || Math.abs(point.clientY - dragStartY) > 3) {
      dragMoved = true;
    }
    var nx = point.clientX - dragOffsetX;
    var ny = point.clientY - dragOffsetY;
    nx = Math.max(0, Math.min(nx, window.innerWidth - 64));
    ny = Math.max(0, Math.min(ny, window.innerHeight - 64));
    x = nx;
    y = ny;
    moving = false;
    ele.style.left = `${x}px`;
    ele.style.top = `${y}px`;
    if (bubble.style.opacity === '1') {
      positionBubble();
    }
    if (e.cancelable) e.preventDefault();
  };

  var onDragEnd = () => {
    if (!dragging) return;
    dragging = false;
    ele.style.transition = 'top 1500ms linear, left 1500ms linear';
  };

  ele.addEventListener('mousedown', onDragStart);
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);
  ele.addEventListener('touchstart', onDragStart, { passive: false });
  document.addEventListener('touchmove', onDragMove, { passive: false });
  document.addEventListener('touchend', onDragEnd);

  return ele;
}