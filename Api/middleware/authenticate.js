// app/middleware/authenticate.js
const admin = require('../utils/firebase');

module.exports = async (req, res, next) => {
  const idToken = req.header('Authorization');

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
