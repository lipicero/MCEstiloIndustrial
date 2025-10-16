import '../../styles/components/layout/Footer.css'
import { useEffect } from 'react';

const Footer = (props) => {
    // Botón “volver arriba”
  useEffect(() => {
    const btnTop = document.getElementById('scroll-top');

    if (!btnTop) return;

    let ticking = false;
    let isVisible = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Hysteresis: diferentes umbrales para aparecer y desaparecer
      // Umbrales más altos para evitar el área problemática
      if (!isVisible && scrollY > 300) {
        btnTop.classList.add('show');
        isVisible = true;
      } else if (isVisible && scrollY < 200) {
        btnTop.classList.remove('show');
        isVisible = false;
      }
      
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    btnTop.addEventListener('click', scrollToTop);

    // Limpieza al desmontar
    return () => {
      window.removeEventListener('scroll', onScroll);
      btnTop.removeEventListener('click', scrollToTop);
    };
  }, []);

    return (
        <footer>
            <button id="scroll-top" aria-label="Volver arriba">↑</button>
            <div className="holder">Diseñado por Matías Ceroleni <br/>© 2025</div>
        </footer>
    )
}
export default Footer;