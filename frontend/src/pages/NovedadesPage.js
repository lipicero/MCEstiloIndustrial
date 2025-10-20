import '../styles/components/pages/NovedadesPage.css';
import { useEffect, useState } from 'react';
import SEO from '../components/SEO';

const NovedadesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('todas');

    // Datos de novedades reales
    const novedades = [
        {
            id: 1,
            titulo: "Nuevas estanterías modulares de hierro y madera",
            categoria: "productos",
            fecha: "15 de Octubre, 2025",
            imagen: "/img/galeria/img1.webp",
            resumen: "Presentamos nuestra línea de estanterías modulares que combinan resistencia del hierro con la calidez de la madera natural.",
            contenido: "Diseñadas para espacios versátiles, estas estanterías se adaptan a cualquier ambiente: salón, oficina o comercio. Estructura de hierro con acabado óxido y estantes de madera maciza de quebracho.",
            tags: ["Estanterías", "Modular", "Hierro y Madera"]
        },
        {
            id: 2,
            titulo: "Mesa comedor industrial: pieza de autor",
            categoria: "productos",
            fecha: "12 de Octubre, 2025",
            imagen: "/img/galeria/img2.webp",
            resumen: "Una mesa única para 8-10 personas que combina diseño robusto con elegancia atemporal.",
            contenido: "Fabricada con estructura de hierro de 2 pulgadas y tablero de madera maciza de 4cm de espesor. Perfecta para ser el centro de reuniones familiares. Disponible en distintos tamaños y acabados personalizados.",
            tags: ["Mesa", "Comedor", "Hierro"]
        },
        {
            id: 3,
            titulo: "Cómo elegir el mueble industrial perfecto para tu espacio",
            categoria: "tips",
            fecha: "10 de Octubre, 2025",
            imagen: "/img/galeria/img3.webp",
            resumen: "Consejos profesionales para integrar muebles industriales en tu decoración sin perder armonía.",
            contenido: "El estilo industrial no es solo tendencia, es funcionalidad y personalidad. Te compartimos claves para medir espacios, combinar materiales y elegir el acabado ideal según la iluminación de tu ambiente.",
            tags: ["Consejos", "Decoración", "Diseño"]
        },
        {
            id: 4,
            titulo: "Proyecto: Equipamiento completo para cafetería boutique",
            categoria: "proyectos",
            fecha: "8 de Octubre, 2025",
            imagen: "/img/galeria/img4.webp",
            resumen: "Compartimos el proceso de diseño y fabricación del mobiliario completo para 'Café del Puerto'.",
            contenido: "20 mesas, 40 sillas, barra principal, estanterías y detalles decorativos. Todo fabricado a medida con hierro de primera calidad y maderas nobles. Un proyecto que transformó el espacio en un lugar único y acogedor.",
            tags: ["Proyecto", "Cafetería", "A medida"]
        },
        {
            id: 5,
            titulo: "Sillas apilables: funcionalidad para espacios comerciales",
            categoria: "productos",
            fecha: "5 de Octubre, 2025",
            imagen: "/img/galeria/img5.webp",
            resumen: "Nueva línea de sillas industriales apilables, ideales para restaurantes, bares y eventos.",
            contenido: "Diseño robusto sin sacrificar comodidad. Estructura de caño de hierro reforzado, asiento de madera maciza tratada y respaldo ergonómico. Se apilan hasta 6 unidades para facilitar el almacenamiento.",
            tags: ["Sillas", "Comercial", "Funcional"]
        },
        {
            id: 6,
            titulo: "Descuentos especiales en muebles de exposición",
            categoria: "ofertas",
            fecha: "3 de Octubre, 2025",
            imagen: "/img/galeria/img6.jpg",
            resumen: "Aprovechá hasta 25% de descuento en muebles seleccionados de nuestro showroom.",
            contenido: "Renovamos nuestro showroom y tenemos ofertas increíbles en mesas, sillas y estanterías que fueron piezas de exhibición. Productos en perfecto estado con garantía completa. ¡Stock limitado!",
            tags: ["Ofertas", "Descuentos", "Outlet"]
        },
        {
            id: 7,
            titulo: "Mantenimiento del hierro: guía completa",
            categoria: "tips",
            fecha: "1 de Octubre, 2025",
            imagen: "/img/galeria/img7.webp",
            resumen: "Todo lo que necesitás saber para mantener tus muebles de hierro impecables por años.",
            contenido: "El hierro es un material noble y duradero que, con los cuidados adecuados, dura generaciones. Te enseñamos limpieza diaria, tratamiento de óxido natural, aplicación de ceras protectoras y cómo conservar el acabado original.",
            tags: ["Mantenimiento", "Cuidados", "Tips"]
        },
        {
            id: 8,
            titulo: "Evento: Taller de soldadura básica para principiantes",
            categoria: "eventos",
            fecha: "28 de Septiembre, 2025",
            imagen: "/img/galeria/img8.webp",
            resumen: "Aprendé los fundamentos de la soldadura en nuestro taller abierto. Cupos limitados.",
            contenido: "Sábado 4 de noviembre de 10 a 14hs. Incluye materiales, protección y certificado. Ideal para quienes quieren iniciarse en el arte de trabajar el metal. Inscripción previa requerida.",
            tags: ["Evento", "Taller", "Soldadura"]
        },
        {
            id: 9,
            titulo: "Mesas ratonas industriales: el complemento perfecto",
            categoria: "productos",
            fecha: "25 de Septiembre, 2025",
            imagen: "/img/galeria/img9.webp",
            resumen: "Mesas ratonas con diseño industrial que aportan carácter a tu living o sala de estar.",
            contenido: "Disponibles en diversos tamaños y formas: cuadradas, rectangulares y redondas. Base de hierro con ruedas industriales opcionales y tapa de madera con acabado natural o envejecido. Perfectas para combinar con cualquier sofá.",
            tags: ["Mesa ratona", "Living", "Diseño"]
        },
        {
            id: 10,
            titulo: "Proyecto residencial: loft industrial en zona norte",
            categoria: "proyectos",
            fecha: "22 de Septiembre, 2025",
            imagen: "/img/galeria/img10.webp",
            resumen: "Equipamos un loft de 120m² con muebles a medida que maximizan espacio y estilo.",
            contenido: "Diseño integral que incluyó mesa de comedor para 12 personas, biblioteca de pared completa, isla de cocina, mesas auxiliares y detalles decorativos. El cliente buscaba funcionalidad sin perder la estética industrial pura.",
            tags: ["Loft", "A medida", "Residencial"]
        },
        {
            id: 11,
            titulo: "Banquetas altas: protagonistas de la barra",
            categoria: "productos",
            fecha: "20 de Septiembre, 2025",
            imagen: "/img/galeria/img11.webp",
            resumen: "Banquetas de 75cm de altura, perfectas para barras de cocina, bares y cafeterías.",
            contenido: "Con o sin respaldo, regulables o fijas. Asiento de madera maciza o tapizado en cuero. Base de hierro con apoya pies circular reforzado. Diseños que combinan comodidad con resistencia comercial.",
            tags: ["Banquetas", "Barra", "Bar"]
        },
        {
            id: 12,
            titulo: "Combinación de materiales: hierro, madera y vidrio",
            categoria: "tips",
            fecha: "18 de Septiembre, 2025",
            imagen: "/img/galeria/img12.webp",
            resumen: "Cómo integrar diferentes materiales en el estilo industrial para crear espacios únicos.",
            contenido: "El secreto está en el balance: el hierro aporta estructura, la madera calidez y el vidrio amplitud visual. Te mostramos proporciones ideales, combinaciones de colores y ejemplos reales de aplicación en distintos ambientes.",
            tags: ["Materiales", "Diseño", "Integración"]
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
