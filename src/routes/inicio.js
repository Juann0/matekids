const express = require('express');
const router = express.Router();
const { noEstaLaSesion, estaLaSesion } = require('./../helpers/auth');
const pool = require('./../db');
const passport = require('passport');

router.get('/', noEstaLaSesion, async (req, res) => {
    csrf = req.csrfToken();
    res.render('./app/index', { estilosLogin: true, titulo: 'Inicio de sesión', csrf });
});

router.post('/', noEstaLaSesion, async (req, res, next) => {
    try {
        const row = await pool.query('SELECT usuario, id_user FROM usuarios WHERE usuario = ?', [req.body.usuario]);
        if (req.body.usuario == "" || req.body.password == "") {
            req.flash('error', 'Campos vacios');
            return res.redirect('/');
        }
        if (row.length > 0) {
            if (req.body.usuario != "" && req.body.password != "") {
                passport.authenticate('local.iniciar', {
                    successRedirect: '/app',
                    failureRedirect: '/',
                    failureFlash: true
                })(req, res, next);
            } else {
                req.flash('error', 'Campos vacios');
                res.redirect('/');
            }
        } else {
            req.flash('error', 'Usuario o contraseña incorrectos');
            res.redirect('/');
        }
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/');
    }
});

router.get('/reset', noEstaLaSesion, async (req, res) => {
    csrf = req.csrfToken();
    res.render('./app/reset', { estilosLogin: true, titulo: 'Olvidé contraseña', csrf });
});

module.exports = router;