const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('./app/index', { estilosLogin: true, titulo: 'Inicio de sesión' });
});

module.exports = router;