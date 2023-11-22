// app.js
const express = require('express');
const salasRoutes = require('./routes/salas');
const authRoutes = require('./routes/auth');
const autenticacionMiddleware = require('./auth/autenticacion'); // Importa passport desde autenticacion

const app = express();
const port = 3000;

// Middleware para procesar datos JSON
app.use(express.json());

// Inicializar Passport
app.use(autenticacionMiddleware.initialize());

// Middleware de autenticación personalizado (si lo necesitas)
// No es necesario usar app.use() aquí, ya que passport.authenticate() se usará en tus rutas de autenticación
// Solo necesitas asegurarte de que initialize() se llame antes de las rutas de autenticación.

// Rutas
app.use('/api/salas', salasRoutes);
app.use('/auth', authRoutes);

// Ruta para la raíz
app.get('/', (req, res) => {
  // Verifica si el usuario está autenticado
  if (req.isAuthenticated()) {
    // Si está autenticado, muestra un mensaje de bienvenida personalizado
    res.send(`¡Bienvenido, ${req.user.displayName}! <a href="/auth/logout">Cerrar sesión</a>`);
  } else {
    // Si no está autenticado, muestra un mensaje de bienvenida general
    res.send('¡Bienvenido a mi aplicación! <a href="/auth/google">Iniciar sesión con Google</a>');
  }
});

app.listen(port, () => {
  console.log(`El servidor está escuchando en http://localhost:${port}`);
});





