const express = require('express');
const authController = require('../controllers/authController');
const firebaseAuthMiddleware = require('../middlewares/firebaseAuthMiddleware');

const router = express.Router();

// Rutas de autenticación
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

// Ruta protegida que utiliza el middleware de autenticación de Firebase
router.get('/protected', firebaseAuthMiddleware, authController.protectedRoute);

module.exports = router;
