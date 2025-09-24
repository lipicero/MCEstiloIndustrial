import '../styles/components/pages/NosotrosPage.css';
import '../App.css'
import { useEffect } from 'react';
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
        <main className="holder">
            <div className="historia fade-in">
                <h2>Historia</h2>
                <p><b>MC Estilo Industrial</b> es una joven empresa, creada el 29 de junio del 2020 ¡Sí en plena pandemia! Surge
                    de la idea de trabajar, de manera individual, haciendo lo que más me gusta, tratando siempre de lograr la
                    mejor calidad y al mejor precio. Dedicada a la elaboración, a pedido, de muebles con la combinación de hierro
                    y madera, rejas, herrería en general, reparaciones en fibra de vidrio y ahora también realizamos trabajos de
                    zinguería.
                </p>
                <div className="persona">
                    <h5>Mauricio Ceroleni</h5>
                    <h6>Propietario</h6>
                </div>
            </div>
            <div className="historia fade-in">
                <h2>Visión</h2>
                <p>Ser referentes en diseño y fabricación de muebles y estructuras de herrería combinadas con madera, creando
                    espacios únicos que reflejen personalidad, autenticidad y calidez. Queremos que cada obra transmita carácter,
                    inspirando a quienes buscan algo más que un simple objeto: una pieza con alma.</p>
            </div>
            <div className="historia fade-in">
                <h2>Misión</h2>
                <p>En <b>MC Estilo Industrial</b> trabajamos para transformar ideas en realidades concretas. Diseñamos y
                    fabricamos muebles, portones y estructuras personalizadas, uniendo la resistencia del hierro con la belleza
                    natural del pino. Nos mueve el compromiso con la calidad, el detalle y la satisfacción de cada cliente,
                    creando productos que combinan estilo rústico, funcionalidad y durabilidad.</p>
            </div>
        </main>
    )
}

export default NosotrosPage