// Llamar librerias
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
// Llamar librerias

// Configurar el sevidor
const app = express();
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

// Archivos
app.use(express.static(path.join(__dirname, './public')));
// Archivos

// Rutas
app.use('/', require('./routes/inicio'));
// Rutas

app.listen(app.get('port'), () => {
    console.log(`URL del servidor es http://127.0.0.1:${app.get('port')}`);
});