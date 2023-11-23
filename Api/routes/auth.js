// auth.js
const express = require('express');
const passport = require('passport');
const initializePassport = require('../auth/autenticacion');
const router = express.Router();

// Obtén la instancia de Passport devuelta por initializePassport
const autenticacionMiddleware = initializePassport();
router.use(autenticacionMiddleware.initialize());

// Ruta para iniciar sesión con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de redireccionamiento después de la autenticación de Google
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Agrega un mensaje a la URL de redirección
    const mensaje = encodeURIComponent('¡Inicio de sesión exitoso!');
    res.redirect(`/?mensaje=${mensaje}`);
    console.log("el code es: ",req.query.code);
  }
);

module.exports = router;



