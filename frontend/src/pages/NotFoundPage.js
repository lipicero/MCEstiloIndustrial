import { Link } from 'react-router-dom';
import '../styles/components/pages/NotFoundPage.css';
import SEO from '../components/SEO';

const NotFoundPage = () => {
  return (
    <>
      <SEO 
        title="404 - Página no encontrada"
        description="La página que buscás no existe. Volvé al inicio de MC Estilo Industrial."
        keywords="404, página no encontrada, error"
      />
      <main className="notfound-container">
        <div className="notfound-content">
          <div className="error-code">
            <span className="error-num">4</span>
            <span className="error-zero">0</span>
            <span className="error-num">4</span>
          </div>
          
          <h1 className="notfound-title">¡Ups! Página no encontrada</h1>
          
          <p className="notfound-message">
            La página que buscás no existe o fue movida.
            <br />
            Pero no te preocupes, podemos ayudarte a encontrar lo que necesitás.
          </p>

          <div className="notfound-actions">
            <Link to="/" className="btn-home">
              <span className="icon">🏠</span>
              <span>Volver al inicio</span>
            </Link>
            <Link to="/contacto" className="btn-contact">
              <span className="icon">✉️</span>
              <span>Contactanos</span>
            </Link>
          </div>

          <div className="suggestions">
            <p className="suggestions-title">Páginas principales:</p>
            <ul className="suggestions-list">
              <li><Link to="/nosotros">👥 Nosotros</Link></li>
              <li><Link to="/galeria">🖼️ Galería</Link></li>
              <li><Link to="/contacto">�� Contacto</Link></li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;