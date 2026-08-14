/**
 * Right Chews welcome moment.
 * On the first click of every visit, brownies and cookies rain down the screen.
 * The newsletter offer follows the rain, but only the first time a visitor
 * ever sees it -- the rain replays on every reload, the popup does not.
 *
 * Drop onto any page with:  <script src="js/welcome-rain.js"></script>
 */
(function () {
  'use strict';

  var SEEN_KEY = 'rc_welcome_seen';
  var DONE_KEY = 'rc_newsletter_signup';
  var SPRITE_DIR = 'images/3.0/sprites/';
  var SPRITES = [
    'brownie-chocolate.webp',
    'brownie-red-velvet.webp',
    'brownie-blondie.webp',
    'brownie-dumbbell.webp',
    'cookie-choc-chip.webp',
    'cookie-double-chocolate.webp',
    'cookie-churro.webp',
    'cookie-red-velvet.webp'
  ];
  var DROP_COUNT = 22;
  var RAIN_MS = 2600;

  // Gates the newsletter popup only. The rain is not gated.
  function offerAlreadyShown() {
    try {
      return localStorage.getItem(SEEN_KEY) === '1' ||
             localStorage.getItem(DONE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function remember(key) {
    try { localStorage.setItem(key, '1'); } catch (e) {}
  }

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- styles ---------- */

  function injectStyles() {
    var css = [
      '.rc-rain{position:fixed;inset:0;z-index:9998;pointer-events:none;overflow:hidden}',
      // No per-sprite filter here: drop-shadow on 20+ animating layers stalls the compositor.
      '.rc-rain img{position:absolute;top:-18vh;width:auto;will-change:transform;opacity:.96}',
      '@keyframes rc-fall{from{transform:translate3d(0,0,0) rotate(var(--r0))}',
      'to{transform:translate3d(var(--dx),128vh,0) rotate(var(--r1))}}',

      '.rc-nl{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;',
      'justify-content:center;padding:20px;background:rgba(28,16,8,.62);',
      'opacity:0;transition:opacity 320ms ease}',
      '.rc-nl.rc-in{opacity:1}',
      '.rc-nl__box{position:relative;width:100%;max-width:470px;background:#FFF;',
      'border-radius:18px;padding:40px 38px 32px;text-align:center;',
      'box-shadow:0 30px 70px rgba(0,0,0,.36);transform:translateY(18px) scale(.97);',
      'transition:transform 340ms cubic-bezier(.2,.8,.3,1);font-family:"Open Sans",system-ui,sans-serif}',
      '.rc-nl.rc-in .rc-nl__box{transform:none}',
      '.rc-nl__close{position:absolute;top:12px;right:12px;width:34px;height:34px;',
      'border:0;background:none;cursor:pointer;color:#8A7A6C;font-size:22px;line-height:1;',
      'border-radius:50%;transition:background 160ms ease,color 160ms ease}',
      '.rc-nl__close:hover{background:#F3EEE9;color:#22150C}',
      '.rc-nl__kicker{font-family:"Montserrat",sans-serif;font-size:.72rem;font-weight:700;',
      'letter-spacing:.16em;text-transform:uppercase;color:#E8621B;margin-bottom:12px}',
      '.rc-nl__title{font-family:"Montserrat",sans-serif;font-size:1.85rem;font-weight:800;',
      'line-height:1.15;color:#22150C;margin:0 0 12px}',
      '.rc-nl__title em{font-style:normal;color:#E8621B}',
      '.rc-nl__copy{font-size:.95rem;line-height:1.65;color:#5A5048;margin:0 0 24px}',
      '.rc-nl__form{display:flex;flex-direction:column;gap:10px}',
      '.rc-nl__input{width:100%;box-sizing:border-box;padding:14px 16px;font-size:1rem;',
      'font-family:inherit;color:#22150C;background:#FAF7F3;border:1.5px solid #E4DAD0;',
      'border-radius:9px;outline:none;transition:border-color 160ms ease,background 160ms ease}',
      '.rc-nl__input:focus{border-color:#E8621B;background:#FFF}',
      '.rc-nl__input.rc-bad{border-color:#C0392B;background:#FDF3F2}',
      '.rc-nl__btn{padding:14px 20px;font-family:"Montserrat",sans-serif;font-size:.9rem;',
      'font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#FFC93C;',
      'background:#22150C;border:2px solid #E8621B;border-radius:9px;cursor:pointer;',
      'transition:transform 160ms ease,background 160ms ease}',
      '.rc-nl__btn:hover{background:#2E1C10;transform:translateY(-1px)}',
      '.rc-nl__err{min-height:18px;font-size:.82rem;color:#C0392B;text-align:left}',
      '.rc-nl__fine{margin:16px 0 0;font-size:.74rem;line-height:1.5;color:#9A8E84}',
      '.rc-nl__no{margin-top:14px;background:none;border:0;cursor:pointer;font-family:inherit;',
      'font-size:.8rem;color:#9A8E84;text-decoration:underline;padding:4px}',
      '.rc-nl__no:hover{color:#5A5048}',
      '.rc-nl__done{display:none}',
      '.rc-nl__code{display:inline-block;margin:6px 0 2px;padding:11px 26px;',
      'font-family:"Montserrat",sans-serif;font-size:1.25rem;font-weight:800;letter-spacing:.14em;',
      'color:#22150C;background:#FFE9A8;border:2px dashed #E8621B;border-radius:9px}',
      '@media (max-width:520px){.rc-nl__box{padding:34px 24px 26px}.rc-nl__title{font-size:1.5rem}}',
      '@media (prefers-reduced-motion:reduce){.rc-nl,.rc-nl__box{transition:none}}'
    ].join('');
    var el = document.createElement('style');
    el.textContent = css;
    document.head.appendChild(el);
  }

  /* ---------- falling brownies ---------- */

  function rain(done) {
    if (reduceMotion) { done(); return; }

    var layer = document.createElement('div');
    layer.className = 'rc-rain';
    layer.setAttribute('aria-hidden', 'true');

    for (var i = 0; i < DROP_COUNT; i++) {
      var img = document.createElement('img');
      img.src = SPRITE_DIR + SPRITES[i % SPRITES.length];
      img.alt = '';
      var size = 26 + Math.random() * 40;          // px tall
      var dur = 2.5 + Math.random() * 2.2;         // seconds
      var delay = Math.random() * 1.1;
      var spin = (Math.random() * 640 - 320).toFixed(0);
      img.style.height = size.toFixed(0) + 'px';
      img.style.left = (Math.random() * 100).toFixed(2) + '%';
      img.style.setProperty('--dx', (Math.random() * 120 - 60).toFixed(0) + 'px');
      img.style.setProperty('--r0', (Math.random() * 360).toFixed(0) + 'deg');
      img.style.setProperty('--r1', spin + 'deg');
      img.style.animation = 'rc-fall ' + dur.toFixed(2) + 's linear ' +
                            delay.toFixed(2) + 's forwards';
      layer.appendChild(img);
    }

    document.body.appendChild(layer);
    setTimeout(done, RAIN_MS);
    // Clear the layer once the slowest sprite has left the screen.
    setTimeout(function () {
      if (layer.parentNode) layer.parentNode.removeChild(layer);
    }, 6200);
  }

  /* ---------- newsletter offer ---------- */

  function offer() {
    var wrap = document.createElement('div');
    wrap.className = 'rc-nl';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-labelledby', 'rcNlTitle');
    wrap.innerHTML =
      '<div class="rc-nl__box">' +
        '<button class="rc-nl__close" type="button" aria-label="Close">&times;</button>' +
        '<div class="rc-nl__ask">' +
          '<p class="rc-nl__kicker">Welcome to Right Chews</p>' +
          '<h2 class="rc-nl__title" id="rcNlTitle">Take <em>10% off</em><br />your first order</h2>' +
          '<p class="rc-nl__copy">Join the newsletter for new flavors, restock alerts and the ' +
            'occasional excuse to eat a brownie. We\'ll send your code straight over.</p>' +
          '<form class="rc-nl__form" novalidate>' +
            '<input class="rc-nl__input" type="email" name="email" autocomplete="email" ' +
              'placeholder="you@email.com" aria-label="Email address" required />' +
            '<p class="rc-nl__err" role="alert"></p>' +
            '<button class="rc-nl__btn" type="submit">Send my 10% code</button>' +
          '</form>' +
          '<button class="rc-nl__no" type="button">No thanks, I\'ll pay full price</button>' +
          '<p class="rc-nl__fine">One email per drop, unsubscribe any time. ' +
            'Valid on your first order.</p>' +
        '</div>' +
        '<div class="rc-nl__done">' +
          '<p class="rc-nl__kicker">You\'re in</p>' +
          '<h2 class="rc-nl__title">Here\'s your <em>10% off</em></h2>' +
          '<p class="rc-nl__copy">Use this code at checkout on your first order.</p>' +
          '<span class="rc-nl__code">CHEWS10</span>' +
          '<p class="rc-nl__fine">We sent a copy to your inbox too.</p>' +
        '</div>' +
      '</div>';

    document.body.appendChild(wrap);
    requestAnimationFrame(function () { wrap.classList.add('rc-in'); });

    var box = wrap.querySelector('.rc-nl__box');
    var form = wrap.querySelector('.rc-nl__form');
    var input = wrap.querySelector('.rc-nl__input');
    var err = wrap.querySelector('.rc-nl__err');

    function close() {
      remember(SEEN_KEY);
      wrap.classList.remove('rc-in');
      document.removeEventListener('keydown', onKey);
      setTimeout(function () {
        if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
      }, 340);
    }

    function onKey(e) { if (e.key === 'Escape') close(); }

    wrap.querySelector('.rc-nl__close').addEventListener('click', close);
    wrap.querySelector('.rc-nl__no').addEventListener('click', close);
    wrap.addEventListener('click', function (e) { if (e.target === wrap) close(); });
    document.addEventListener('keydown', onKey);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var value = input.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        input.classList.add('rc-bad');
        err.textContent = 'Please enter a valid email address.';
        input.focus();
        return;
      }
      // TODO: no backend yet -- POST to Mailchimp/Klaviyo/Shopify here.
      // Until then the address is only held in this browser.
      try { localStorage.setItem('rc_newsletter_email', value); } catch (ex) {}
      remember(DONE_KEY);
      box.querySelector('.rc-nl__ask').style.display = 'none';
      box.querySelector('.rc-nl__done').style.display = 'block';
    });

    setTimeout(function () { input.focus({ preventScroll: true }); }, 360);
  }

  /* ---------- trigger: first click of each visit ---------- */

  function start() {
    injectStyles();
    // Rain every time; only follow it with the offer on a visitor's first ever run.
    var withOffer = !offerAlreadyShown();
    rain(function () {
      if (!withOffer) return;
      remember(SEEN_KEY);
      offer();
    });
  }

  function arm() {
    document.addEventListener('click', function once(e) {
      // Let real navigation win -- don't hijack a click on a link or button.
      if (e.target.closest && e.target.closest('a,button,input,select,textarea,label')) return;
      document.removeEventListener('click', once);
      start();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', arm);
  } else {
    arm();
  }
})();
