# MC Estilo Industrial 🏗️

Sitio web corporativo para MC Estilo Industrial - Empresa dedicada a la fabricación de muebles y estructuras en hierro y madera con estilo industrial único.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react) ![CSS3](https://img.shields.io/badge/CSS3-Responsive-1572B6?style=flat&logo=css3) ![Status](https://img.shields.io/badge/Status-Active-success)

## 📋 Descripción

Sitio web moderno y responsive desarrollado principalmente con React que presenta los servicios, galería de proyectos y canales de contacto de MC Estilo Industrial. La empresa se especializa en:

- 🪑 Muebles de hierro y madera
- 🚪 Portones personalizados
- 🛡️ Rejas de seguridad
- 🏗️ Estructuras metálicas

Nota: el repositorio contiene además archivos Handlebars (.hbs). Si se utilizan para el backend o plantillas del servidor, documentar su uso en la sección correspondiente.

## ✨ Características

- **Diseño Responsive**: Adaptado a todos los dispositivos (móvil, tablet, desktop).
- **Modo Claro/Oscuro**: Sistema de temas con persistencia en localStorage.
- **Galería Interactiva**:
  - Filtros por categorías.
  - Animaciones suaves al cambiar filtros.
  - Modal para visualización ampliada de imágenes.
  - Lazy loading de imágenes.
- **Animaciones Avanzadas**:
  - Fade-in inteligente (aparición inmediata si el contenido está visible).
  - Transiciones suaves entre secciones.
  - Efectos hover personalizados.
- **SEO Optimizado**: Meta tags dinámicos para cada página.
- **Timeline Interactivo**: Historia de la empresa con diseño visual atractivo.
- **Formulario de Contacto**: Validación de campos y experiencia de usuario mejorada.

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 14.x o superior
- npm o yarn

### Instalación y ejecución (desarrollo)

El repositorio está organizado en carpetas `frontend/` y `backend/`. Ejecuta los pasos en cada carpeta según lo que quieras levantar.

1. Clona el repositorio:

```bash
git clone https://github.com/lipicero/MCEstiloIndustrial.git
cd MCEstiloIndustrial
```

2. Frontend (React):

```bash
cd frontend
npm install
npm start
```

- La aplicación frontend por defecto corre en http://localhost:3000.

3. Backend (si aplica):

```bash
cd backend
npm install
npm start
```

- Revisa `backend/package.json` para los scripts disponibles. El backend por defecto en este proyecto suele escuchar en el puerto 3001 (comprueba `backend/src/bin/www` o la configuración correspondiente).

Si el proyecto usa package.json por separado en frontend/backend, ejecuta los comandos dentro de cada carpeta. Si existe un package.json en la raíz con scripts de conveniencia, esos comandos estarán documentados allí.

## 📁 Estructura del Proyecto (resumida)

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
│   │   └── components/       # CSS por componente (especificar si son CSS Modules/SCSS)
│   ├── App.js
│   └── index.js
└── package.json
```

Nota: Verifica que los archivos y rutas listados arriba coincidan exactamente con `frontend/src` del repositorio. Si se usan extensiones .jsx, .ts(x), SCSS o CSS Modules, actualiza la descripción.

## 🛠️ Tecnologías Utilizadas

- **React 18** (frontend)
- **React Router DOM**
- **React Helmet Async**
- **CSS3** (variables CSS, animaciones)
- **Intersection Observer API**
- **localStorage**
- **Handlebars** (se detectaron archivos .hbs en el repo; posibles plantillas del backend)
- **Node.js / Express** (posible backend si está presente)

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

Comprueba en cada `package.json` (root / frontend / backend) los scripts disponibles. Ejemplos típicos:

- `npm start` — Ejecuta la aplicación en modo desarrollo (ej.: frontend en 3000).
- `npm run build` — Construye la aplicación optimizada para producción.
- `npm test` — Ejecuta los tests (si existen).
- `npm run eject` — ⚠️ Operación irreversible para apps creadas con Create React App.

## 🌐 Deploy

Para construir y desplegar el frontend:

```bash
cd frontend
npm run build
```

La carpeta `build` contendrá los archivos optimizados listos para producción.

### Keep-alive / evitar que Render duerma

Se añadió un endpoint de estado (`/api/ping`) en el backend y un script `keepalive.js` en la carpeta `backend` para hacer peticiones HTTP de prueba.

Opciones para mantener el servicio despierto:

- **Render Cron (recomendado):** Agrega un Cron Job en la dashboard de Render que ejecute `npm run keepalive:loop` en el servicio backend cada 5-10 minutos. Asegurate de configurar la variable de entorno `KEEP_ALIVE_URL` con la URL completa del endpoint (`https://tu-app.onrender.com/api/ping`).

- **Servicio externo de ping:** Usa Uptime Robot, cron-job.org u otro servicio que haga peticiones a `https://tu-app.onrender.com/api/ping` cada X minutos.

- **Ejecutarlo manualmente como script:** Desde `backend/` podés ejecutar `npm run keepalive` para hacer una petición única.

**Nota:** Confirma los nombres exactos de los scripts en `backend/package.json` (`keepalive`, `keepalive:loop`, etc.) antes de configurar Cron o ejecutar localmente.

## 🤝 Contribuciones

Este es un proyecto privado para MC Estilo Industrial. Para sugerencias o mejoras, contacta al equipo de desarrollo.

## 📄 Licencia

Copyright © 2025 MC Estilo Industrial. Todos los derechos reservados.

## 📞 Contacto

- **Sitio Web**: https://mcestiloindustrial.vercel.app
- **Instagram**: https://www.instagram.com/mc_estilo.industrial

---

Desarrollado con ❤️ por el equipo de MC Estilo Industrial
