// app/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/authenticate', authenticate, authController.authenticateUser);

module.exports = router;
