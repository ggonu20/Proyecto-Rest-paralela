// auth/autenticacionmiddleware.js

const passport = require('./autenticacion'); // Importa el objeto Passport configurado

function isAuthenticated(req, res, next) {
  // Passport agrega la propiedad 'isAuthenticated' al objeto 'req'
  // Esta propiedad es verdadera si el usuario está autenticado
  if (req.isAuthenticated()) {
    return next(); // El usuario está autenticado, permitir el acceso a la ruta
  }

  // Si no está autenticado, redirigir a la página de inicio de sesión u otra página
  res.redirect('/');
}

module.exports = {
  isAuthenticated,
  // Otras funciones relacionadas con la autenticación si es necesario
};
