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
// Llamar librerias

// Base de datos
const { database } = require('./keys.js');
// Base de datos

// Configurar el sevidor
const app = express();
app.use(compression());
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
    store: new MySQLStore(database),
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

//Variables globales
app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
});

// Archivos
app.use(express.static(path.join(__dirname, './public')));
// Archivos

// Rutas
app.use('/', require('./routes/inicio'));
// Rutas

app.use((req, res) => {
    res.status(404).redirect('/404')
});

// //No caché
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});


app.listen(app.get('port'), () => {
    console.log(`URL del servidor es http://127.0.0.1:${app.get('port')}`);
});