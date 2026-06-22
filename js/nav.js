// Shared nav functionality — included on every page
document.addEventListener('DOMContentLoaded', () => {

  // Scroll shadow effect
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // Cart count from localStorage
  try {
    const cart = JSON.parse(localStorage.getItem('rc_cart')) || { items: [] };
    const count = cart.items.reduce((s, i) => s + i.quantity, 0);
    const badge = document.getElementById('cartBadge');
    if (badge && count > 0) { badge.textContent = count; badge.classList.add('show'); }
  } catch {}

  // Hamburger menu
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Animate-in on scroll
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

});
