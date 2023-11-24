
const databaseService =() =>{
    const knex = require('knex')({
        client: 'pg',
        connection: {
          host : 'localhost',
          port : 5432,
          user : 'postgres',
          password : 'admin123',
          database : 'Apirest'
        }
      });

      const table = 'salas';
      const crearSala = ({name,status,capacity}) => {
        return knex(table).insert({
            //pk: pk,
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
    
      return {
        crearSala
    };

    

};

module.exports = {
    databaseService
};