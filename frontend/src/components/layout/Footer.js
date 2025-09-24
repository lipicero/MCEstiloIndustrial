import '../../styles/components/layout/Footer.css'
import { useEffect } from 'react';

const Footer = (props) => {
    // Botón “volver arriba”
  useEffect(() => {
    const btnTop = document.getElementById('scroll-top');

    if (!btnTop) return;

    const handleScroll = () => {
      if (window.scrollY > 100) {
        btnTop.classList.add('show');
      } else {
        btnTop.classList.remove('show');
      }
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', handleScroll);
    btnTop.addEventListener('click', scrollToTop);

    // Limpieza al desmontar
    return () => {
      window.removeEventListener('scroll', handleScroll);
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