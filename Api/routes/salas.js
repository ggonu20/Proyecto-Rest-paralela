const express = require('express');
const { getDatabase } = require('@firebase/database');
const firebaseApp = require('../config/firebaseConfig');
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
      const sala = salas[salaId];
      const horarios = sala.horarios;
      const capacidad = sala.capacidad;

      // Verificar si la sala está disponible en las fechas indicadas
      const salaDisponible = Object.values(horarios).some(disponible => disponible === true);

      // Verificar si la capacidad de la sala es suficiente
      const capacidadSuficiente = capacidad >= req.query.personas;

      return salaDisponible && capacidadSuficiente;
    });

    res.status(200).json({ salasDisponibles });
  } catch (error) {
    console.error('Error en la ruta /api/salas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

module.exports = router;

