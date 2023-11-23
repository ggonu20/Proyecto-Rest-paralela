const express = require('express');
const indexController = require('../controller/indexController');
const router = express.Router();

// Ruta principal
router.get('/',indexController.login);
  
// Ruta para cerrar sesión
router.get('/logout',indexController.logout);
  


module.exports = router;
