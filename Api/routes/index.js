// routes/index.js
const express = require('express');
const router = express.Router();

// Ruta principal
router.get('/', (req, res) => {
  // Puedes verificar si el usuario está autenticado
  console.log(req.isAuthenticated());

  if (req.isAuthenticated()) {
    // Si está autenticado, puedes acceder al objeto del usuario (req.user)
    const mensaje = req.query.mensaje || '';  // Obtén el mensaje de la URL
    console.log(req.session); // Imprime la información de la sesión
    res.render('index', { user: req.user, mensaje });
  } else {
    // Si no está autenticado, puedes mostrar un enlace para iniciar sesión con Google
    res.render('login');
  }
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;




