// routes/salas.js
const express = require('express');
const firebaseApp = require('../config/firebaseConfig');
const router = express.Router();

// Ruta para obtener todas las salas desde Firebase
router.get('/', (req, res) => {
  const database = firebaseApp.database();
  const salasRef = database.ref('salas');

  salasRef.once('value', (snapshot) => {
    const salas = snapshot.val();
    res.json(salas);
  }, (error) => {
    console.error(error);
    res.status(500).send('Error al obtener las salas desde Firebase');
  });
});

// Otras rutas relacionadas con salas si es necesario

module.exports = router;
