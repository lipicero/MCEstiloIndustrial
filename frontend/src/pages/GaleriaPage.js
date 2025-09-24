import '../styles/components/pages/GaleriaPage.css';
import '../App.css'
import { useEffect } from 'react';

const GaleriaPage = (props) => {

  useEffect(() => {

    // --- Fade-in al hacer scroll ---
    const elementos = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const retraso = entry.target.dataset.delay
            ? entry.target.dataset.delay + 's'
            : (i * 0.15) + 's';
          entry.target.style.transitionDelay = retraso;
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    });

    elementos.forEach(el => observer.observe(el));

    // 7. Modal de galería
    const gal = document.querySelector('.galeria');
    if (!gal) return;
    let modal = document.querySelector('.modal-img');       // Intenta obtener modal existente
    if (!modal) {                                           // Si no existe, lo crea
      modal = document.createElement('div');
      modal.className = 'modal-img';
      modal.innerHTML = `
      <span class="modal-close" title="Cerrar">&times;</span>
      <img src="" alt="Imagen ampliada">
    `;
      document.body.appendChild(modal);                    // Lo añade al body
    }

    var imgModal = modal.querySelector('img');              // Imagen dentro del modal
    var cerrarBtn = modal.querySelector('.modal-close');    // Botón de cerrar modal

    gal.addEventListener('click', function (e) {             // Al hacer clic en la galería
      if (e.target.tagName !== 'IMG') return;               // Solo imágenes abren modal
      imgModal.src = e.target.src;                          // Copia la URL de la imagen
      modal.style.display = 'flex';                         // Muestra el modal
      setTimeout(() => modal.classList.add('open'), 10); // Añade clase de animación
    });

    const closeModal = (e) => {                                // Función para cerrar modal
      if (e.target === modal || e.target === cerrarBtn) {
        modal.classList.remove('open');                     // Quita la clase de animación
        setTimeout(() => modal.style.display = 'none', 200); // Oculta tras animar
      }
    };

    modal.addEventListener('click', closeModal);            // Clic en fondo cierra modal
    cerrarBtn.addEventListener('click', closeModal);        // Clic en "×" cierra modal
    document.addEventListener('keydown',(e) => {      // Esc cierra modal
      if (e.key === 'Escape' && modal.style.display === 'flex') closeModal(e);
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
  }, []);
  return (
    <main className="holder">
      <div className="galeria fade-in">
        <img src="img/galeria/img1.webp" loading="lazy" alt="" />
        <img src="img/galeria/img2.webp" loading="lazy" alt="" />
        <img src="img/galeria/img3.webp" loading="lazy" alt="" />
        <img src="img/galeria/img4.webp" loading="lazy" alt="" />
        <img src="img/galeria/img5.webp" loading="lazy" alt="" />
        <img src="img/galeria/img6.jpg" loading="lazy" alt="" />
        <img src="img/galeria/img7.webp" loading="lazy" alt="" />
        <img src="img/galeria/img8.webp" loading="lazy" alt="" />
        <img src="img/galeria/img9.webp" loading="lazy" alt="" />
        <img src="img/galeria/img10.webp" loading="lazy" alt="" />
      </div>
    </main>
  )
}

export default GaleriaPage