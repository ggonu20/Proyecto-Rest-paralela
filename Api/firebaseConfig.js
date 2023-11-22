// firebaseConfig.js
const { initializeApp } = require('@firebase/app');
require('@firebase/auth');
require('@firebase/database');

const firebaseConfig = {
  apiKey: 'AIzaSyDZ2_4-FDvd2rfwOteXE8i6mWpy_ZpvCm4',
  authDomain: 'apirest-paralela.firebaseapp.com',
  databaseURL: 'https://apirest-paralela-default-rtdb.firebaseio.com',
  projectId: 'apirest-paralela_ID',
  storageBucket: 'apirest-paralela.appspot.com',
  messagingSenderId: '384543085131',
  appId: '1:384543085131:web:1a43a17ba7744cc23b73ce',
};

// Verificar si ya existe una instancia de Firebase
const firebaseApp = initializeApp(firebaseConfig, 'unique-app-name');

module.exports = firebaseApp;