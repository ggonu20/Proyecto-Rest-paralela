// app.js
const express = require('express');
const session = require('express-session');
const initializePassport = require('./auth/autenticacion');
const passport = require('passport');
const firebaseApp = require('./firebaseConfig');
const indexRoutes = require('./routes/index');
const ejs = require('ejs');
const path = require('path');
const reservasRoutes = require('./routes/reservas');
const salasRoutes = require('./routes/salas');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

// Middleware para procesar datos JSON
app.use(express.json());

// Configuración de express-session con la cadena secreta generada
app.use(
  session({
    secret: '17e9d8d4e1061540b689b49f0d81ef5e00fe77d29c1b56b301cbf4c8722e3de9',
    resave: false,
    saveUninitialized: true,
  })
);

// Inicializar Passport
const autenticacionMiddleware = initializePassport();
app.use(autenticacionMiddleware.initialize());
app.use(passport.session()); // Agrega el uso de passport.session() después de initialize()

// Configurar el motor de vistas EJS y la carpeta de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ajusta la ruta según tu estructura de carpetas

// Rutas
app.use('/api/salas', salasRoutes);
app.use('/auth', authRoutes);
app.use('/api', reservasRoutes);
app.use('/', indexRoutes);

app.listen(port, () => {
  console.log(`El servidor está escuchando en http://localhost:${port}`);
});












