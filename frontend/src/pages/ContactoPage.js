import "../App.css";
import "../styles/components/pages/ContactoPage.css";
import { useEffect } from "react";
import SEO from '../components/SEO';

const ContactoPage = () => {
  useEffect(() => {
    // 2. Fade-in al hacer scroll
    var elementos = document.querySelectorAll(".fade-in");
    
    // Crear un observer temporal para verificar visibilidad inicial
    var checkInitialVisibility = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Si está visible al cargar, mostrar inmediatamente
            entry.target.classList.add("visible");
            entry.target.style.transitionDelay = "0s";
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    // Verificar visibilidad inicial
    elementos.forEach(function (el) {
      checkInitialVisibility.observe(el);
    });

    // Desconectar el observer inicial después de un breve momento
    setTimeout(function () {
      checkInitialVisibility.disconnect();
    }, 100);

    // Observer principal para elementos que aparecen al hacer scroll
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting && !entry.target.classList.contains("visible")) {
            var retraso = entry.target.dataset.delay
              ? entry.target.dataset.delay + "s"
              : i * 0.15 + "s";
            entry.target.style.transitionDelay = retraso;
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      }
    );
    elementos.forEach(function (el) {
      observer.observe(el);
    });

    const form = document.getElementById("contact-form");
    const spinner = document.getElementById("form-spinner");
    const feedback = document.getElementById("form-feedback");

    if (!form || !spinner || !feedback) return;


    const handleSubmit = (e) => {
      e.preventDefault();
      feedback.textContent = "";
      feedback.className = "form-feedback";

      if (!form.checkValidity()) {
        feedback.textContent = "Completa todos los campos obligatorios.";
        feedback.classList.add("error");
        return;
      }

      spinner.hidden = false;
      form.querySelector("button[type=submit]").disabled = true;

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((json) => {
              throw new Error(json.error || "Error al enviar");
            });
          }
          feedback.textContent = "¡Mensaje enviado con éxito!";
          feedback.classList.add("success");
          form.reset();
          // Ocultar mensaje de éxito después de 3 segundos
          setTimeout(() => {
            feedback.textContent = "";
            feedback.className = "form-feedback";
          }, 3000);
        })
        .catch(() => {
          feedback.textContent = "Hubo un problema. Intenta más tarde.";
          feedback.classList.add("error");
        })
        .finally(() => {
          spinner.hidden = true;
          form.querySelector("button[type=submit]").disabled = false;
        });
    };

    form.addEventListener("submit", handleSubmit);


    
  }, []);

  return (
    <>
      <SEO 
        title="Contacto"
        description="Contactá con MC Estilo Industrial. Respondemos tus consultas en menos de 24 horas. Pedí tu presupuesto sin compromiso."
        keywords="contacto, presupuesto, consultas, formulario contacto, whatsapp, ubicación"
      />
      <main className="holder contacto">
      <div className="form-container fade-in">
        <h2>¡Hablemos!</h2>
        <p className="mensaje-bienvenida">
          ¿Tenés una idea, consulta o querés un presupuesto? Escribinos y te
          respondemos en menos de 24 horas.
        </p>
        <form
          id="contact-form"
          className="formulario"
          action="https://formspree.io/f/xanogqro"
          method="POST"
        >
          <div className="form-group">
            <label htmlFor="name">
              <span className="icon">👤</span> Nombre *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Tu nombre"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <span className="icon">✉️</span> Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="tu@ejemplo.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">
              <span className="icon">📞</span> Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+54 9 11 1234 5678"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">
              <span className="icon">💬</span> Mensaje *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="4"
              placeholder="¿En qué podemos ayudarte?"
            ></textarea>
          </div>
          <input type="hidden" name="_language" value="es" />
          <div className="form-group submit-group">
            <button type="submit" className="btn-enviar">
              Enviar mensaje
            </button>
            <div id="form-spinner" className="spinner" hidden></div>
          </div>
          <div id="form-feedback" className="form-feedback"></div>
        </form>
      </div>
      <div className="datos fade-in">
        <h2>Otras vías de contacto</h2>
        <ul className="icon-list">
          <li>
            {" "}
            <a
              href="https://wa.me/5493772636000?text=%C2%A1Hola!"
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon-wsp"></span> WhatsApp
            </a>
          </li>
          <li>
            {" "}
            <a
              href="https://www.instagram.com/mc_estilo.industrial"
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon-ig"></span> Instagram
            </a>
          </li>
        </ul>
        <iframe
          title="Mapa ubicacion"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6967.436750341601!2d-56.64325400478516!3d-29.172970163883875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945461e42dd25c45%3A0xfb6a0eca2b1cfc48!2sMC%20Estilo%20Industrial!5e0!3m2!1ses-419!2sar!4v1752366386898!5m2!1ses-419!2sar"
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="mapa-contacto"
        ></iframe>
      </div>
    </main>
    </>
  );
};

export default ContactoPage;
