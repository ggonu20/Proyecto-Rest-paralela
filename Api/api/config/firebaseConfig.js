const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://apirest-oauth-default-rtdb.firebaseio.com"
});


console.log('Firebase iniciado');

module.exports = admin;
