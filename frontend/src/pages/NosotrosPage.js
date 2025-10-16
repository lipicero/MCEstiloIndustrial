import '../styles/components/pages/NosotrosPage.css';
import '../App.css';
import { useEffect } from 'react';
import SEO from '../components/SEO';

const NosotrosPage = (props) => {
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
    })
    return (
        <>
            <SEO 
                title="Nosotros"
                description="Conocé la historia de MC Estilo Industrial. Empresa joven dedicada a la elaboración de muebles únicos con hierro y madera desde 2020."
                keywords="sobre nosotros, MC estilo industrial, empresa muebles, historia, fabricación artesanal"
            />
            <main className="holder nosotros-page">
                {/* Hero Section */}
                <section className="nosotros-hero fade-in">
                    <div className="hero-content">
                        <h1>MC Estilo Industrial</h1>
                        <p className="hero-subtitle">Creando espacios únicos desde 2020</p>
                    </div>
                </section>

                {/* Estadísticas */}
                <section className="stats-section fade-in">
                    <div className="stat-card">
                        <div className="stat-icon">📅</div>
                        <h3>2020</h3>
                        <p>Año de fundación</p>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🛠️</div>
                        <h3>100+</h3>
                        <p>Proyectos realizados</p>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⭐</div>
                        <h3>100%</h3>
                        <p>Personalizado</p>
                    </div>
                </section>

                {/* Historia Visual */}
                <section className="historia-visual fade-in">
                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-icon">🌱</div>
                            <div className="timeline-content">
                                <h3>El Comienzo</h3>
                                <span className="timeline-date">Junio 2020</span>
                                <p>Nace MC Estilo Industrial en plena pandemia, con la pasión de crear muebles únicos.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-icon">🔨</div>
                            <div className="timeline-content">
                                <h3>Expansión</h3>
                                <span className="timeline-date">2021-2023</span>
                                <p>Incorporamos herrería, rejas, fibra de vidrio y zinguería.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-icon">🚀</div>
                            <div className="timeline-content">
                                <h3>Hoy</h3>
                                <span className="timeline-date">2024-2025</span>
                                <p>Referentes en diseño industrial con hierro y madera.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Fundador */}
                <section className="fundador-section fade-in">
                    <div className="fundador-card">
                        <div className="fundador-avatar">MC</div>
                        <div className="fundador-info">
                            <h3>Mauricio Ceroleni</h3>
                            <p className="fundador-role">Fundador & Artesano</p>
                            <p className="fundador-desc">
                                "Trabajo haciendo lo que más me gusta, siempre buscando la mejor calidad y el mejor precio para cada cliente."
                            </p>
                        </div>
                    </div>
                </section>

                {/* Valores */}
                <section className="valores-section fade-in">
                    <h2>Nuestros Valores</h2>
                    <div className="valores-grid">
                        <div className="valor-card">
                            <div className="valor-icon">🎯</div>
                            <h4>Visión</h4>
                            <p>Ser referentes en diseño industrial, creando piezas con alma que transmitan carácter y autenticidad.</p>
                        </div>
                        <div className="valor-card">
                            <div className="valor-icon">💡</div>
                            <h4>Misión</h4>
                            <p>Transformar ideas en realidades, uniendo hierro y madera con calidad y compromiso.</p>
                        </div>
                        <div className="valor-card">
                            <div className="valor-icon">✨</div>
                            <h4>Pasión</h4>
                            <p>Cada proyecto refleja dedicación y amor por el trabajo artesanal.</p>
                        </div>
                    </div>
                </section>

                {/* Servicios */}
                <section className="servicios-section fade-in">
                    <h2>Lo Que Hacemos</h2>
                    <div className="servicios-grid">
                        <div className="servicio-item">
                            <span className="servicio-emoji">🪑</span>
                            <p>Muebles a medida</p>
                        </div>
                        <div className="servicio-item">
                            <span className="servicio-emoji">🚪</span>
                            <p>Portones y rejas</p>
                        </div>
                        <div className="servicio-item">
                            <span className="servicio-emoji">🏗️</span>
                            <p>Estructuras</p>
                        </div>
                        <div className="servicio-item">
                            <span className="servicio-emoji">🔧</span>
                            <p>Herrería general</p>
                        </div>
                        <div className="servicio-item">
                            <span className="servicio-emoji">⚡</span>
                            <p>Zinguería</p>
                        </div>
                        <div className="servicio-item">
                            <span className="servicio-emoji">🛡️</span>
                            <p>Fibra de vidrio</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default NosotrosPage