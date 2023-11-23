const firebaseAdmin = require('../config/firebaseConfig');

module.exports = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization;
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'No autorizado' });
  }
};
