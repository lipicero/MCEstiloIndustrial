var express = require('express');
var router = express.Router();
var galeriaModel = require('../models/galeria');
var cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const { Resend } = require('resend');
const renderEmailContacto = require('../utils/renderEmailContacto');


// Endpoint para devolver la galería de imágenes
router.get('/galeria', async function (req, res, next) {
    try {
        let galeria = await galeriaModel.getGaleria();

        const baseUrl = req.protocol + '://' + req.get('host');
        galeria = galeria.map(item => {
            if (item.img_id && typeof item.img_id === 'string' && item.img_id.trim() !== '') {
                const imagen = cloudinary.url(item.img_id);
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
        res.status(500).json({ error: true, message: 'No se pudo obtener la galería' });
    }
});

router.post('/contacto', async (req, res) => {
    try {
        const { name, email, message, phone, _language } = req.body;
        const lang = _language || 'es';
        const fecha_hora = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
        let attachments = [];
        let adminData;
        let adminError;
        const html = renderEmailContacto({
            nombre: name,
            email,
            mensaje: message,
            fecha_hora,
            subject: 'MC Estilo Industrial - Contacto desde la web'
        , telefono: phone
        , lang
        });

        const mail = {
            to: 'matiascerolenii@gmail.com',
            subject: 'Contacto desde la web',
            html,
            text: `Mensaje recibido desde el formulario de contacto.\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || ''}\nFecha: ${fecha_hora}\n\nAsunto: Contacto desde la web\n\nMensaje:\n${message}`
        };

        if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM) {
            console.error('Resend API key or FROM address not configured. Skipping sending emails.');
            // The client will still get success for the form; admin can check logs
        } else {
            const resend = new Resend(process.env.RESEND_API_KEY);
            const adminResult = await resend.emails.send({
                from: process.env.RESEND_FROM,
                to: mail.to,
                subject: mail.subject,
                text: mail.text,
                html: mail.html,
                headers: { 'Content-Language': lang, 'Reply-To': email },
                attachments
            });
            adminData = adminResult.data;
            adminError = adminResult.error;
            if (adminError) {
                console.error('Error sending admin email (Resend):', JSON.stringify(adminError));
            } else {
                console.log('Admin email queued (Resend id):', adminData?.id || adminData);
            }
        }


        const debug = process.env.NODE_ENV !== 'production'
            ? { adminId: adminData?.id, adminError }
            : undefined;
        res.status(201).json({
            error: false,
            message: 'Mensaje enviado',
            debug
        });
    } catch (error) {
        console.error('Error enviando email:', error);
        res.status(500).json({
            error: true,
            message: 'Error al enviar el mensaje'
        });
    }
});

module.exports = router;
