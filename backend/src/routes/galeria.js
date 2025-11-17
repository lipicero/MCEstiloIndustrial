var express = require('express');
var router = express.Router();
var util = require('util');
var path = require('path');
var galeriaModel = require('../models/galeria');
var cloudinary = require('cloudinary').v2;

const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async function (req, res, next) {
    try {
        var galeria = await galeriaModel.getGaleria();
        galeria = galeria.map(item => {
            if (item.img_id && typeof item.img_id === 'string' && item.img_id.trim() !== '') {
                const imagen = cloudinary.image(item.img_id, {
                    width: 100,
                    height: 100,
                    crop: 'fill'
                });
                return { ...item, imagen };
            } else if (item.file) {
                const imagen = '<img src="/img/galeria/' + item.file + '" width="100" height="100" />';
                return { ...item, imagen };
            } else {
                return { ...item, imagen: '' };
            }
        });

        res.render('galeria', {
            layout: 'layout',
            usuario: req.session.nombre,
            galeria
        });
    } catch (error) {
        console.error('Error en GET /galeria:', error);
        res.render('galeria', { layout: 'layout', usuario: req.session.nombre, galeria: [], error: true, message: 'No se pudo cargar la galería' });
    }
});

router.get('/agregar', (req, res, next) => {
    res.render('galeria_agregar', {
        layout: 'layout'
    });
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (!req.body.descripcion || req.body.descripcion.trim() === "" || 
            !req.body.categoria || req.body.categoria.trim() === "") {
            return res.render('galeria_agregar', {
                layout: 'layout',
                error: true,
                message: 'La descripción y categoría son obligatorias'
            });
        }

        if (!req.files || !req.files.imagen) {
            return res.render('galeria_agregar', {
                layout: 'layout',
                error: true,
                message: 'Debes seleccionar una imagen'
            });
        }

        let imagen = req.files.imagen;
        let img_id = (await uploader(imagen.tempFilePath)).public_id;

        await galeriaModel.insertGaleria({
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            img_id,
            file: null
        });
        
        res.redirect('/galeria');
    } catch (error) {
        console.log(error);
        res.render('galeria_agregar', {
            layout: 'layout',
            error: true,
            message: 'No se pudo agregar la imagen a la galería'
        });
    }
});

router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;

    let item = await galeriaModel.getGaleriaById(id);
    if (item.img_id && typeof item.img_id === 'string' && item.img_id.trim() !== '') {
        await destroy(item.img_id);
    }

    await galeriaModel.deleteGaleriaById(id);
    res.redirect('/galeria')
});

router.get('/modificar/:id', async (req, res, next) => {
    let id = req.params.id;
    let item = await galeriaModel.getGaleriaById(id);
    res.render('galeria_modificar', {
        layout: 'layout',
        item
    });
});

// Import a local file to Cloudinary and update the DB
router.post('/import/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        let item = await galeriaModel.getGaleriaById(id);
        if (!item || !item.file) {
            req.flash && req.flash('error', 'No hay archivo local para importar');
            return res.redirect('/galeria');
        }
        const localPath = path.join(__dirname, '..', '..', 'public', 'img', 'galeria', item.file);
        const result = await uploader(localPath);
        // Update DB with new img_id while preserving file if you want
        await galeriaModel.modificarGaleriaById([{ img_id: result.public_id }, id]);
        res.redirect('/galeria');
    } catch (error) {
        console.error('Error importing to cloudinary:', error);
        res.redirect('/galeria');
    }
});

router.post('/modificar', async (req, res, next) => {
    try {
        let img_id = req.body.img_original;
        let borrar_img_vieja = false;

        // Si marcó eliminar imagen
        if (req.body.img_delete === "1") {
            borrar_img_vieja = true;
            img_id = null;
        } 
        // Si subió una imagen nueva
        else if (req.files && Object.keys(req.files).length > 0) {
            let imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
            borrar_img_vieja = true;
        }

        // Eliminar la imagen anterior de Cloudinary si es necesario
        if (borrar_img_vieja && req.body.img_original && 
            typeof req.body.img_original === 'string' && 
            req.body.img_original.trim() !== '') {
            await destroy(req.body.img_original);
        }

        let obj = {
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            img_id,
            file: null
        };

        await galeriaModel.modificarGaleriaById([obj, req.body.id]);
        res.redirect('/galeria');
    } catch (error) {
        console.log(error);
        let item = await galeriaModel.getGaleriaById(req.body.id);
        res.render('galeria_modificar', {
            layout: 'layout',
            error: true,
            message: 'No se pudo modificar la imagen',
            item
        });
    }
});

module.exports = router;
