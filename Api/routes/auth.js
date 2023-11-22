// routes/auth.js
const express = require('express');
const passport = require('passport');

const router = express.Router();

// Inicializar Passport si aún no está inicializado
if (!passport._initialized) {
  router.use(passport.initialize());
}

// Ruta para iniciar sesión con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de redireccionamiento después de la autenticación de Google
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirigir después de la autenticación exitosa
    res.redirect('/');
  }
);

module.exports = router;