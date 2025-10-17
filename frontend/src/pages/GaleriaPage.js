import '../styles/components/pages/GaleriaPage.css';
import '../App.css';
import { useEffect, useState } from 'react';
import SEO from '../components/SEO';

const GaleriaPage = (props) => {
  const [filtroActivo, setFiltroActivo] = useState('todos');

  // Datos de las imágenes con categorías y descripciones
  const imagenes = [
    { src: "img/galeria/img1.webp", categoria: "estructuras", descripcion: "Posa Botella" },
    { src: "img/galeria/img2.webp", categoria: "rejas", descripcion: "Rejas metálicas negras, funcionales" },
    { src: "img/galeria/img3.webp", categoria: "estructuras", descripcion: "Perchero 50x22cm" },
    { src: "img/galeria/img4.webp", categoria: "muebles", descripcion: "Mostrador de hierro y madera" },
    { src: "img/galeria/img5.webp", categoria: "estructuras", descripcion: "Puerta corrediza rústica doble" },
    { src: "img/galeria/img6.jpg", categoria: "estructuras", descripcion: "Puerta corredera rústica quemada" },
    { src: "img/galeria/img7.webp", categoria: "muebles", descripcion: "Consola estrecha madera y metal" },
    { src: "img/galeria/img8.webp", categoria: "estructuras", descripcion: "Estufa empotrada con reja" },
    { src: "img/galeria/img9.webp", categoria: "muebles", descripcion: "Escritorio modular madera y metal" },
    { src: "img/galeria/img10.webp", categoria: "muebles", descripcion: "Estantería modular madera y estructura metálica" },
    { src: "img/galeria/img11.webp", categoria: "rejas", descripcion: "Porche cerrado con malla metálica" },
    { src: "img/galeria/img12.webp", categoria: "muebles", descripcion: "Mesa auxiliar hierro y madera" },
    { src: "img/galeria/img13.webp", categoria: "portones", descripcion: "Portón doble hoja, caño estructural y malla" },
    { src: "img/galeria/img14.jpg", categoria: "muebles", descripcion: "Estante de madera y metal elegante" },
    { src: "img/galeria/img15.jpg", categoria: "muebles", descripcion: "Estante de exhibición de madera y metal grande" },
    { src: "img/galeria/img16.jpg", categoria: "muebles", descripcion: "Rack TV estilo industrial moderno" },
    { src: "img/galeria/img17.jpg", categoria: "estructuras", descripcion: "Escalera de metal y madera de estilo moderno" },
    { src: "img/galeria/img18.jpg", categoria: "muebles", descripcion: "Juego de tres estantes de madera y metal escalonados" },
    { src: "img/galeria/img19.jpg", categoria: "muebles", descripcion: "Mesa ratona de madera y metal geométrica" },
    { src: "img/galeria/img20.jpg", categoria: "muebles", descripcion: "Soporte de plantas" },
    { src: "img/galeria/img21.jpg", categoria: "muebles", descripcion: "Estante de madera y metal" },
  ];

  const imagenesFiltradas = filtroActivo === 'todos' 
    ? imagenes 
    : imagenes.filter(img => img.categoria === filtroActivo);

  useEffect(() => {

    // --- Fade-in al hacer scroll ---
    const elementos = document.querySelectorAll('.fade-in');

    // Crear un observer temporal para verificar visibilidad inicial
    const checkInitialVisibility = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Si está visible al cargar, mostrar inmediatamente
          entry.target.classList.add('visible');
          entry.target.style.transitionDelay = '0s';
        }
      });
    }, {
      rootMargin: '0px',
      threshold: 0.1
    });

    // Verificar visibilidad inicial
    elementos.forEach(el => checkInitialVisibility.observe(el));

    // Desconectar el observer inicial después de un breve momento
    setTimeout(() => {
      checkInitialVisibility.disconnect();
    }, 100);

    // Observer principal para elementos que aparecen al hacer scroll
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
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
      // Buscar si el click fue en una imagen o en el contenedor de la imagen
      const clickedImg = e.target.tagName === 'IMG' ? e.target : e.target.closest('.galeria-item')?.querySelector('img');
      
      if (!clickedImg) return;                              // Si no hay imagen, no hacer nada
      
      imgModal.src = clickedImg.src;                        // Copia la URL de la imagen
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