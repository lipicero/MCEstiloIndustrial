# MC Estilo Industrial 🏗️

Aplicación web full-stack para MC Estilo Industrial - Empresa dedicada a la fabricación de muebles y estructuras en hierro y madera con estilo industrial único.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react) ![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js) ![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=flat&logo=mysql) ![Status](https://img.shields.io/badge/Status-Active-success)

## 📋 Descripción

Aplicación web completa con frontend React y backend Node.js/Express que presenta los servicios, galería de proyectos administrable y canales de contacto de MC Estilo Industrial. La empresa se especializa en:

- 🪑 Muebles de hierro y madera
- 🚪 Portones personalizados
- 🛡️ Rejas de seguridad
- 🏗️ Estructuras metálicas

### Arquitectura

- **Frontend**: Aplicación de página única (SPA) en React con enrutamiento del lado del cliente
- **Backend**: API REST en Node.js/Express con vistas de administración en Handlebars
- **Base de Datos**: MySQL para gestión de usuarios y galería
- **Almacenamiento**: Cloudinary para imágenes de la galería (con fallback a almacenamiento local)
- **Email**: Integración con Resend para formulario de contacto

## ✨ Características

### Frontend (Cliente)
- **Diseño Responsive**: Adaptado a todos los dispositivos (móvil, tablet, desktop)
- **Modo Claro/Oscuro**: Sistema de temas con persistencia en localStorage
- **Galería Dinámica**:
  - Carga de imágenes desde API del backend
  - Filtros por categorías (Todos, Muebles, Portones, Rejas, Estructuras)
  - Animaciones suaves al cambiar filtros
  - Modal para visualización ampliada
  - Lazy loading de imágenes
- **SEO Optimizado**: Meta tags dinámicos para cada página
- **Timeline Interactivo**: Historia de la empresa con diseño visual atractivo
- **Formulario de Contacto**: 
  - Validación de campos
  - Integración con API backend para envío de emails
  - Feedback visual de estado

### Backend (Administración)
- **Panel de Administración**:
  - Sistema de autenticación con sesiones
  - Gestión completa de galería (CRUD)
  - Carga de imágenes a Cloudinary
  - Vista de navegación con enlace al sitio web
  - Tema claro/oscuro persistente
- **API REST**:
  - `/api/galeria` - Obtiene todas las imágenes de la galería
  - `/api/contacto` - Procesa formulario de contacto y envía emails
  - `/api/ping` - Endpoint de salud para keep-alive
- **Seguridad**:
  - Contraseñas hasheadas con bcrypt
  - Sesiones persistentes en MySQL
  - CORS configurado
  - Protección de rutas administrativas

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 14.x o superior
- MySQL 5.7 o superior
- npm o yarn
- (Opcional) Cuenta de Cloudinary para almacenamiento de imágenes
- (Opcional) API key de Resend para envío de emails

### Configuración de la Base de Datos

1. Crea una base de datos en MySQL:

```bash
mysql -u root -p
CREATE DATABASE mcei;
```

2. Importa el esquema:

```bash
mysql -u root -p mcei < database_setup.sql
```

Esto creará las tablas `users` y `galeria` con datos de ejemplo. El usuario admin por defecto es:
- **Usuario**: `admin`
- **Contraseña**: `admin` (¡cámbiala en producción!)

### Instalación

Opción 1 - **Ejecutar ambos servicios simultáneamente** (recomendado para desarrollo):

```bash
# Desde la raíz del proyecto
npm install
npm start
```

Esto instalará las dependencias del root y ejecutará frontend (puerto 3000) y backend (puerto 3001) concurrentemente.

Opción 2 - **Ejecutar servicios por separado**:

```bash
# Terminal 1 - Frontend
cd frontend
npm install
npm start

# Terminal 2 - Backend
cd backend
npm install
npm start
```

### Variables de Entorno (Backend)

Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```env
# Base de datos MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_DATABASE=mcei
DB_PORT=3306

# Sesión
SESSION_SECRET=tu_secreto_aleatorio_seguro

# Cloudinary (opcional - si no se configura, usa almacenamiento local)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Resend (opcional - para envío de emails)
RESEND_API_KEY=tu_resend_api_key
RESEND_FROM=onboarding@resend.dev

# Keep-alive (para producción)
KEEP_ALIVE_URL=https://tu-app.onrender.com/api/ping

# Entorno
NODE_ENV=development
```

## 📁 Estructura del Proyecto

```
MCEstiloIndustrial/
├── frontend/                    # Aplicación React (SPA)
│   ├── public/
│   │   └── img/galeria/        # Imágenes locales de galería (fallback)
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/         # Header, Nav, Footer, ThemeToggle
│   │   │   └── SEO.js          # Componente de SEO
│   │   ├── contexts/
│   │   │   └── ThemeContext.js # Gestión de tema claro/oscuro
│   │   ├── pages/              # HomePage, NosotrosPage, GaleriaPage, ContactoPage
│   │   ├── config/
│   │   │   └── api.js          # Configuración de URLs de API
│   │   └── App.js              # Router principal
│   └── package.json
│
├── backend/                     # API REST + Panel Admin
│   ├── src/
│   │   ├── bin/
│   │   │   └── www             # Punto de entrada del servidor
│   │   ├── models/             # Modelos de BD (galeria, users)
│   │   ├── routes/
│   │   │   ├── api.js          # Endpoints REST (/api/*)
│   │   │   ├── galeria.js      # Rutas admin de galería
│   │   │   └── login.js        # Autenticación
│   │   ├── views/              # Plantillas Handlebars (.hbs)
│   │   │   ├── layout.hbs      # Layout principal admin
│   │   │   ├── login.hbs       # Página de login
│   │   │   ├── galeria.hbs     # Lista de galería admin
│   │   │   ├── galeria_agregar.hbs
│   │   │   └── galeria_modificar.hbs
│   │   ├── utils/
│   │   │   └── renderEmailContacto.js  # Plantilla de email
│   │   └── app.js              # Configuración Express
│   ├── keepalive.js            # Script para evitar que Render duerma
│   └── package.json
│
├── database_setup.sql           # Esquema de base de datos
├── package.json                 # Scripts de conveniencia (root)
└── README.md
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.3** - Biblioteca de UI
- **React Router DOM 6** - Enrutamiento del lado del cliente
- **React Helmet Async** - Gestión de meta tags
- **Axios** - Cliente HTTP para llamadas a API
- **Vercel Analytics** - Analytics de producción
- **CSS3** - Estilos con variables CSS y animaciones
- **Intersection Observer API** - Lazy loading y animaciones

### Backend
- **Node.js** - Runtime de JavaScript
- **Express 5** - Framework web
- **MySQL2** - Driver de base de datos
- **bcrypt** - Hashing de contraseñas
- **express-session** - Gestión de sesiones
- **express-mysql-session** - Almacenamiento de sesiones en MySQL
- **Handlebars (hbs)** - Motor de plantillas para vistas admin
- **Cloudinary** - Almacenamiento en la nube de imágenes
- **Resend** - Servicio de envío de emails
- **CORS** - Manejo de peticiones cross-origin
- **express-fileupload** - Carga de archivos
- **dotenv** - Variables de entorno

## 📱 Páginas Frontend

### 🏠 Home (`/`)
- Hero section con presentación
- Beneficios destacados
- Proyectos destacados

### 👥 Nosotros (`/nosotros`)
- Historia visual con timeline
- Estadísticas de la empresa
- Perfil del fundador
- Valores corporativos
- Servicios ofrecidos

### 🖼️ Galería (`/galeria`)
- Carga dinámica desde API backend
- Sistema de filtros por categoría
- Grid responsive con animaciones
- Modal de visualización ampliada
- Lazy loading de imágenes

### 📧 Contacto (`/contacto`)
- Formulario integrado con API
- Validación de campos
- Información de ubicación
- Enlaces a redes sociales
- Envío de emails vía Resend

## 🔐 Panel de Administración (Backend)

Accede al panel admin en `http://localhost:3001/admin/login`

### Funcionalidades
- **Login**: `/admin/login` - Autenticación de usuarios
- **Galería**: `/admin/galeria` - Gestión completa (listar, agregar, modificar, eliminar)
- **Carga de Imágenes**: Soporte para Cloudinary o almacenamiento local
- **Tema**: Toggle claro/oscuro con persistencia en sesión
- **Logout**: Cierre de sesión seguro

### Credenciales por Defecto
- Usuario: `admin`
- Contraseña: `admin`

> ⚠️ **Importante**: Cambia estas credenciales en producción actualizando el hash bcrypt en la base de datos.

## 📦 Scripts Disponibles

### Raíz del Proyecto
- `npm start` - Ejecuta frontend y backend concurrentemente

### Frontend
- `npm start` - Inicia servidor de desarrollo (puerto 3000)
- `npm run build` - Construye para producción

### Backend
- `npm start` - Inicia servidor (puerto 3001)
- `npm run dev` - Inicia con nodemon (recarga automática)
- `npm run keepalive` - Ping único al endpoint `/api/ping`
- `npm run keepalive:loop` - Ping continuo cada 5 minutos

## 🌐 Deploy

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
```

Despliega la carpeta `build/` en Vercel, Netlify u otro hosting estático.

Configura variables de entorno:
- `REACT_APP_API_URL` - URL de tu backend en producción

### Backend (Render/Railway/Heroku)

1. Configura todas las variables de entorno en tu plataforma
2. Asegúrate de que la base de datos MySQL esté accesible
3. El backend escucha en el puerto definido por `process.env.PORT` o 3001

### Keep-alive (Evitar que Render duerma)

Render.com pone a dormir las aplicaciones gratuitas tras inactividad. Para evitarlo:

**Opción 1 - Cron Job de Render (Recomendado)**:
- Crea un Cron Job en Render
- Comando: `npm run keepalive:loop`
- Frecuencia: Cada 5-10 minutos

**Opción 2 - Servicio externo**:
- Configura [UptimeRobot](https://uptimerobot.com) o [cron-job.org](https://cron-job.org)
- Programa peticiones GET a `https://tu-app.onrender.com/api/ping`
- Frecuencia: Cada 5 minutos

## 🎨 Características de Diseño

- **Paleta de Colores**: Tonos industriales (grises, carbón, acentos madera)
- **Tipografía**: Roboto (sans-serif moderno)
- **Animaciones**: Transiciones suaves y naturales con CSS
- **Accesibilidad**: Contraste adecuado y navegación por teclado
- **Performance**: 
  - Lazy loading de imágenes
  - Code splitting en React
  - Optimización de recursos
  - Compresión de imágenes en Cloudinary

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt (factor 10)
- Sesiones seguras almacenadas en MySQL
- CORS configurado para dominios específicos
- Validación de entrada en formularios
- Protección de rutas administrativas
- Variables sensibles en `.env` (no versionadas)

## 🤝 Contribuciones

Este es un proyecto privado para MC Estilo Industrial. Para sugerencias o mejoras, contacta al equipo de desarrollo.

## 📄 Licencia

Copyright © 2025 MC Estilo Industrial. Todos los derechos reservados.

## 📞 Contacto

- **Sitio Web**: https://mcestiloindustrial.vercel.app
- **Instagram**: https://www.instagram.com/mc_estilo.industrial
- **Email**: matiascerolenii@gmail.com

---

Desarrollado con ❤️ para MC Estilo Industrial
