
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

      const table = 'test2';
      const crearlenguaje = ({pk,name,message}) => {
        return knex(table).insert({
            pk: pk,
            name: name,
            message: message
        });

      };
    
      return {
        crearlenguaje
    };
};

module.exports = {
    databaseService
};