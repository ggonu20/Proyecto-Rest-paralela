// app.js
const express = require('express');
const session = require('express-session');
const initializePassport = require('./auth/autenticacion');
const passport = require('passport');
const firebaseApp = require('./config/firebaseConfig');
const indexRoutes = require('./routes/index');
const ejs = require('ejs');
const path = require('path');
const reservasRoutes = require('./routes/reservas');
const salasRoutes = require('./routes/salas');
const authRoutes = require('./routes/auth');
const Middleware = require('./auth/autenticacionmiddleware');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3300;

// Middleware para procesar datos JSON
app.use(express.json());

// Configuración de express-session con la cadena secreta generada
app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
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

//Ruta protegida
app.get('/perfil', Middleware.isAuthenticated, (req, res) => {
  // Si llegamos aquí, significa que el usuario está autenticado
  res.send('Bienvenido a tu perfil');
});

// Rutas
app.use('/api/salas', Middleware.isAuthenticated, salasRoutes);
app.use('/auth', authRoutes);
app.use('/api', Middleware.isAuthenticated, reservasRoutes);
app.use('/', indexRoutes);

app.listen(port, () => {
  console.log(`El servidor está escuchando en http://localhost:${port}`);
});