import '../../styles/components/layout/Nav.css'
import { NavLink } from "react-router-dom";
import { useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { API_URL } from '../../config/api';

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
                    <li><NavLink to="/" end>Home</NavLink></li>
                    <li><NavLink to="/nosotros">Nosotros</NavLink></li>
                    <li><NavLink to="/galeria">Galería</NavLink></li>
                    <li><NavLink to="/contacto">Contacto</NavLink></li>
                    <div className="user-section" aria-label='Iniciar Sesión'>
                        <a
                            href={`${API_URL}/login`}
                            className="user-link"
                            aria-label="Iniciar sesión"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </a>
                    </div>
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
