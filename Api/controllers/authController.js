const firebaseAdmin = require('firebase-admin');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  // Implementa la lógica de registro de usuario con Firebase Authentication
  // ...
  res.json({ message: 'Usuario registrado exitosamente' });
};

exports.signin = async (req, res) => {
  try {
    const { idToken } = req.body;

    // Verifica el token de Google con Firebase
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Crea un token de sesión utilizando JWT
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
};

exports.protectedRoute = (req, res) => {
  res.json({ message: 'Ruta protegida alcanzada' });
};
