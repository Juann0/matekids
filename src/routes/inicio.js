const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    csrf = req.csrfToken();
    res.render('./app/index', { estilosLogin: true, titulo: 'Inicio de sesión', csrf });
});

router.post('/', async(req, res) => {
    console.log(req.body);
});

router.get('/reset', async (req, res) => {
    csrf = req.csrfToken();
    res.render('./app/reset', { estilosLogin: true, titulo: 'Olvidé contraseña', csrf });
});

module.exports = router;