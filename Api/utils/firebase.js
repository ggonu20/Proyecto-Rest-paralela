// app/utils/firebase.js
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Add other Firebase configurations if needed
});

console.log(`firebase iniciado`);
module.exports = admin;
