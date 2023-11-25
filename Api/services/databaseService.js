require('dotenv').config();
const knex = require('knex')({
  client: 'pg',
  connection: {
      host: process.env.HOST,
      port: 5432,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABSE
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

const buscarSalaPorCodigo = async (codigoSala) => {
  try {
    const sala = await knex('salas').where({ pk: codigoSala }).first();
    return sala;
  } catch (error) {
    throw new Error(`Error al buscar la sala por código: ${error.message}`);
  }
};
//--------------------------------------------------------------------

const crearReserva = ({ sala_id, fecha_inicio, fecha_termino }, payload) => {
  try {
    const randomToken = generarTokenAleatorio();
    console.log('Contenido del randomtoken:', randomToken);
    const userEmail = payload.decodedExternalToken.email;
    console.log('Contenido del payload:', userEmail);

    // Insertar reserva en la base de datos
    return knex('reservas').insert({
      token: randomToken,
      usuario: userEmail,
      sala_id,
      fecha_inicio,
      fecha_termino
    });
  } catch (error) {
    // Manejar errores
    console.error('Error al crear la reserva:', error);
    throw new Error('Error al crear la reserva');
  }
};

// Función para generar un token aleatorio
const generarTokenAleatorio = () => {
  // Lógica para generar un token aleatorio (puedes utilizar cualquier lógica que desees)
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const longitud = 32;
  let token = '';
  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    token += caracteres.charAt(indice);
  }
  return token;
};

const Buscarpost = async ({ token }) => {
  try {
        const reservaEncontrada = await knex('reservas').where({ token }).first();
        return reservaEncontrada;

  } catch (error) {
    // Manejar errores
    console.error('Error al crear la reserva:', error);
    throw new Error('Error al crear la reserva');
  }
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

const obtenerAgendaPorFechaYSala = async (sala_id, fecha_inicio) => {
  try {
      // Implementa la lógica para obtener la reserva desde la base de datos
      // Utiliza knex para construir la consulta y obtener los datos necesarios
      const reserva = await knex('reservas')
          .where('sala_id', '=', sala_id)
          .andWhere('fecha_inicio', '=', fecha_inicio)
          .first();  // Tomar solo la primera coincidencia (si hay varias)

      return reserva;
  } catch (error) {
      console.error('Error al obtener la reserva:', error);
      throw new Error('Error al obtener la reserva');
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
  obtenerReservaPorToken,
  buscarSalaPorCodigo,
  Buscarpost,
  obtenerAgendaPorFechaYSala
};
