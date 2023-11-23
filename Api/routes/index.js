// routes/index.js
const express = require('express');
const router = express.Router();

// Ruta principal
router.get('/', (req, res) => {
  console.log('User:', req.user);
  console.log('Authenticated:', req.isAuthenticated());

  if (req.isAuthenticated()) {
    const mensaje = req.query.mensaje || '';
    console.log('Session:', req.session);
    res.render('index', { user: req.user, mensaje });
  } else {
    console.log('Not authenticated!');
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





