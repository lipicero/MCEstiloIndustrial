// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // ————————— 1. Toggle menú + “X” —————————
  const btn  = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (btn && menu) {
    btn.setAttribute('aria-expanded', 'false');
    const toggleMenu = e => {
      e.preventDefault();
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('nav-menu--visible');
      btn.classList.toggle('open');
      btn.blur();
    };
    btn.addEventListener('click',    toggleMenu);
    btn.addEventListener('touchend', toggleMenu);
    // Cerrar menú al tocar fuera
    const closeMenu = e => {
      if (!btn.classList.contains('open')) return;
      if (btn.contains(e.target) || menu.contains(e.target)) return;
      btn.setAttribute('aria-expanded', 'false');
      menu.classList.remove('nav-menu--visible');
      btn.classList.remove('open');
    };
    document.addEventListener('click',    closeMenu);
    document.addEventListener('touchend', closeMenu);
  }

  // ————————— 2. Fade-in al hacer scroll (con delay escalonado) —————————
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay =
          entry.target.dataset.delay
            ? entry.target.dataset.delay + 's'
            : (idx * 0.15) + 's';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Solo una vez
      }
    });
  }, { threshold: 0.18 });
  fadeEls.forEach(el => observer.observe(el));

  // ————————— 3. Loader + fade-out en navegación —————————
  const loader = document.getElementById('page-loader');
  if (loader) {
    document.querySelectorAll('.nav-menu li a').forEach(link => {
      if (link.origin !== location.origin) return;
      link.addEventListener('click', e => {
        e.preventDefault();
        loader.classList.add('visible');
        document.body.classList.add('fade-out');
        setTimeout(() => window.location.href = link.href, 250);
      });
    });
  }

  // ————————— 4. Envío de Contacto con Formspree —————————
  const form       = document.getElementById('contact-form');
  const spinner    = document.getElementById('form-spinner');
  const feedbackEl = document.getElementById('form-feedback');
  if (form && spinner && feedbackEl) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      feedbackEl.textContent = '';
      feedbackEl.className   = 'form-feedback';
      if (!form.checkValidity()) {
        feedbackEl.textContent = 'Por favor completa todos los campos obligatorios.';
        feedbackEl.classList.add('error');
        return;
      }
      spinner.hidden = false;
      form.querySelector('button[type=submit]').disabled = true;
      try {
        const res  = await fetch(form.action, {
          method: 'POST',
          body:   new FormData(form),
          headers:{ 'Accept': 'application/json' }
        });
        if (res.ok) {
          feedbackEl.textContent = '¡Gracias! Tu mensaje ha sido enviado.';
          feedbackEl.classList.add('success');
          form.reset();
        } else {
          const json = await res.json();
          throw new Error(json.error || 'Error al enviar');
        }
      } catch (err) {
        console.error(err);
        feedbackEl.textContent = 'Ocurrió un problema. Intenta más tarde.';
        feedbackEl.classList.add('error');
      } finally {
        spinner.hidden = true;
        form.querySelector('button[type=submit]').disabled = false;
      }
    });
  }

  // ————————— 5. Scroll-top button —————————
  const btnTop = document.getElementById('scroll-top');
  if (btnTop) {
    window.addEventListener('scroll', () => {
      btnTop.classList.toggle('show', window.scrollY > 100);
    });
    btnTop.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  // ————————— 6. Animar nav en Desktop al cargar y redimensionar —————————
  const handleDesktopNav = () => {
    if (!menu) return;
    if (window.innerWidth >= 769) {
      menu.classList.add('nav-menu--visible');
    } else {
      menu.classList.remove('nav-menu--visible');
    }
  };
  handleDesktopNav();
  window.addEventListener('resize', handleDesktopNav);

  // ————————— 7. MODAL/LIGHTBOX para Galería —————————
  const galeria = document.querySelector('.galeria');
  if (galeria) {
    // Crea el modal solo una vez
    let modal = document.querySelector('.modal-img');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal-img';
      modal.innerHTML = `
        <span class="modal-close" title="Cerrar">&times;</span>
        <img src="" alt="Imagen ampliada">
      `;
      document.body.appendChild(modal);
    }
    const modalImg  = modal.querySelector('img');
    const modalClose = modal.querySelector('.modal-close');

    // Abre el modal al clickear la imagen
    galeria.addEventListener('click', function (e) {
      const target = e.target;
      if (target.tagName === 'IMG') {
        modalImg.src = target.src;
        modalImg.alt = target.alt || 'Imagen ampliada';
        modal.style.display = 'flex';
        setTimeout(() => { modal.classList.add('open'); }, 10);
      }
    });
    // Cierra el modal en la X o fondo oscuro
    function cerrarModal(e) {
      if (
        e.target === modal || // click en fondo
        e.target === modalClose // click en la X
      ) {
        modal.classList.remove('open');
        setTimeout(() => { modal.style.display = 'none'; }, 200);
      }
    }
    modal.addEventListener('click', cerrarModal);
    modalClose.addEventListener('click', cerrarModal);
    // Cierra con Esc
    document.addEventListener('keydown', (e) => {
      if (modal.style.display === 'flex' && e.key === 'Escape') {
        modal.classList.remove('open');
        setTimeout(() => { modal.style.display = 'none'; }, 200);
      }
    });
  }
});

// Asegura ocultar el loader luego de cargar todos los recursos
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) loader.classList.remove('visible');
});
