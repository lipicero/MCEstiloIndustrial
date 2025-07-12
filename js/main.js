// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // 1. Toggle menú
  const btn  = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (btn && menu) {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('nav-menu--visible');
    });
  }

  // 2. Fade-in on scroll (IntersectionObserver)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // 3. Fade-out rápido al navegar entre páginas
  document.querySelectorAll('.nav-menu li a').forEach(link => {
    // Solo enlaces internos
    if (link.origin !== location.origin) return;

    link.addEventListener('click', event => {
      event.preventDefault();
      // Aplica la clase que hará fade-out
      document.body.classList.add('fade-out');
      // Tras 250 ms (mismo valor que en CSS), redirige
      setTimeout(() => {
        window.location.href = link.href;
      }, 250);
    });
  });
});
const loader = document.getElementById('page-loader');

// 1. Al hacer clic en un enlace interno: mostramos el loader
document.querySelectorAll('.nav-menu li a').forEach(link => {
  if (link.origin !== location.origin) return;
  link.addEventListener('click', e => {
    e.preventDefault();
    loader.classList.remove('hidden');
    // esperar un pelín para que la animación arranque antes de navegar
    setTimeout(() => window.location.href = link.href, 200);
  });
});

// 2. Cuando la nueva página esté lista: ocultamos el loader
window.addEventListener('DOMContentLoaded', () => {
  // dejamos que termine la transición CSS
  loader.classList.add('hidden');
});