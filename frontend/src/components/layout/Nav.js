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

        // backdrop/overlay
        let backdrop = document.querySelector('.nav-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'nav-backdrop';
            document.body.appendChild(backdrop);
        }

        const actualizarMenuDesktop = () => {
            if (window.innerWidth >= 769) {
                menu.classList.add('nav-menu--visible');
                backdrop.classList.remove('nav-backdrop--visible');
            } else {
                menu.classList.remove('nav-menu--visible');
                backdrop.classList.remove('nav-backdrop--visible');
            }
        };

        actualizarMenuDesktop();
        window.addEventListener('resize', actualizarMenuDesktop);

        const toggleMenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const abierto = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!abierto));
            menu.classList.toggle('nav-menu--visible');
            btn.classList.toggle('open');
            backdrop.classList.toggle('nav-backdrop--visible');
            document.body.classList.toggle('nav-menu-open');
            btn.blur();
        };
        const cerrarMenu = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
            btn.setAttribute('aria-expanded', 'false');
            menu.classList.remove('nav-menu--visible');
            btn.classList.remove('open');
            backdrop.classList.remove('nav-backdrop--visible');
            document.body.classList.remove('nav-menu-open');
        };
        const cerrarSiFuera = (e) => {
            if (!btn.classList.contains('open')) return;
            if (btn.contains(e.target) || menu.contains(e.target)) return;
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            btn.setAttribute('aria-expanded', 'false');
            menu.classList.remove('nav-menu--visible');
            btn.classList.remove('open');
            backdrop.classList.remove('nav-backdrop--visible');
            document.body.classList.remove('nav-menu-open');
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
        // Usar solo click para evitar duplicación de eventos en móvil
        btn.addEventListener('click', toggleMenu);
        backdrop.addEventListener('click', cerrarMenu, true);
        document.addEventListener('click', cerrarSiFuera, true);

        // Limpieza al desmontar
        return () => {
            window.removeEventListener('resize', actualizarMenuDesktop);
            btn.removeEventListener('click', toggleMenu);
            backdrop.removeEventListener('click', cerrarMenu, true);
            document.removeEventListener('click', cerrarSiFuera, true);
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