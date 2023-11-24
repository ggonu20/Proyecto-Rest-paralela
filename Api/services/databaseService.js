const knex = require('knex')({
  client: 'pg',
  connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'admin123',
      database: 'APIR-REST'
  }
});

const table = 'salas';

const crearSala = ({ name, status, capacity }) => {
  return knex(table).insert({
      name: name,
      status: status,
      capacity: capacity
  });
};

const listarSalas = () => {
  return knex(table).select(
      'pk',
      'name',
      'status',
      'capacity'
  );
};

const borrarSala = (pk) => {
  return knex(table).where({ pk }).del();
};

const actualizarSala = (pk, { name, status, capacity }) => {
  return knex('salas').where({ pk }).update({ name, status, capacity });
};

const verificarExistenciaSala = (pk) => {
  return knex('salas').where({ pk }).first();
};
//--------------------------------------------------------------------

const crearReserva = ({ token, usuario, sala_id, fecha_inicio, fecha_termino }) => {
  return knex('reservas').insert({
    token,
    usuario,
    sala_id,
    fecha_inicio,
    fecha_termino
  });
};

const listarReservas = () => {
  return knex('reservas').select(
    'token',
    'usuario',
    'sala_id',
    'fecha_inicio',
    'fecha_termino'
  );
};

const actualizarReserva = (token, { usuario, sala_id, fecha_inicio, fecha_termino }) => {
  return knex('reservas').where({ token }).update({
    usuario,
    sala_id,
    fecha_inicio,
    fecha_termino
  });
};

const borrarReservaPorToken = async (tokenReserva) => {
  try {
      // Realizar la operación de borrado en la base de datos
      await knex('reservas').where({ token: tokenReserva }).del();
  } catch (error) {
      throw new Error(`Error al borrar la reserva: ${error.message}`);
  }
};

const obtenerReservaPorToken = async (tokenReserva) => {
  try {
      // Realizar la operación de obtención en la base de datos
      const reserva = await knex('reservas').where({ token: tokenReserva }).first();
      return reserva;
  } catch (error) {
      throw new Error(`Error al obtener la reserva: ${error.message}`);
  }
};

// Exporta ambas funciones
module.exports = {
  crearSala,
  listarSalas,
  borrarSala,
  actualizarSala,
  verificarExistenciaSala,
  crearReserva,
  listarReservas,
  actualizarReserva,
  borrarReservaPorToken,
  obtenerReservaPorToken
};
