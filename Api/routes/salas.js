const express = require('express');
const { getDatabase } = require('@firebase/database');
const firebaseApp = require('../firebaseConfig'); // Asegúrate de tener la ruta correcta
require('@firebase/auth');

const router = express.Router();
const database = getDatabase(firebaseApp);

// Ruta protegida: Obtener salas disponibles
router.get('/', async (req, res) => {
  try {
    const user = await verificarAutenticacion(req.headers.authorization);

    // Lógica para obtener salas disponibles desde la base de datos de Firebase
    const snapshot = await database.ref('/salas').once('value');
    const salas = snapshot.val();

    // Filtrar salas disponibles
    const salasDisponibles = Object.keys(salas).filter(salaId => {
      const horarios = salas[salaId].horarios;
      // aa1 Aquí podrías agregar lógica para determinar si la sala está disponible en el horario actual
      // aa2 En este ejemplo, se considera disponible si al menos un horario es true
      return Object.values(horarios).some(disponible => disponible === true);
    });

    res.status(200).json({ salasDisponibles });
  } catch (error) {
    console.error('Error en la ruta /api/salas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

module.exports = router;
