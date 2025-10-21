import '../styles/components/pages/HomePage.css';
import '../App.css';
import { useEffect } from 'react';
import SEO from '../components/SEO';

const HomePage = (props) => {

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

    // --- Slider de galería ---
    const slider = document.getElementById('galeria-slider');
    if (!slider) return;

    const track = slider.querySelector('.slider-track');
    const imgs = slider.querySelectorAll('img');
    const prev = slider.querySelector('.slider-btn.prev');
    const next = slider.querySelector('.slider-btn.next');
    const dots = document.getElementById('slider-dots');
    let index = 0;
dots.innerHTML = '';
    imgs.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Imagen ' + (i + 1));
      dot.addEventListener('click', () => irA(i));
      dots.appendChild(dot);
    });

    const dotButtons = dots.querySelectorAll('button');

    const actualizarSlider = () => {
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      dotButtons.forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
      // Carrusel infinito: los botones nunca se deshabilitan
      prev.disabled = false;
      next.disabled = false;
    };

    const irA = (i) => {
      // Carrusel infinito: si llega al final, vuelve al inicio y viceversa
      if (i < 0) {
        index = imgs.length - 1;
      } else if (i >= imgs.length) {
        index = 0;
      } else {
        index = i;
      }
      actualizarSlider();
    };

    prev.addEventListener('click', () => irA(index - 1));
    next.addEventListener('click', () => irA(index + 1));

    // Swipe en móviles
    let startX = 0;
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    track.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (dx > 40) irA(index - 1);
      if (dx < -40) irA(index + 1);
    });

    actualizarSlider();

    // Animación “tap” en botones móviles
    const sliderBtns = document.querySelectorAll('.slider-btn');
    sliderBtns.forEach((b) => {
      b.addEventListener('pointerdown', () => {
        if (window.matchMedia('(max-width:650px)').matches) {
          b.classList.remove('animate-tap');
          void b.offsetWidth;
          b.classList.add('animate-tap');
        }
      });
      b.addEventListener('animationend', () => {
        b.classList.remove('animate-tap');
      });
      b.addEventListener('mouseup', () => {
        if (window.innerWidth >= 769) b.blur();
      });
    });

  }, []);
  return (
    <>
      <SEO 
        title="Inicio"
        description="MC Estilo Industrial - Muebles y decoración con estilo industrial único. Diseños personalizados en hierro y madera para espacios contemporáneos."
        keywords="muebles industriales, diseño industrial, muebles de hierro, decoración industrial, muebles personalizados, MC estilo industrial"
      />
      <main className="holder">
      <div className="columnas">
        <section className="bienvenidos fade-in">
          <h2>Bienvenido!</h2>
          <p>
            Descubrí inspiración y soluciones únicas en hierro y madera.<br />
            Mirá nuestros trabajos y encontrá la idea perfecta para tu espacio.
          </p>
        </section>
      </div>
      {/* <-- Beneficios --> */}
      <section className="beneficios fade-in">
        <div className="beneficio">
          <span className="icon-material"></span>
          <h3>Materiales Premium</h3>
          <p>Usamos acero y madera de primera calidad.</p>
        </div>
        <div className="beneficio">
          <span className="icon-personalizado"></span>
          <h3>Diseño a Medida</h3>
          <p>Fabricamos lo que imaginás, adaptado a tu espacio.</p>
        </div>
        <div className="beneficio">
          <span className="icon-tiempo"></span>
          <h3>Entrega Puntual</h3>
          <p>Compromiso real con tus tiempos de entrega.</p>
        </div>
        <div className="beneficio">
          <span className="icon-atencion"></span>
          <h3>Atención Personalizada</h3>
          <p>Estamos en cada paso, desde la consulta hasta la instalación.</p>
        </div>
      </section>
      {/* <-- Slider imagenes --> */}
      <section className="slider-holder fade-in">
        <div className="slider" id="galeria-slider">
          <button className="slider-btn prev" aria-label="Anterior">
            <span className="slider-btn-inner">
              <svg width="20" height="20" viewBox="0 0 24 24" style={{ display: 'block' }} fill="none" stroke="currentColor"
                strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </span>
          </button>
          <div className="slider-track">
            <img src="img/galeria/img1.webp" alt="Mueble de hierro y madera" />
            <img src="img/galeria/img2.webp" alt="Portón moderno a medida" />
            <img src="img/galeria/img3.webp" alt="Estantería industrial" />
          </div>
          <button className="slider-btn next" aria-label="Siguiente">
            <span className="slider-btn-inner">
              <svg width="20" height="20" viewBox="0 0 24 24" style={{ display: 'block' }} fill="none" stroke="currentColor"
                strokeWidth="2">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </span>
          </button>
        </div>
        <div className="slider-dots" id="slider-dots"></div>
      </section>
    </main>
    </>
  );
}

export default HomePage