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

// Exporta ambas funciones
module.exports = {
  crearSala,
  listarSalas,
  borrarSala
};
