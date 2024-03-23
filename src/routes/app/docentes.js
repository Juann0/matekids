const express = require('express');
const router = express.Router();
const { noEstaLaSesion, estaLaSesion } = require('./../../helpers/auth');
const pool = require('./../../db');

router.get('/docentes', estaLaSesion, async (req, res) => {
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
    res.render('./app/admin/docentes/index', { estilosLogin: false, titulo: 'Módulo de docentes', csrf, administrador, estudiante, docente, home: true });
});

module.exports = router;