// Llamar librerias
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
var csrf = require('csurf');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var compression = require('compression')
const { noEstaLaSesion, estaLaSesion } = require('./helpers/auth');
const helmet = require('helmet');
// Llamar librerias

// Base de datos
// const { database } = require('./keys.js');
// Base de datos

// Configurar el sevidor
const app = express();
app.use(compression());
app.set('trust proxy', 1);
require('./helpers/passport');
app.set('port', '4000');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.set('views'), 'layouts'),
    partialsDir: path.join(app.set('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configurar el sevidor

app.use(session({
    secret: 'mateKids=@@@#App',
    resave: false,
    saveUninitialized: true,
    // store: new MySQLStore(database),
}));

// Servidor
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));
// Servidor
app.use(helmet({
    contentSecurityPolicy: false,
    frameguard: {
        action: 'deny'
    },
    noCache: true
}));

// Variables globales
app.use((req, res, next) => {
    app.locals.user = req.user;
    app.locals.vacio = req.flash('vacio');
    app.locals.error = req.flash('error');
    app.locals.correcto = req.flash('correcto');
    next();
});

// Archivos
app.use(express.static(path.join(__dirname, './public')));
// Archivos

// Desactivar el caché
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

// Rutas
app.use('/', require('./routes/inicio'));
app.use('/app', require('./routes/app/index'));
app.use('/app/admin', require('./routes/app/docentes'));
// Rutas

app.use((req, res) => {
    res.status(404).redirect('/404')
});

app.listen(app.get('port'), () => {
    console.log(`URL del servidor es http://127.0.0.1:${app.get('port')}`);
});