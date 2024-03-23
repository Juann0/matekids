const express = require('express');
const router = express.Router();
const { noEstaLaSesion, estaLaSesion } = require('./../../helpers/auth');
const pool = require('./../../db');

router.get('/', estaLaSesion, async (req, res) => {
    csrf = req.csrfToken();
    var administrador = false;
    var estudiante = false;
    var docente = false;
    switch (req.user.id_rol) {
        case 3:
            administrador = true;
            break;
        case 1:
            docente = true;
            break;
        case 2:
            estudiante = true;
            break;
    }
    res.render('./app/home', { estilosLogin: false, titulo: 'Bienvenido(a) a MateKids', csrf, administrador, estudiante, docente, home: true, primer_nombre: req.user.primer_nombre });
});

router.get('/logout', estaLaSesion, async (req, res, next) => {
    req.logout(req.user, err => {
        if (err) return next(err);
        req.flash('correcto', 'Sesión cerrada correctamente');
        res.redirect('/');
    });
});

module.exports = router;