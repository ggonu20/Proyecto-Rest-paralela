const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Agrega otras configuraciones de Firebase si es necesario
});

console.log('Firebase iniciado');

module.exports = admin;
