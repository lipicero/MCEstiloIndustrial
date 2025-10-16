import '../styles/components/pages/NovedadesPage.css';
import { useEffect, useState } from 'react';
import SEO from '../components/SEO';

const NovedadesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('todas');

    // Datos de novedades
    const novedades = [
        {
            id: 1,
            titulo: "Nueva colección de muebles industriales 2025",
            categoria: "productos",
            fecha: "10 de Octubre, 2025",
            imagen: "/img/home/img01.jpg",
            resumen: "Descubrí nuestra última colección que combina estilo industrial con funcionalidad moderna.",
            contenido: "Presentamos nuestra nueva línea de muebles industriales, diseñados para espacios contemporáneos que buscan ese toque único y personalizado. Cada pieza está fabricada con materiales de primera calidad.",
            tags: ["Muebles", "Industrial", "Diseño"]
        },
        {
            id: 2,
            titulo: "Taller abierto: Visitas guiadas todos los sábados",
            categoria: "eventos",
            fecha: "5 de Octubre, 2025",
            imagen: "/img/home/img02.jpg",
            resumen: "Te invitamos a conocer nuestro proceso de fabricación artesanal en visitas guiadas gratuitas.",
            contenido: "Cada sábado abrimos las puertas de nuestro taller para que puedas ver de cerca cómo trabajamos el hierro y la madera. Una experiencia única para los amantes del diseño industrial.",
            tags: ["Taller", "Eventos", "Visitas"]
        },
        {
            id: 3,
            titulo: "Consejos para mantener tus muebles de hierro",
            categoria: "tips",
            fecha: "28 de Septiembre, 2025",
            imagen: "/img/home/img03.jpg",
            resumen: "Aprende a cuidar y mantener tus muebles industriales para que duren toda la vida.",
            contenido: "El hierro es un material noble y duradero, pero requiere ciertos cuidados. Te compartimos los mejores tips para que tus muebles se mantengan como el primer día.",
            tags: ["Consejos", "Mantenimiento", "Cuidados"]
        },
        {
            id: 4,
            titulo: "Proyecto destacado: Restaurante 'El Galpón'",
            categoria: "proyectos",
            fecha: "20 de Septiembre, 2025",
            imagen: "/img/home/img04.jpg",
            resumen: "Compartimos el proceso completo de equipamiento de un restaurante con estilo industrial único.",
            contenido: "Recientemente finalizamos el proyecto de mobiliario completo para el restaurante 'El Galpón'. Mesas, sillas, estanterías y decoración, todo con nuestro sello característico.",
            tags: ["Proyectos", "Restaurantes", "Portfolio"]
        },
        {
            id: 5,
            titulo: "Descuentos especiales por aniversario",
            categoria: "ofertas",
            fecha: "15 de Septiembre, 2025",
            imagen: "/img/home/img05.jpg",
            resumen: "Celebramos nuestro 5to aniversario con ofertas exclusivas en productos seleccionados.",
            contenido: "Estamos de festejo y queremos compartirlo con vos. Aprovechá descuentos de hasta 30% en productos seleccionados durante todo el mes.",
            tags: ["Ofertas", "Aniversario", "Descuentos"]
        },
        {
            id: 6,
            titulo: "Tendencias en diseño industrial 2025",
            categoria: "tips",
            fecha: "8 de Septiembre, 2025",
            imagen: "/img/home/img06.jpg",
            resumen: "Conoce las últimas tendencias en decoración y mobiliario con estilo industrial.",
            contenido: "El estilo industrial sigue evolucionando. Te contamos las tendencias que marcarán el 2025: colores, texturas y combinaciones que están revolucionando el diseño de interiores.",
            tags: ["Tendencias", "Diseño", "2025"]
        }
    ];

    const categorias = [
        { id: 'todas', nombre: 'Todas', icono: '📰' },
        { id: 'productos', nombre: 'Productos', icono: '🛋️' },
        { id: 'eventos', nombre: 'Eventos', icono: '📅' },
        { id: 'tips', nombre: 'Tips', icono: '💡' },
        { id: 'proyectos', nombre: 'Proyectos', icono: '🏗️' },
        { id: 'ofertas', nombre: 'Ofertas', icono: '🎁' }
    ];

    const novedadesFiltradas = selectedCategory === 'todas' 
        ? novedades 
        : novedades.filter(n => n.categoria === selectedCategory);

    useEffect(() => {
        // Fade-in animation
        const elementos = document.querySelectorAll('.fade-in-novedad');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, i * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        });

        elementos.forEach(el => observer.observe(el));
    }, [novedadesFiltradas]);

    return (
        <>
            <SEO 
                title="Novedades"
                description="Mantente al día con las últimas novedades, proyectos y actualizaciones de MC Estilo Industrial. Consejos, ofertas y más."
                keywords="novedades, blog, proyectos, ofertas, tips, eventos, actualizaciones"
            />
            <main className="holder novedades-page">
            <section className="novedades-header">
                <h1 className="page-title">📰 Novedades y Actualizaciones</h1>
                <p className="page-subtitle">
                    Mantenete al día con nuestras últimas creaciones, proyectos y novedades del mundo industrial
                </p>
            </section>

            {/* Filtros por categoría */}
            <nav className="categorias-nav">
                {categorias.map(cat => (
                    <button
                        key={cat.id}
                        className={`categoria-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat.id)}
                    >
                        <span className="cat-icon">{cat.icono}</span>
                        <span className="cat-nombre">{cat.nombre}</span>
                    </button>
                ))}
            </nav>

            {/* Grid de novedades */}
            <section className="novedades-grid">
                {novedadesFiltradas.map((novedad, index) => (
                    <article key={novedad.id} className="novedad-card fade-in-novedad">
                        <div className="card-image-container">
                            <img 
                                src={novedad.imagen} 
                                alt={novedad.titulo}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/400x250?text=MC+Estilo+Industrial';
                                }}
                            />
                            <span className="card-categoria">{categorias.find(c => c.id === novedad.categoria)?.icono} {novedad.categoria}</span>
                        </div>
                        <div className="card-content">
                            <time className="card-fecha">{novedad.fecha}</time>
                            <h3 className="card-titulo">{novedad.titulo}</h3>
                            <p className="card-resumen">{novedad.resumen}</p>
                            <div className="card-tags">
                                {novedad.tags.map((tag, i) => (
                                    <span key={i} className="tag">#{tag}</span>
                                ))}
                            </div>
                            <button className="btn-leer-mas">
                                Leer más <span className="arrow">→</span>
                            </button>
                        </div>
                    </article>
                ))}
            </section>

            {novedadesFiltradas.length === 0 && (
                <div className="no-results">
                    <p>😔 No hay novedades en esta categoría todavía.</p>
                </div>
            )}
        </main>
        </>
    );
}

export default NovedadesPage;
