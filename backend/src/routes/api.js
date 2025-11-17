var express = require('express');
var router = express.Router();
var galeriaModel = require('../models/galeria');
var cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer');


// Endpoint para devolver la galería de imágenes
router.get('/galeria', async function (req, res, next) {
    try {
        let galeria = await galeriaModel.getGaleria();

        const baseUrl = req.protocol + '://' + req.get('host');
        galeria = galeria.map(item => {
            if (item.img_id && typeof item.img_id === 'string' && item.img_id.trim() !== '') {
                const imagen = cloudinary.url(item.img_id, {
                    width: 960,
                    height: 200,
                    crop: 'fill'
                });
                return {
                    ...item,
                    src: imagen
                }
            } else if (item.file) {
                return {
                    ...item,
                    src: baseUrl + '/img/galeria/' + item.file
                }
            } else {
                return {
                    ...item,
                    src: ''
                }
            }
        });
        res.json(galeria);
    } catch (error) {
        console.error('Error GET /api/galeria:', error);
        res.status(500).json({error: true, message: 'No se pudo obtener la galería'});
    }
});

router.post('/contacto', async (req, res) => {
    const mail = {
        to: 'matiascerolenii@gmail.com',
        subject: 'Contacto desde la web',
        html: `${req.body.nombre} se contacto a traves del formulario de contacto y quiere más información a este correo: ${req.body.email} <br> Además, hizo el siguiente comentario: ${req.body.mensaje} <br> Su teléfono es: ${req.body.telefono}`
    };

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transport.sendMail(mail);

    res.status(201).json({
        error: false,
        message: 'Mensaje enviado'
    });
});

module.exports = router;
