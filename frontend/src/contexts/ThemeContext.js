import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // En móviles, usar el tema del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    } else {
      // En desktop, usar tema guardado o 'light' por defecto
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || 'light';
    }
  });

  useEffect(() => {
    // Aplicar clase al body
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
      // Solo guardar en localStorage en desktop
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    // Escuchar cambios en el tamaño de pantalla
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Al cambiar a móvil, usar tema del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
      } else {
        // Al cambiar a desktop, recuperar tema guardado
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme);
        }
      }
    };

    // Escuchar cambios en las preferencias del sistema (solo móvil)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
