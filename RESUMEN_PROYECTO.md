# 📊 Resumen: MC Estilo Industrial

## 🎯 Descripción General

**MC Estilo Industrial** es una aplicación web **full-stack** desarrollada para una empresa especializada en **fabricación de muebles y estructuras en hierro y madera con estilo industrial**. Se trata de un sitio web corporativo con panel administrativo integrado.

**Sitio en producción:** https://mcestiloindustrial.vercel.app

---

## 🏗️ Arquitectura del Proyecto

```
Frontend (React SPA)     ↔     Backend (Node.js/Express)     ↔     MySQL Database
   :3000                           :3001                          Gestión de datos
```

### Componentes Principales:

| Componente | Descripción |
|-----------|------------|
| **Frontend** | Aplicación React con enrutamiento del lado del cliente (SPA) |
| **Backend** | API REST en Express con panel de administración en Handlebars |
| **BD** | MySQL para usuarios y galería de proyectos |
| **Storage** | Cloudinary para imágenes + fallback a almacenamiento local |
| **Email** | Resend para envío de formularios de contacto |

---

## 💻 Stack Tecnológico

### **Frontend (43.5% JavaScript, 39.9% CSS, 11.7% Handlebars, 4.9% HTML)**

```
✓ React 18.3                 → UI moderna con hooks
✓ React Router DOM 6         → Enrutamiento SPA
✓ React Helmet Async         → Gestión de meta tags SEO
✓ Axios                      → Cliente HTTP
✓ CSS3 Variables             → Temas dinámicos (light/dark)
✓ Intersection Observer API  → Lazy loading y animaciones
✓ Vercel Analytics           → Analíticas de producción
```

### **Backend**

```
✓ Node.js + Express 5        → Framework web robusto
✓ MySQL2                     → Driver de base de datos
✓ Handlebars (hbs)           → Motor de plantillas admin
✓ bcrypt                     → Hashing seguro de contraseñas
✓ express-session            → Gestión de sesiones
✓ express-mysql-session      → Persistencia en BD
✓ Cloudinary                 → Almacenamiento en la nube
✓ Resend                     → Servicio de emails
✓ CORS                       → Peticiones cross-origin
✓ express-fileupload         → Carga de archivos
✓ dotenv                     → Variables de entorno
```

---

## 🎨 Funcionalidades Principales

### **Frontend - Páginas Públicas**

#### 🏠 **Home** (`/`)
- Hero section con presentación de la empresa
- Sección de beneficios destacados (4 tarjetas)
- Proyectos destacados

#### 👥 **Nosotros** (`/nosotros`)
- Timeline interactivo de la historia
- Estadísticas de la empresa
- Perfil del fundador
- Valores corporativos
- Servicios ofrecidos

#### 🖼️ **Galería** (`/galeria`)
- **Carga dinámica** desde API backend
- **Sistema de filtros** por categoría (Todos, Muebles, Portones, Rejas, Estructuras)
- **Grid responsive** con animaciones suaves
- **Modal** para visualización ampliada de imágenes
- **Lazy loading** para optimización de performance

#### 📧 **Contacto** (`/contacto`)
- Formulario integrado con validación
- Envío de emails vía Resend
- Información de ubicación
- Enlaces a redes sociales (Instagram)

### **Características de UX**

✨ **Modo Claro/Oscuro** con persistencia en localStorage (desktop) o preferencias del sistema (mobile)
📱 **Diseño Responsive** adaptado a móvil, tablet y desktop
♿ **Accesibilidad** con contraste adecuado y navegación por teclado
⚡ **Performance**: Code splitting, lazy loading, optimización de Cloudinary

---

## 🔐 Panel de Administración (Backend)

### **Acceso:** `http://localhost:3001/admin/login`

### **Credenciales por Defecto:**
```
Usuario: admin
Contraseña: admin
```

### **Funcionalidades:**

| Función | Descripción |
|---------|------------|
| **Login** | Autenticación segura con bcrypt |
| **Galería CRUD** | Listar, agregar, modificar, eliminar imágenes |
| **Carga de Imágenes** | Soporta Cloudinary o almacenamiento local |
| **Tema** | Toggle claro/oscuro con persistencia en sesión |
| **Logout** | Cierre de sesión seguro |

---

## 📡 API REST (Backend)

### **Endpoints Públicos:**

```
GET /api/galeria              → Obtiene todas las imágenes de la galería
POST /api/contacto            → Procesa formulario de contacto y envía emails
GET /api/ping                 → Health check (keep-alive para Render)
```

### **Endpoints Administrativos:**

```
GET /login                    → Página de login
POST /login                   → Autenticación
GET /admin/galeria            → Lista de galería admin
GET /admin/galeria/agregar    → Formulario para agregar imagen
POST /admin/galeria/agregar   → Guardar nueva imagen
GET /admin/galeria/modificar/:id → Formulario de edición
POST /admin/galeria/modificar/:id → Actualizar imagen
GET /admin/galeria/eliminar/:id   → Eliminar imagen
GET /login/logout             → Cierre de sesión
```

---

## 🔒 Seguridad

```
✓ Contraseñas hasheadas con bcrypt (factor 10)
✓ Sesiones seguras almacenadas en MySQL
✓ CORS configurado para dominios específicos
✓ Validación de entrada en formularios
✓ Protección de rutas administrativas
✓ Variables sensibles en .env (no versionadas)
```

---

## 🚀 Cómo Funciona

### **1. Flujo de Usuario Visitante**

```
Usuario accede a https://mcestiloindustrial.vercel.app
    ↓
Frontend (React) se ejecuta en el navegador
    ↓
Usuario navega por Home → Nosotros → Galería → Contacto
    ↓
En Galería: Frontend hace GET a /api/galeria
    ↓
Backend retorna imágenes de MySQL con URLs de Cloudinary
    ↓
Frontend renderiza grid con lazy loading
    ↓
Usuario completa formulario de contacto
    ↓
POST a /api/contacto → Backend envía email vía Resend
```

### **2. Flujo de Administrador**

```
Admin accede a http://localhost:3001/login
    ↓
Ingresa credenciales (usuario/contraseña hasheada)
    ↓
Backend valida contra MySQL con bcrypt
    ↓
Crea sesión segura en MySQL
    ↓
Admin ve galería con miniaturas
    ↓
Admin puede:
  • Agregar imagen → Upload a Cloudinary + registro en BD
  • Modificar → Actualiza datos en MySQL
  • Eliminar → Borra de Cloudinary y BD
```

---

## 📁 Estructura de Carpetas

```
MCEstiloIndustrial/
├── frontend/                      # SPA React
│   ├── public/img/galeria/       # Imágenes locales (fallback)
│   ├── src/
│   │   ├── components/           # Header, Nav, Footer, SEO, ThemeToggle
│   │   ├── contexts/             # ThemeContext (light/dark)
│   │   ├── pages/                # HomePage, NosotrosPage, GaleriaPage, ContactoPage
│   │   ├── styles/               # CSS modularizado
│   │   ├── config/api.js         # Configuración de URLs
│   │   └── App.js                # Router principal
│   └── package.json
│
├── backend/                       # API REST + Admin
│   ├── src/
│   │   ├── bin/www               # Punto de entrada (puerto 3001)
│   │   ├── models/               # Modelos DB (galeria, users)
│   │   ├── routes/               # API, galeria, login
│   │   ├── views/                # Plantillas Handlebars (.hbs)
│   │   ├── utils/                # renderEmailContacto.js
│   │   └── app.js                # Configuración Express
│   ├── keepalive.js              # Script para evitar sleep en Render
│   └── package.json
│
├── database_setup.sql            # Esquema de BD
├── package.json                  # Scripts convenientes
└── README.md
```

---

## 🎯 Características Destacadas

### **Galería Inteligente**
- Sistema de filtros dinámicos
- Carga desde API backend
- Fallback a almacenamiento local si Cloudinary no está disponible
- Lazy loading automático con Intersection Observer
- Modal responsivo para visualización ampliada

### **Gestión de Temas**
- Paleta de colores industriales (grises, carbón, acentos en madera)
- **Tema claro**: Fondo blanco con acentos óxido/madera
- **Tema oscuro**: Fondo acero oscuro con acentos más brillantes
- **Adaptable**: Desktop usa localStorage, mobile usa preferencias del sistema

### **Emails Personalizados**
- Plantillas HTML profesionales
- Soporte multiidioma (es/en)
- Validación de campos
- Información de teléfono, fecha/hora y timezone (Argentina)

### **Keep-Alive para Render**
- Script automático que hace ping a `/api/ping`
- Evita que la aplicación se duerma en Render.com
- Ejecutable cada 5 minutos mediante cron job

---

## 🌐 Deploy

### **Frontend:** Vercel (production-ready)
```bash
npm run build
```

### **Backend:** Render, Railway, o Heroku
- Variables de entorno configurables
- MySQL debe estar accesible
- Keep-alive automático cada 5 minutos

---

## 📊 Resumen de Tecnologías

| Aspecto | Stack |
|--------|-------|
| **Frontend** | React 18 + React Router + CSS3 |
| **Backend** | Node.js + Express 5 + MySQL2 |
| **Autenticación** | bcrypt + express-session |
| **Almacenamiento** | Cloudinary (imágenes) + MySQL (datos) |
| **Email** | Resend API |
| **Vistas Admin** | Handlebars (hbs) |
| **Deploy** | Vercel (frontend) + Render (backend) |

---

**¡Proyecto robusto, escalable y listo para producción!** 🚀