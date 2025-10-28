require("dotenv").config({ silent: true });
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000"];
console.log("Allowed origins:", allowedOrigins);
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true para 465, false para otros puertos
  requireTLS: true, // fuerza STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  // Opciones de timeout ajustadas
  connectionTimeout: 60000, // 60 segundos
  greetingTimeout: 30000, // 30 segundos
  socketTimeout: 60000, // 60 segundos
  debug: true,
});

// Cache simple para evitar emails duplicados (últimos 30 segundos)
const sentEmails = new Map();

// Rutas básicas
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido al backend de MC Estilo Industrial" });
});

app.get("/api/test", (req, res) => {
  res.json({ data: "Esta es una respuesta de prueba del backend" });
});

app.post(
  "/api/contact",
  multer().none(),
  [
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("email").isEmail().withMessage("Email inválido"),
    body("message").notEmpty().withMessage("El mensaje es obligatorio"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;
    const key = `${email}-${message}`;
    const now = Date.now();

    // Verificar si se envió recientemente (últimos 30 segundos)
    if (sentEmails.has(key) && now - sentEmails.get(key) < 30000) {
      return res
        .status(429)
        .json({ message: "Mensaje ya enviado recientemente" });
    }

    console.log("Mensaje de contacto:", { name, email, message });

    try {
      console.log("Intentando enviar email a:", process.env.EMAIL_TO);
      // Enviar email
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: `Nuevo mensaje de contacto - MC Estilo Industrial`,
        html: `
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nuevo mensaje de contacto</title>
            <style>
              body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
              .header { background-color: #a67c52; color: #ffffff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .header h1 { margin: 0; font-size: 24px; }
              .content { padding: 20px; }
              .field { margin-bottom: 15px; }
              .field label { font-weight: bold; color: #333; }
              .field p { margin: 5px 0; padding: 10px; background-color: #f9f9f9; border-left: 4px solid #a67c52; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #eee; margin-top: 20px; }
              .footer p { margin: 5px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>MC Estilo Industrial</h1>
                <p>Nuevo mensaje de contacto</p>
              </div>
              <div class="content">
                <p>Hola,</p>
                <p>Has recibido un nuevo mensaje a través del formulario de contacto de tu sitio web.</p>
                
                <div class="field">
                  <label>Nombre:</label>
                  <p>${name}</p>
                </div>
                
                <div class="field">
                  <label>Email:</label>
                  <p><a href="mailto:${email}">${email}</a></p>
                </div>
                
                <div class="field">
                  <label>Mensaje:</label>
                  <p>${message.replace(/\n/g, "<br>")}</p>
                </div>
                
                <p>Fecha y hora: ${new Date().toLocaleString("es-ES")}</p>
                
                <p>Para responder, simplemente haz clic en "Responder" en este email.</p>
              </div>
              <div class="footer">
                <p>Este email fue enviado desde el formulario de contacto de MC Estilo Industrial.</p>
                <p>&copy; 2025 MC Estilo Industrial. Todos los derechos reservados.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      console.log("Email enviado exitosamente:", info.messageId);

      // Agregar a cache
      sentEmails.set(key, now);

      // Limpiar cache antigua
      for (const [k, time] of sentEmails) {
        if (now - time > 30000) sentEmails.delete(k);
      }

      res.json({ message: "Mensaje enviado con éxito" });
    } catch (error) {
      console.error("Error enviando email:", error.message);
      console.error("Detalles del error:", error);
      res.status(500).json({ message: "Error al enviar el mensaje" });
    }
  }
);

const imagenes = [
  {
    src: "img/galeria/img1.webp",
    categoria: "estructuras",
    descripcion: "Posa Botella",
  },
  {
    src: "img/galeria/img2.webp",
    categoria: "rejas",
    descripcion: "Rejas metálicas negras, funcionales",
  },
  {
    src: "img/galeria/img3.webp",
    categoria: "estructuras",
    descripcion: "Perchero 50x22cm",
  },
  {
    src: "img/galeria/img4.webp",
    categoria: "muebles",
    descripcion: "Mostrador de hierro y madera",
  },
  {
    src: "img/galeria/img5.webp",
    categoria: "estructuras",
    descripcion: "Puerta corrediza rústica doble",
  },
  {
    src: "img/galeria/img6.jpg",
    categoria: "estructuras",
    descripcion: "Puerta corredera rústica quemada",
  },
  {
    src: "img/galeria/img7.webp",
    categoria: "muebles",
    descripcion: "Consola estrecha madera y metal",
  },
  {
    src: "img/galeria/img8.webp",
    categoria: "estructuras",
    descripcion: "Estufa empotrada con reja",
  },
  {
    src: "img/galeria/img9.webp",
    categoria: "muebles",
    descripcion: "Escritorio modular madera y metal",
  },
  {
    src: "img/galeria/img10.webp",
    categoria: "muebles",
    descripcion: "Estantería modular madera y estructura metálica",
  },
  {
    src: "img/galeria/img11.webp",
    categoria: "rejas",
    descripcion: "Porche cerrado con malla metálica",
  },
  {
    src: "img/galeria/img12.webp",
    categoria: "muebles",
    descripcion: "Mesa auxiliar hierro y madera",
  },
  {
    src: "img/galeria/img13.webp",
    categoria: "portones",
    descripcion: "Portón doble hoja, caño estructural y malla",
  },
  {
    src: "img/galeria/img14.jpg",
    categoria: "muebles",
    descripcion: "Estante de madera y metal elegante",
  },
  {
    src: "img/galeria/img15.jpg",
    categoria: "muebles",
    descripcion: "Estante de exhibición de madera y metal grande",
  },
  {
    src: "img/galeria/img16.jpg",
    categoria: "muebles",
    descripcion: "Rack TV estilo industrial moderno",
  },
  {
    src: "img/galeria/img17.jpg",
    categoria: "estructuras",
    descripcion: "Escalera de metal y madera de estilo moderno",
  },
  {
    src: "img/galeria/img18.jpg",
    categoria: "muebles",
    descripcion: "Juego de tres estantes de madera y metal escalonados",
  },
  {
    src: "img/galeria/img19.jpg",
    categoria: "muebles",
    descripcion: "Mesa ratona de madera y metal geométrica",
  },
  {
    src: "img/galeria/img20.jpg",
    categoria: "muebles",
    descripcion: "Soporte de plantas",
  },
  {
    src: "img/galeria/img21.jpg",
    categoria: "muebles",
    descripcion: "Estante de madera y metal",
  },
];

app.get("/api/galeria", (req, res) => {
  res.json(imagenes);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto: ${PORT}`);
});
