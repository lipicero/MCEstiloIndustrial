import { useEffect } from "react";
import "../../styles/components/layout/Header.css";
import Nav from "./Nav";
import { useTheme } from "../../contexts/ThemeContext";

const Header = () => {
  const { theme } = useTheme();

  // Actualizar el theme-color del navegador según el tema
  useEffect(() => {
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    const headerColor = theme === 'dark' ? '#2a2a2a' : '#2c2c2c';
    
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', headerColor);
    }
  }, [theme]);

  useEffect(() => {
    // Efecto de sombra en el nav al hacer scroll
    let ticking = false;
    const nav = document.querySelector('nav');
    
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      
      // Agregar sombra al nav cuando se hace scroll
      if (currentScroll > 50) {
        if (nav) {
          nav.classList.add('nav-sticky-top');
        }
      } else {
        if (nav) {
          nav.classList.remove('nav-sticky-top');
        }
      }
      
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Fade-in al hacer scroll
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
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <header>
      <div className="header-container">
        <div className="logo-section">
          <img
            src="/img/logo.png"
            className="img-logo"
            alt="logo mcestiloindustrial"
          />
          <h1>MC Estilo Industrial</h1>
        </div>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
