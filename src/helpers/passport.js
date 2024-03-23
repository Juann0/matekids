const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./../db');
const passwordHelper = require('./password');

passport.use('local.iniciar', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, usuario, password, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    if (req.body.email != "") {
        if (rows.length > 0) {
            const user = rows[0];
            const validPassword = await passwordHelper.matchPassword(password, user.password);
            if (validPassword) {
                done(null, user);
            } else {
                done(null, false, req.flash('error', 'Usuario o contraseña incorrectos'));
            }
        } else {
            done(null, false, req.flash('error', 'Usuario o contraseña incorrectos'));
        }
    } else {
        done(null, false, req.flash('error', 'Usuario vacio'));
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    const rows = await pool.query('SELECT usuarios.id_user, usuarios.id_grado, usuarios.id_rol, usuarios.usuario, usuarios.primer_nombre, usuarios.segundo_nombre, usuarios.primer_apellido, usuarios.segundo_apellido, usuarios.fecha_registro FROM usuarios WHERE usuarios.usuario = ?', [user.usuario]);
    done(null, rows[0]);
});