// routes/index.js
const express = require('express');
const router = express.Router();

// Ruta principal
router.get('/', (req, res) => {
  // Puedes verificar si el usuario está autenticado
  if (req.isAuthenticated()) {
    // Si está autenticado, puedes acceder al objeto del usuario (req.user)
    res.send(`Bienvenido, ${req.user.displayName}! <a href="/logout">Cerrar sesión</a>`);
  } else {
    // Si no está autenticado, puedes mostrar un enlace para iniciar sesión con Google
    res.send('<a href="/auth/google">Iniciar sesión con Google</a>');
  }
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;