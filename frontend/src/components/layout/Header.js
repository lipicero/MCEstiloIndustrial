import { useEffect } from "react";
import "../../styles/components/layout/Header.css";

const Header = () => {
  useEffect(() => {
    // 2. Fade-in al hacer scroll
    var elementos = document.querySelectorAll(".fade-in");
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
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
      // Observa cada elemento fade-in
      observer.observe(el);
    });
  }, []);
  return (
    <header>
      <div className="holder fade-in">
        <img
          src="/img/logo.png"
          className="img-logo"
          alt="logo mcestiloindustrial"
        />
        <h1>MC Estilo Industrial</h1>
      </div>
    </header>
  );
};

export default Header;
