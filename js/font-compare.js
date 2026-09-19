/* ==========================================================================
   Right Chews -- Helvetica before/after switch.
   Adds a floating pill that flips the site's informational type between the
   original fonts and Helvetica. The choice is remembered in localStorage so
   it survives a click through to another page -- comparing a single hero is
   easy, comparing a whole site is the part that needs the memory.

   Loaded in <head> without `defer` on purpose: the class has to land on
   <html> before first paint, or a saved "Helvetica" choice flashes the old
   fonts on every page load.
   ========================================================================== */
(function () {
  'use strict';

  var CLASS = 'rc-helvetica';
  var KEY = 'rc-font-preview';
  var root = document.documentElement;

  function saved() {
    try { return localStorage.getItem(KEY) === 'helvetica'; }
    catch (e) { return false; }   /* private mode / blocked storage */
  }
  function remember(on) {
    try { localStorage.setItem(KEY, on ? 'helvetica' : 'original'); }
    catch (e) { /* nothing to do -- the toggle still works for this page */ }
  }

  function apply(on) { root.classList.toggle(CLASS, on); }
  function isOn() { return root.classList.contains(CLASS); }

  /* Before paint. */
  apply(saved());

  function build() {
    if (document.querySelector('.rc-fc')) return;

    var box = document.createElement('div');
    box.className = 'rc-fc';

    var label = document.createElement('span');
    label.className = 'rc-fc__label';
    label.innerHTML = 'Font: <span class="rc-fc__state"></span>';

    var btn = document.createElement('button');
    btn.className = 'rc-fc__btn';
    btn.type = 'button';
    btn.setAttribute('aria-pressed', String(isOn()));

    var hint = document.createElement('span');
    hint.className = 'rc-fc__hint';
    hint.textContent = 'Click to switch · hold to peek · press H anywhere';

    box.appendChild(hint);
    box.appendChild(label);
    box.appendChild(btn);
    document.body.appendChild(box);

    var state = label.querySelector('.rc-fc__state');

    function paint() {
      var on = isOn();
      state.textContent = on ? 'Helvetica (after)' : 'Original (before)';
      btn.textContent = on ? 'Show original' : 'Show Helvetica';
      btn.setAttribute('aria-pressed', String(on));
    }
    paint();

    function toggle() {
      var on = !isOn();
      apply(on);
      remember(on);
      paint();
    }
    btn.addEventListener('click', function () {
      /* A press long enough to have been a peek already showed the other font
         and sprang back; committing it on release too would make the peek
         indistinguishable from a click. Keyboard activation never sets the
         flag, so Enter and Space keep working. */
      if (swallowClick) { swallowClick = false; return; }
      toggle();
    });

    /* Press-and-hold peeks at the other font and springs back on release.
       Flicking between the two is how you actually see a type difference --
       side by side, the eye adjusts and both look fine. The peek is not
       remembered, so releasing always returns to the chosen state. */
    var HOLD_MS = 300;
    var peeking = false;
    var pressedAt = 0;
    var swallowClick = false;
    function peekOn(e) {
      if (peeking) return;
      if (e.type === 'mousedown' && e.button !== 0) return;
      peeking = true;
      pressedAt = Date.now();
      apply(!isOn());
      paint();
    }
    function peekOff() {
      if (!peeking) return;
      peeking = false;
      swallowClick = Date.now() - pressedAt >= HOLD_MS;
      apply(saved());
      paint();
    }
    btn.addEventListener('mousedown', peekOn);
    btn.addEventListener('touchstart', peekOn, { passive: true });
    ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(function (evt) {
      btn.addEventListener(evt, peekOff);
    });
    /* A quick tap still reads as a click and flips for real; only a hold past
       HOLD_MS is treated as a look-and-put-back. */

    /* H toggles from anywhere, except while typing in the contact or
       wholesale forms. */
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'h' && e.key !== 'H') return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var el = document.activeElement;
      if (el && (el.isContentEditable ||
                 /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      toggle();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
