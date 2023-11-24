// routes/reservas.js
const express = require('express');
const { getDatabase, ref, push, set, child, get } = require('firebase/database');
const firebaseApp = require('../config/firebaseConfig');

const router = express.Router();
const database = getDatabase(firebaseApp);

// Endpoint para realizar una reserva
router.post('/reservar-sala', async (req, res) => {
  try {
    const { token, usuario, sala, fechaInicio, fechaTermino } = req.body;

    // Verificar si la sala está disponible en las fechas indicadas (puedes personalizar esta lógica)
    // Aqui, solo se verifica si hay alguna reserva en esas fechas
    const reservasSnapshot = await get(ref(database, 'reservas'));
    const reservas = reservasSnapshot.val();

    const salaDisponible = Object.values(reservas || {}).every(reserva => {
      return (
        reserva.sala !== sala ||
        (fechaTermino <= reserva.fechaInicio || fechaInicio >= reserva.fechaTermino)
      );
    });

    if (!salaDisponible) {
      return res.status(400).json({ mensaje: 'La sala no está disponible en esas fechas' });
    }

    // Guardar la reserva en la base de datos
    const nuevaReservaRef = push(ref(database, 'reservas'));
    await set(nuevaReservaRef, { token, usuario, sala, fechaInicio, fechaTermino });

    res.json({ mensaje: 'Reserva realizada exitosamente' });
  } catch (error) {
    console.error('Error al realizar la reserva:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Endpoint para obtener salas disponibles
router.get('/salas-disponibles', async (req, res) => {
  try {
    // Lógica para obtener salas disponibles desde la base de datos de Firebase
    const salasSnapshot = await get(ref(database, 'salas'));
    const salas = salasSnapshot.val();

    // Filtrar salas disponibles
    const salasDisponibles = Object.values(salas || {}).filter(sala => {
      // Lógica para determinar si la sala está disponible (puedes personalizar esta lógica)
      // Se considera disponible si tiene suficiente capacidad
      return sala.capacidad >= req.query.personas;
    });

    res.status(200).json({ salasDisponibles });
  } catch (error) {
    console.error('Error al obtener salas disponibles:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

module.exports = router;
