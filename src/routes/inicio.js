const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('./app/index', { estilosLogin: true, titulo: 'Inicio de sesión' });
});

router.get('/reset', async (req, res) => {
    res.render('./app/reset', { estilosLogin: true, titulo: 'Olvide contraseña' });
});

module.exports = router;