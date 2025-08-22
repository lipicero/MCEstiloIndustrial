document.addEventListener('DOMContentLoaded', function () {
  // Espera a que todo el DOM esté cargado antes de ejecutar el script

  // 1. Toggle de menú
  var btn = document.querySelector('.nav-toggle');          // Selecciona el botón que abre/cierra el menú
  var menu = document.querySelector('.nav-menu');           // Selecciona el contenedor del menú
  if (btn && menu) {                                        // Solo continúa si ambos elementos existen
    btn.setAttribute('aria-expanded', 'false');             // Inicializa atributo ARIA como "cerrado"

    function toggleMenu(e) {                                // Función para alternar el estado del menú
      e.preventDefault();                                   // Evita comportamiento por defecto del enlace
      var abierto = btn.getAttribute('aria-expanded') === 'true'; // Comprueba si el menú está abierto
      btn.setAttribute('aria-expanded', String(!abierto));  // Cambia el estado ARIA
      menu.classList.toggle('nav-menu--visible');           // Muestra u oculta el menú
      btn.classList.toggle('open');                         // Cambia clase para el icono de "X"
      btn.blur();                                           // Quita el foco del botón
    }
    btn.addEventListener('click', toggleMenu);              // Asocia toggleMenu al evento click
    btn.addEventListener('touchend', toggleMenu);           // Asocia toggleMenu al evento touchend

    function cerrarSiFuera(e) {                             // Función para cerrar el menú al hacer clic fuera
      if (!btn.classList.contains('open')) return;          // Si ya está cerrado, no hace nada
      if (btn.contains(e.target) || menu.contains(e.target)) return; // Si clic es dentro del menú, no cierra
      btn.setAttribute('aria-expanded', 'false');           // Marca ARIA como cerrado
      menu.classList.remove('nav-menu--visible');           // Oculta el menú
      btn.classList.remove('open');                         // Vuelve el icono a estado inicial
    }
    document.addEventListener('click', cerrarSiFuera);      // Detecta clic global para cerrar menú
    document.addEventListener('touchend', cerrarSiFuera);   // Detecta touch fuera para cerrar menú
  }

  // 2. Fade-in al hacer scroll
  var elementos = document.querySelectorAll('.fade-in');    // Selecciona todos los elementos con clase fade-in
  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry, i) {                    // Recorre cada intersección detectada
      if (entry.isIntersecting) {                           // Si el elemento está en vista
        var retraso = entry.target.dataset.delay             // Comprueba si tiene retraso personalizado
          ? entry.target.dataset.delay + 's'
          : (i * 0.15) + 's';                                // Si no, calcula retraso escalonado
        entry.target.style.transitionDelay = retraso;       // Aplica el retraso al estilo
        entry.target.classList.add('visible');              // Añade clase para iniciar la animación
        obs.unobserve(entry.target);                        // Deja de observar este elemento
      }
    });
  }, {
    rootMargin: '0px 0px -10% 0px',                         // Ajusta margen de disparo antes de 100% de altura
    threshold: 0.1                                          // Umbral del 10% para considerar visible
  });
  elementos.forEach(function (el) {                          // Observa cada elemento fade-in
    observer.observe(el);
  });

  // 3. Loader en navegación interna
  var loader = document.getElementById('page-loader');      // Selecciona el indicador de carga
  if (loader) {                                             // Si existe
    var links = document.querySelectorAll('.nav-menu li a');// Selecciona todos los enlaces del menú
    links.forEach(function (link) {
      if (link.origin !== location.origin) return;         // Solo aplica a enlaces internos
      link.addEventListener('click', function (e) {         // Al hacer clic en un enlace
        e.preventDefault();                                // Cancela la navegación inmediata
        loader.classList.add('visible');                   // Muestra el loader
        document.body.classList.add('fade-out');           // Aplica efecto fade-out al contenido
        setTimeout(function () {
          window.location.href = link.href;                // Navega al link tras 250ms
        }, 250);
      });
    });
  }

  // 4. Formulario con Formspree
  var form = document.getElementById('contact-form');       // Selecciona el formulario de contacto
  var spinner = document.getElementById('form-spinner');    // Selecciona el spinner de carga
  var feedback = document.getElementById('form-feedback');  // Selecciona el área de mensajes
  if (form && spinner && feedback) {
    form.addEventListener('submit', function (e) {           // Al enviar el formulario
      e.preventDefault();                                   // Evita recarga de página
      feedback.textContent = '';                            // Limpia mensajes previos
      feedback.className = 'form-feedback';                 // Resetea clases CSS

      if (!form.checkValidity()) {                          // Si faltan campos obligatorios
        feedback.textContent = 'Completa todos los campos obligatorios.'; // Mensaje de error
        feedback.classList.add('error');
        return;
      }

      spinner.hidden = false;                               // Muestra el spinner
      form.querySelector('button[type=submit]').disabled = true; // Deshabilita el botón

      fetch(form.action, {                                  // Envía datos con fetch
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (res) {
          if (!res.ok) {                                      // Si no es respuesta 200
            return res.json().then(function (json) {
              throw new Error(json.error || 'Error al enviar'); // Lanza error
            });
          }
          feedback.textContent = '¡Mensaje enviado con éxito!'; // Mensaje de éxito
          feedback.classList.add('success');
          form.reset();                                       // Limpia el formulario
        })
        .catch(function () {
          feedback.textContent = 'Hubo un problema. Intenta más tarde.'; // Mensaje de fallo
          feedback.classList.add('error');
        })
        .finally(function () {
          spinner.hidden = true;                              // Oculta el spinner
          form.querySelector('button[type=submit]').disabled = false; // Reactiva botón
        });
    });
  }

  // 5. Botón “volver arriba”
  var btnTop = document.getElementById('scroll-top');       // Selecciona el botón scroll-top
  if (btnTop) {
    window.addEventListener('scroll', function () {          // Al hacer scroll
      if (window.scrollY > 100)                             // Si se baja más de 100px
        btnTop.classList.add('show');                       // Muestra el botón
      else
        btnTop.classList.remove('show');                    // Oculta el botón
    });
    btnTop.addEventListener('click', function () {            // Al hacer clic en el botón
      window.scrollTo({ top: 0, behavior: 'smooth' });       // Hace scroll suave hasta arriba
    });
  }

  // 6. Mostrar menú en desktop
  function actualizarMenuDesktop() {                        // Ajusta visibilidad según ancho
    if (!menu) return;                                      // Si no hay menú, sale
    if (window.innerWidth >= 769)                           // Si es desktop (>=769px)
      menu.classList.add('nav-menu--visible');              // Muestra el menú
    else
      menu.classList.remove('nav-menu--visible');           // Oculta el menú en móvil
  }
  actualizarMenuDesktop();                                  // Llama al cargar
  window.addEventListener('resize', actualizarMenuDesktop); // Repite al cambiar tamaño

  // 7. Modal de galería
  var gal = document.querySelector('.galeria');             // Selecciona el contenedor de imágenes
  if (gal) {
    var modal = document.querySelector('.modal-img');       // Intenta obtener modal existente
    if (!modal) {                                           // Si no existe, lo crea
      modal = document.createElement('div');
      modal.className = 'modal-img';
      modal.innerHTML = '\
        <span class="modal-close" title="Cerrar">&times;</span>\
        <img src="" alt="Imagen ampliada">';
      document.body.appendChild(modal);                     // Lo añade al body
    }
    var imgModal = modal.querySelector('img');              // Imagen dentro del modal
    var cerrarBtn = modal.querySelector('.modal-close');    // Botón de cerrar modal

    gal.addEventListener('click', function (e) {             // Al hacer clic en la galería
      if (e.target.tagName !== 'IMG') return;               // Solo imágenes abren modal
      imgModal.src = e.target.src;                          // Copia la URL de la imagen
      modal.style.display = 'flex';                         // Muestra el modal
      setTimeout(function () { modal.classList.add('open'); }, 10); // Añade clase de animación
    });

    function closeModal(e) {                                // Función para cerrar modal
      if (e.target === modal || e.target === cerrarBtn) {
        modal.classList.remove('open');                     // Quita la clase de animación
        setTimeout(function () { modal.style.display = 'none'; }, 200); // Oculta tras animar
      }
    }
    modal.addEventListener('click', closeModal);            // Clic en fondo cierra modal
    cerrarBtn.addEventListener('click', closeModal);        // Clic en "×" cierra modal
    document.addEventListener('keydown', function (e) {      // Esc cierra modal
      if (e.key === 'Escape' && modal.style.display === 'flex') closeModal(e);
    });
  }

  // 8. Slider de galería
  var slider = document.getElementById('galeria-slider');   // Selecciona el slider
  if (slider) {
    var track = slider.querySelector('.slider-track');      // Pista donde van las imágenes
    var imgs = slider.querySelectorAll('img');              // Todas las imágenes
    var prev = slider.querySelector('.slider-btn.prev');    // Botón anterior
    var next = slider.querySelector('.slider-btn.next');    // Botón siguiente
    var dots = document.getElementById('slider-dots');      // Contenedor de puntos
    var index = 0;                                          // Índice de imagen actual

    imgs.forEach(function (_, i) {                           // Crea un punto por imagen
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Imagen ' + (i + 1));    // Label accesible
      dot.addEventListener('click', function () { irA(i); });
      dots.appendChild(dot);
    });
    var dotButtons = dots.querySelectorAll('button');       // Botones de puntos

    function actualizarSlider() {                           // Actualiza vista del slider
      track.style.transform = 'translateX(' + (-index * 100) + '%)'; // Mueve pista
      dotButtons.forEach(function (d, i) {
        d.classList.toggle('active', i === index);          // Activa punto actual
      });
      prev.disabled = index === 0;                          // Deshabilita prev en inicio
      next.disabled = index === imgs.length - 1;            // Deshabilita next al final
    }
    function irA(i) {                                       // Función para ir a índice i
      index = Math.max(0, Math.min(i, imgs.length - 1));    // Limita rango válido
      actualizarSlider();                                   // Refresca vista
    }
    prev.addEventListener('click', function () { irA(index - 1); }); // Prev
    next.addEventListener('click', function () { irA(index + 1); }); // Next

    // Swipe en móviles
    var startX = 0;
    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;                        // Guarda posición inicial
    });
    track.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - startX;        // Calcula desplazamiento
      if (dx > 40) irA(index - 1);                          // Swipe derecha
      if (dx < -40) irA(index + 1);                         // Swipe izquierda
    });

    actualizarSlider();                                     // Inicializa el slider
  }

  // 9. Animación “tap” en botones (solo móvil)
  var sliderBtns = document.querySelectorAll('.slider-btn'); // Selecciona todos los botones del slider
  sliderBtns.forEach(function (b) {
    b.addEventListener('pointerdown', function () {           // Al tocar el botón
      if (window.matchMedia('(max-width:650px)').matches) {  // Solo en pantallas pequeñas
        b.classList.remove('animate-tap');                   // Limpia clase si existe
        void b.offsetWidth;                                  // Forza reflow para reiniciar animación
        b.classList.add('animate-tap');                      // Añade clase para animar
      }
    });
    b.addEventListener('animationend', function () {
      b.classList.remove('animate-tap');                     // Quita clase al terminar animación
    });
    b.addEventListener('mouseup', function () {                // En PC, quita foco al soltar
      if (window.innerWidth >= 769) b.blur();
    });
  });
});
// ——— Hover aleatorio para galería ———
document.querySelectorAll('.galeria img').forEach(img => {
  img.addEventListener('mouseenter', () => {
    // Genera un ángulo aleatorio entre 1° y 2°
    const rnd = Math.random() * 2 + 1;
    // Decide si es positivo o negativo
    const angle = (Math.random() < 0.5 ? -1 : 1) * rnd;
    // Asigna la variable CSS para el rotate
    img.style.setProperty('--rotate-angle', `${angle}deg`);
  });
  // Opcional: al salir, dejamos la variable en 0 para “deshacer” cualquier resto
  img.addEventListener('mouseleave', () => {
    img.style.setProperty('--rotate-angle', `0deg`);
  });
});
