import '../styles/components/pages/GaleriaPage.css';
import '../App.css';
import { useEffect, useState } from 'react';
import SEO from '../components/SEO';

const GaleriaPage = (props) => {
  const [filtroActivo, setFiltroActivo] = useState('todos');

  // Datos de las imágenes con categorías y descripciones
  const imagenes = [
    { src: "img/galeria/img1.webp", categoria: "muebles", descripcion: "Mesa de comedor industrial" },
    { src: "img/galeria/img2.webp", categoria: "muebles", descripcion: "Biblioteca de hierro y madera" },
    { src: "img/galeria/img3.webp", categoria: "portones", descripcion: "Portón corredizo moderno" },
    { src: "img/galeria/img4.webp", categoria: "muebles", descripcion: "Rack para TV estilo industrial" },
    { src: "img/galeria/img5.webp", categoria: "rejas", descripcion: "Reja de seguridad diseño minimalista" },
    { src: "img/galeria/img6.jpg", categoria: "estructuras", descripcion: "Estructura metálica para terraza" },
    { src: "img/galeria/img7.webp", categoria: "muebles", descripcion: "Mesa ratona de hierro y madera" },
    { src: "img/galeria/img8.webp", categoria: "portones", descripcion: "Portón de entrada principal" },
    { src: "img/galeria/img9.webp", categoria: "muebles", descripcion: "Escritorio con cajonera integrada" },
    { src: "img/galeria/img10.webp", categoria: "estructuras", descripcion: "Barandas de escalera personalizadas" },
  ];

  const imagenesFiltradas = filtroActivo === 'todos' 
    ? imagenes 
    : imagenes.filter(img => img.categoria === filtroActivo);

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
    <>
      <SEO 
        title="Galería"
        description="Explorá nuestra galería de proyectos y diseños en muebles industriales. Inspiración para tu hogar o negocio con estilo único."
        keywords="galería, proyectos, diseños industriales, portfolio, muebles personalizados, fotos"
      />
      <main className="holder galeria-page">
        <section className="galeria-header fade-in">
          <h1>Nuestra Galería</h1>
          <p>Proyectos realizados con pasión y dedicación</p>
        </section>

        {/* Filtros */}
        <section className="filtros-galeria fade-in">
          <button 
            className={`filtro-btn ${filtroActivo === 'todos' ? 'active' : ''}`}
            onClick={() => setFiltroActivo('todos')}
          >
            <span className="filtro-icon">📦</span>
            Todos
          </button>
          <button 
            className={`filtro-btn ${filtroActivo === 'muebles' ? 'active' : ''}`}
            onClick={() => setFiltroActivo('muebles')}
          >
            <span className="filtro-icon">🪑</span>
            Muebles
          </button>
          <button 
            className={`filtro-btn ${filtroActivo === 'portones' ? 'active' : ''}`}
            onClick={() => setFiltroActivo('portones')}
          >
            <span className="filtro-icon">🚪</span>
            Portones
          </button>
          <button 
            className={`filtro-btn ${filtroActivo === 'rejas' ? 'active' : ''}`}
            onClick={() => setFiltroActivo('rejas')}
          >
            <span className="filtro-icon">🛡️</span>
            Rejas
          </button>
          <button 
            className={`filtro-btn ${filtroActivo === 'estructuras' ? 'active' : ''}`}
            onClick={() => setFiltroActivo('estructuras')}
          >
            <span className="filtro-icon">🏗️</span>
            Estructuras
          </button>
        </section>

        {/* Galería con descripciones */}
        <div className="galeria fade-in">
          {imagenesFiltradas.map((img, index) => (
            <div key={index} className="galeria-item">
              <img 
                src={img.src} 
                loading="lazy" 
                alt={img.descripcion}
                data-categoria={img.categoria}
              />
              <div className="galeria-descripcion">
                <p>{img.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default GaleriaPage