// app/utils/firebase.js
const admin = require('firebase-admin');

const serviceAccount = require('./path/to/your/firebase/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Add other Firebase configurations if needed
});

module.exports = admin;
