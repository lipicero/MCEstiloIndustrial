# MC Estilo Industrial 🏗️

Sitio web corporativo para MC Estilo Industrial - Empresa dedicada a la fabricación de muebles y estructuras en hierro y madera con estilo industrial único.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react)
![CSS3](https://img.shields.io/badge/CSS3-Responsive-1572B6?style=flat&logo=css3)
![Status](https://img.shields.io/badge/Status-Active-success)

## 📋 Descripción

Sitio web moderno y responsive desarrollado con React que presenta los servicios, galería de proyectos y canales de contacto de MC Estilo Industrial. La empresa se especializa en:

- 🪑 Muebles de hierro y madera
- 🚪 Portones personalizados
- 🛡️ Rejas de seguridad
- 🏗️ Estructuras metálicas

## ✨ Características

- **Diseño Responsive**: Adaptado a todos los dispositivos (móvil, tablet, desktop)
- **Modo Claro/Oscuro**: Sistema de temas con persistencia en localStorage
- **Galería Interactiva**: 
  - Sistema de filtros por categorías
  - Animaciones suaves al cambiar filtros
  - Modal para visualización ampliada de imágenes
  - Lazy loading de imágenes
- **Animaciones Avanzadas**:
  - Fade-in inteligente (aparición inmediata si el contenido está visible)
  - Transiciones suaves entre secciones
  - Efectos hover personalizados
- **SEO Optimizado**: Meta tags dinámicos para cada página
- **Timeline Interactivo**: Historia de la empresa con diseño visual atractivo
- **Formulario de Contacto**: Validación de campos y experiencia de usuario mejorada

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 14.x o superior
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/lipicero/React.git
cd React/frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm start
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
frontend/
├── public/
│   ├── img/
│   │   └── galeria/          # Imágenes de proyectos
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── layout/           # Componentes de estructura
│   │   │   ├── Header.js
│   │   │   ├── Nav.js
│   │   │   ├── Footer.js
│   │   │   └── ThemeToggle.js
│   │   └── SEO.js            # Componente de SEO
│   ├── contexts/
│   │   └── ThemeContext.js   # Context API para temas
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── NosotrosPage.js
│   │   ├── GaleriaPage.js
│   │   ├── ContactoPage.js
│   │   └── NotFoundPage.js
│   ├── styles/
│   │   └── components/       # CSS modular por componente
│   ├── App.js
│   └── index.js
└── package.json
```

## 🛠️ Tecnologías Utilizadas

- **React 18**: Biblioteca principal
- **React Router DOM**: Navegación SPA
- **React Helmet Async**: Gestión de meta tags dinámicos
- **CSS3**: Estilos con variables CSS y animaciones
- **Intersection Observer API**: Animaciones al hacer scroll
- **localStorage**: Persistencia de preferencias del usuario

## 📱 Páginas

### Home
- Hero section con presentación
- Beneficios destacados
- Carousel de proyectos

### Nosotros
- Historia visual con timeline
- Estadísticas de la empresa
- Perfil del fundador
- Valores corporativos
- Servicios ofrecidos

### Galería
- Sistema de filtros (Todos, Muebles, Portones, Rejas, Estructuras)
- Grid responsive
- Modal de visualización
- Lazy loading de imágenes
- Animaciones al cambiar filtros

### Contacto
- Formulario de contacto
- Información de ubicación
- Enlaces a redes sociales
- Datos de contacto directo

## 🎨 Características de Diseño

- **Paleta de Colores**: Tonos industriales (grises, carbón, acentos madera)
- **Tipografía**: Roboto (sans-serif moderno)
- **Animaciones**: Transiciones suaves y naturales
- **Accesibilidad**: Contraste adecuado y navegación por teclado
- **Performance**: Lazy loading y optimización de recursos

## 📦 Scripts Disponibles

### `npm start`
Ejecuta la aplicación en modo desarrollo en [http://localhost:3000](http://localhost:3000).

### `npm run build`
Construye la aplicación optimizada para producción en la carpeta `build`.

### `npm test`
Ejecuta los tests en modo interactivo.

### `npm run eject`
⚠️ **Operación irreversible**: Expone la configuración de Create React App.

## 🌐 Deploy

Para construir y desplegar la aplicación:

```bash
npm run build
```

La carpeta `build` contendrá los archivos optimizados listos para producción.

### Keep-alive / evitar que Render duerma

Se añadió un endpoint de estado (`/api/ping`) en el backend y un script `keepalive.js` en la carpeta `backend` para hacer peticiones HTTP de prueba. Para evitar que Render (o servicios similares) ponga la aplicación en estado inactivo, puedes configurar cualquiera de las siguientes opciones:

- **Render Cron (recomendado):** Agrega un Cron Job en la dashboard de Render que ejecute `npm run keepalive:loop` en el servicio backend cada 5-10 minutos. Asegúrate de configurar `KEEP_ALIVE_URL` como la URL completa del backend en producción (por ejemplo `https://tu-app.onrender.com/api/ping`).
- **Servicio externo de ping:** Usa Uptime Robot, cron-job.org u otro servicio que haga peticiones a `https://tu-app.onrender.com/api/ping` cada X minutos.
- **Ejecutarlo manualmente como script:** Ejecuta `npm run keepalive` en la carpeta `backend` para hacer una petición única.

**Nota:** El servidor backend por defecto escucha en el puerto `3001` (revisa `backend/src/bin/www`). Si ejecutas `npm start` en local sin pasar `PORT`, la URL por defecto del ping será `http://localhost:3001/api/ping`. Si usas el puerto `3000` para el frontend o cualquier otro proceso, asegúrate de que `KEEP_ALIVE_URL` apunte al puerto correcto.

Si usas Render Cron, configúralo para ejecutar `npm run keepalive:loop` y establece la variable de entorno `KEEP_ALIVE_URL` con la URL del endpoint.

## 🤝 Contribuciones

Este es un proyecto privado para MC Estilo Industrial. Para sugerencias o mejoras, contacta al equipo de desarrollo.

## 📄 Licencia

Copyright © 2025 MC Estilo Industrial. Todos los derechos reservados.

## 📞 Contacto

- **Sitio Web**: [mcestiloindustrial.com](https://mcestiloindustrial.vercel.app)
- **Instagram**: [@mcestiloindustrial](https://www.instagram.com/mc_estilo.industrial)

---

Desarrollado con ❤️ por el equipo de MC Estilo Industrial
