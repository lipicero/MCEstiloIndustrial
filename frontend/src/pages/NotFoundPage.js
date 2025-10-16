import { Link } from 'react-router-dom';
import '../styles/components/pages/NotFoundPage.css';
import { useEffect } from 'react';
import SEO from '../components/SEO';

const NotFoundPage = () => {
  useEffect(() => {
    // Animación de números aleatorios
    const animateNumbers = () => {
      const numbers = document.querySelectorAll('.glitch-number');
      numbers.forEach(num => {
        setInterval(() => {
          num.textContent = Math.random() > 0.5 ? '4' : '0';
        }, 100);
      });
    };
    
    animateNumbers();
  }, []);

  return (
    <>
      <SEO 
        title="404 - Página no encontrada"
        description="La página que buscás no existe. Volvé al inicio de MC Estilo Industrial."
        keywords="404, página no encontrada, error"
      />
      <main className="holder notfound-container">
      <div className="notfound-content">
        <div className="error-code">
          <span className="glitch-number">4</span>
          <span className="zero-animated">0</span>
          <span className="glitch-number">4</span>
        </div>
        
        <h1 className="notfound-title">¡Ups! Página no encontrada</h1>
        
        <p className="notfound-message">
          Parece que la página que buscás no existe o fue movida.
          <br />
          No te preocupes, podés volver al inicio.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="btn-home">
            <span className="icon">🏠</span> Volver al inicio
          </Link>
          <Link to="/contacto" className="btn-contact">
            <span className="icon">📧</span> Contactanos
          </Link>
        </div>

        <div className="suggestions">
          <p className="suggestions-title">También podés visitar:</p>
          <ul className="suggestions-list">
            <li><Link to="/nosotros">👥 Nosotros</Link></li>
            <li><Link to="/galeria">🖼️ Galería</Link></li>
            <li><Link to="/novedades">📰 Novedades</Link></li>
          </ul>
        </div>

        <div className="notfound-illustration">
          <div className="broken-link"></div>
        </div>
      </div>
    </main>
    </>
  );
};

export default NotFoundPage;
