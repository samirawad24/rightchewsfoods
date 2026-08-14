/**
 * Shared header behaviour. Superset of the old js/nav.js -- it must keep
 * doing everything nav.js did, because the inner pages hide their content
 * behind .animate-in and rely on this to reveal it.
 */
(function () {
  'use strict';

  function init() {
    /* Sticky shadow. `scrolled` is what css/style.css listens for,
       `is-stuck` is what css/site.css listens for. */
    var nav = document.getElementById('nav');
    if (nav) {
      var onScroll = function () {
        nav.classList.toggle('scrolled', window.scrollY > 20);
        nav.classList.toggle('is-stuck', window.scrollY > 4);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* Mobile menu -- new markup (navToggle/navLinks) and old (hamburger/mobileMenu). */
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function () {
        var open = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', String(open));
      });
      mobileMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* Cart badge. shop.html renders its own, so stay out of its way.
       Handles both the {items:[]} and flat-array cart shapes. */
    var badge = document.getElementById('cartBadge');
    if (badge && !window.RC_CART_OWNER) {
      try {
        var raw = JSON.parse(localStorage.getItem('rc_cart')) || { items: [] };
        var list = Array.isArray(raw) ? raw : (raw.items || []);
        var count = list.reduce(function (s, i) {
          return s + (i.quantity || i.qty || 1);
        }, 0);
        if (count > 0) { badge.textContent = count; badge.classList.add('show'); }
      } catch (e) {}
    }

    /* Reveal on scroll. css/style.css uses .visible, the home page uses .in --
       add both so either stylesheet un-hides the element. */
    var els = document.querySelectorAll('.animate-in');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible', 'in'); });
      return;
    }
    // threshold 0, not 0.12: the legal pages wrap their whole body in a single
    // .animate-in taller than the viewport, which can never reach 12% on screen.
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible', 'in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
