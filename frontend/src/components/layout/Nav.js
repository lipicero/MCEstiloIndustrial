import '../../styles/components/layout/Nav.css'
import { NavLink } from "react-router-dom";
import { useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const Nav = (props) => {
    useEffect(() => {
        const btn = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');

        if (!btn || !menu) return;

        btn.setAttribute('aria-expanded', 'false');

        const actualizarMenuDesktop = () => {
            if (window.innerWidth >= 769) {
                menu.classList.add('nav-menu--visible');
            } else {
                menu.classList.remove('nav-menu--visible');
            }
        };

        actualizarMenuDesktop();
        window.addEventListener('resize', actualizarMenuDesktop);

        const toggleMenu = (e) => {
            e.preventDefault();
            const abierto = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!abierto));
            menu.classList.toggle('nav-menu--visible');
            btn.classList.toggle('open');
            btn.blur();
        };
        const cerrarMenu = () => {
            btn.setAttribute('aria-expanded', 'false');
            menu.classList.remove('nav-menu--visible');
            btn.classList.remove('open');
        };
        const cerrarSiFuera = (e) => {
            if (!btn.classList.contains('open')) return;
            if (btn.contains(e.target) || menu.contains(e.target)) return;
            btn.setAttribute('aria-expanded', 'false');
            menu.classList.remove('nav-menu--visible');
            btn.classList.remove('open');
        };

        const enlaces = menu.querySelectorAll('a');
        enlaces.forEach(enlace => {
            enlace.addEventListener('click', () => {
                // Solo cerrar si el menú está visible (modo móvil)
                if (window.innerWidth < 769) {
                    cerrarMenu();
                }
            });
        });
        btn.addEventListener('click', toggleMenu);
        btn.addEventListener('touchend', toggleMenu);
        document.addEventListener('click', cerrarSiFuera);
        document.addEventListener('touchend', cerrarSiFuera);

        // Limpieza al desmontar
        return () => {
            window.removeEventListener('resize', actualizarMenuDesktop);
            btn.removeEventListener('click', toggleMenu);
            btn.removeEventListener('touchend', toggleMenu);
            document.removeEventListener('click', cerrarSiFuera);
            document.removeEventListener('touchend', cerrarSiFuera);
            enlaces.forEach(enlace => {
                enlace.removeEventListener('click', cerrarMenu);
            });
        };
    }, []);

    return (
        <nav>
            <div className="nav-container">
                <ul className="nav-menu">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "activo" : undefined}>Home</NavLink></li>
                    <li><NavLink to="/nosotros" className={({ isActive }) => isActive ? "activo" : undefined}>Nosotros</NavLink></li>
                    <li><NavLink to="/galeria" className={({ isActive }) => isActive ? "activo" : undefined}>Galería</NavLink></li>
                    <li><NavLink to="/novedades" className={({ isActive }) => isActive ? "activo" : undefined}>Novedades</NavLink></li>
                    <li><NavLink to="/contacto" className={({ isActive }) => isActive ? "activo" : undefined}>Contacto</NavLink></li>
                </ul>
                <ThemeToggle />
                <button className="nav-toggle" aria-label="Abrir menú" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </nav>
    )
}
export default Nav;