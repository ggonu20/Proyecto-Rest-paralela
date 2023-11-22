// app/controllers/authController.js
const jwt = require('jsonwebtoken');
const firebase = require('../utils/firebase');

exports.authenticateUser = (req, res) => {
  // Lógica para autenticar al usuario en Firebase
  const { user } = req;

  // Generar JWT
  const token = jwt.sign({ uid: user.uid }, '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', {
    expiresIn: '1h', // Puedes ajustar el tiempo de expiración según tus necesidades
  });

  res.json({ token });
};
