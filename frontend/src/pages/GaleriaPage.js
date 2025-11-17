import '../styles/components/pages/GaleriaPage.css';
import '../App.css';
import { useEffect, useState } from 'react';
import SEO from '../components/SEO';

const GaleriaPage = (props) => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [animKey, setAnimKey] = useState(0);
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/galeria`)
      .then(res => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status} ${res.statusText}`);
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('La respuesta no es JSON válido');
        }
        return res.json();
      })
      .then(data => {
        setImagenes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const imagenesFiltradas = filtroActivo === 'todos' 
    ? imagenes.filter(img => img.src && img.src.trim() !== '') 
    : imagenes.filter(img => img.src && img.src.trim() !== '' && img.categoria === filtroActivo);

  const cambiarFiltro = (nuevoFiltro) => {
    setFiltroActivo(nuevoFiltro);
    setAnimKey(prev => prev + 1);
  };

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

    // 7. Modal de galería - Usar delegación de eventos desde document
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

    const imgModal = modal.querySelector('img');              // Imagen dentro del modal
    const cerrarBtn = modal.querySelector('.modal-close');    // Botón de cerrar modal

    // Usar delegación de eventos desde document para que funcione siempre
    const handleGaleriaClick = (e) => {
      // Verificar si el click fue dentro de .galeria
      const galeriaElement = e.target.closest('.galeria');
      if (!galeriaElement) return;

      // Buscar si el click fue en una imagen o en el contenedor de la imagen
      const clickedImg = e.target.tagName === 'IMG' ? e.target : e.target.closest('.galeria-item')?.querySelector('img');
      
      if (!clickedImg) return;                              // Si no hay imagen, no hacer nada
      
      imgModal.src = clickedImg.src;                        // Copia la URL de la imagen
      modal.style.display = 'flex';                         // Muestra el modal
      setTimeout(() => modal.classList.add('open'), 10);    // Añade clase de animación
    };

    const closeModal = (e) => {                                // Función para cerrar modal
      if (e.target === modal || e.target === cerrarBtn) {
        modal.classList.remove('open');                     // Quita la clase de animación
        setTimeout(() => modal.style.display = 'none', 200); // Oculta tras animar
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.classList.remove('open');
        setTimeout(() => modal.style.display = 'none', 200);
      }
    };

    // Hover aleatorio para galería
    const handleMouseEnter = (e) => {
      if (e.target && e.target.matches && e.target.matches('.galeria img')) {
        // Genera un ángulo aleatorio entre 1° y 2°
        const rnd = Math.random() * 2 + 1;
        // Decide si es positivo o negativo
        const angle = (Math.random() < 0.5 ? -1 : 1) * rnd;
        // Asigna la variable CSS para el rotate
        e.target.style.setProperty('--rotate-angle', `${angle}deg`);
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target && e.target.matches && e.target.matches('.galeria img')) {
        e.target.style.setProperty('--rotate-angle', `0deg`);
      }
    };

    // Agregar event listeners
    document.addEventListener('click', handleGaleriaClick);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    modal.addEventListener('click', closeModal);
    cerrarBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', handleEscapeKey);

    // Cleanup function para remover listeners
    return () => {
      document.removeEventListener('click', handleGaleriaClick);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      modal.removeEventListener('click', closeModal);
      cerrarBtn.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', handleEscapeKey);
    };
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
            onClick={() => cambiarFiltro('todos')}
          >
            <span className="filtro-icon">📦</span>
            Todos
          </button>
          <button 
            className={`filtro-btn ${filtroActivo === 'muebles' ? 'active' : ''}`}
            onClick={() => cambiarFiltro('muebles')}
          >
            <span className="filtro-icon">🪑</span>
            Muebles
          </button>
          <button 
            className={`filtro-btn ${filtroActivo === 'portones' ? 'active' : ''}`}
            onClick={() => cambiarFiltro('portones')}
          >
            <span className="filtro-icon">🚪</span>
            Portones
          </button>
          <button 
            className={`filtro-btn ${filtroActivo === 'rejas' ? 'active' : ''}`}
            onClick={() => cambiarFiltro('rejas')}
          >
            <span className="filtro-icon">🛡️</span>
            Rejas
          </button>
          <button 
            className={`filtro-btn ${filtroActivo === 'estructuras' ? 'active' : ''}`}
            onClick={() => cambiarFiltro('estructuras')}
          >
            <span className="filtro-icon">🏗️</span>
            Estructuras
          </button>
        </section>

        {/* Galería con descripciones */}
        {loading && (
          <div className="loading" style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: 'var(--text-muted)',
            fontSize: '1.1rem'
          }}>
            Cargando imágenes...
          </div>
        )}
        {error && (
          <div className="error" style={{ 
            textAlign: 'center', 
            padding: '2rem', 
            color: 'var(--btn-danger-bg)',
            fontSize: '1rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '8px',
            margin: '2rem auto',
            maxWidth: '600px'
          }}>
            Error al cargar imágenes: {error}
          </div>
        )}
        {!loading && !error && (
          <div className="galeria" key={animKey}>
            {imagenesFiltradas.length > 0 ? (
              imagenesFiltradas.map((img, index) => (
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
              ))
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '3rem', 
                color: 'var(--text-muted)',
                fontSize: '1rem',
                gridColumn: '1 / -1'
              }}>
                No hay imágenes en esta categoría
              </div>
            )}
          </div>
        )}
      </main>
    </>
  )
}

export default GaleriaPage