document.addEventListener('DOMContentLoaded', () => {
  // ————————— 1. Toggle menú + “X” —————————
  const btn = document.querySelector('.nav-toggle');
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
    btn.addEventListener('click', toggleMenu);
    btn.addEventListener('touchend', toggleMenu);
    // Cerrar menú al tocar fuera
    const closeMenu = e => {
      if (!btn.classList.contains('open')) return;
      if (btn.contains(e.target) || menu.contains(e.target)) return;
      btn.setAttribute('aria-expanded', 'false');
      menu.classList.remove('nav-menu--visible');
      btn.classList.remove('open');
    };
    document.addEventListener('click', closeMenu);
    document.addEventListener('touchend', closeMenu);
  }

  // ————————— 2. Fade-in al hacer scroll (con easing y delay escalonado) —————————
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay
          ? entry.target.dataset.delay + 's'
          : `${idx * 0.15}s`;
        entry.target.style.transitionDelay = delay;
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // una sola vez
      }
    });
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  });

  fadeEls.forEach(el => fadeObserver.observe(el));

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
  const form = document.getElementById('contact-form');
  const spinner = document.getElementById('form-spinner');
  const feedbackEl = document.getElementById('form-feedback');
  if (form && spinner && feedbackEl) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      feedbackEl.textContent = '';
      feedbackEl.className = 'form-feedback';
      if (!form.checkValidity()) {
        feedbackEl.textContent = 'Por favor completa todos los campos obligatorios.';
        feedbackEl.classList.add('error');
        return;
      }
      spinner.hidden = false;
      form.querySelector('button[type=submit]').disabled = true;
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
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
    const modalImg = modal.querySelector('img');
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

  // ————————— 8. GALERÍA SLIDER —————————
  const slider = document.getElementById('galeria-slider');
  if (slider) {
    const track = slider.querySelector('.slider-track');
    const images = track.querySelectorAll('img');
    const btnPrev = slider.querySelector('.slider-btn.prev');
    const btnNext = slider.querySelector('.slider-btn.next');
    const dotsHolder = document.getElementById('slider-dots');
    let idx = 0;

    // Dots
    images.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ir a la imagen ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsHolder.appendChild(dot);
    });
    const dots = dotsHolder.querySelectorAll('button');

    function updateSlider() {
      track.style.transform = `translateX(${-idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      btnPrev.disabled = idx === 0;
      btnNext.disabled = idx === images.length - 1;
    }

    function goTo(i) {
      idx = Math.max(0, Math.min(i, images.length - 1));
      updateSlider();
    }

    btnPrev.addEventListener('click', () => goTo(idx - 1));
    btnNext.addEventListener('click', () => goTo(idx + 1));
    // Swipe soporte móvil
    let startX = 0;
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    track.addEventListener('touchend', e => {
      let dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) {
        if (dx > 0) goTo(idx - 1);
        else goTo(idx + 1);
      }
    });
    updateSlider();
  }
});

// --- Animación de tap en botones SOLO para móviles ---
document.querySelectorAll('.slider-btn').forEach(btn => {
  btn.addEventListener('pointerdown', () => {
    if (window.matchMedia('(max-width: 650px)').matches) {
      btn.classList.remove('animate-tap'); // Limpia si ya estaba
      // Forzar reflow para reiniciar la animación si spamean
      void btn.offsetWidth;
      btn.classList.add('animate-tap');
    }
  });
  btn.addEventListener('animationend', () => {
    btn.classList.remove('animate-tap');
  });
});

// Al hacer click con mouse en PC, se quita el focus para evitar el pegado visual.
document.querySelectorAll('.slider-btn').forEach(btn => {
  btn.addEventListener('mouseup', function (e) {
    if (window.innerWidth >= 769) btn.blur();
  });
});