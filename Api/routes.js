const jwt = require('jsonwebtoken');
const { crearSala, listarSalas, borrarSala, actualizarSala, verificarExistenciaSala } = require('./services/databaseService');
require('dotenv').config();
const secret = process.env.SECRET;
module.exports = function(app, databaseService){
    
    
    app.get('/', (request, response) =>{
        response.status(200).json({"mensaje": "Todo bien"});

    });

    app.get('/salas', async (request,response)=>{
        try {
            // Bearer "token"
            const token = request.headers.authorization.split(" ")[1];
            const payload = jwt.verify(token, secret);
            if (Date.now() > payload.exp) {
                response.status(401).send({ error: 'Token expirado' });
            }
                // Realizar la acción específica
                try {
                    const salas = await listarSalas();
                    response.status(200).json({ salas, mensaje: "Listado de salas" });
                } catch (error) {
                    response.status(500).json({ error: error.message });
                }
        
        } catch (error) {
            response.status(401).send({ error: error.message });
        }
        
            
    });

    app.post('/salas',(request,response)=>{
        try{
            // Bearer "token"
            const token = request.headers.authorization.split(" ")[1];
            const payload = jwt.verify(token,secret);
            if (Date.now() > payload.exp){
                response.status(401).send({error: 'Token expirado'});
            };
                const nuevaSala = request.body;
                crearSala(nuevaSala)
                .then(()=>{
                    response.status(200).json({"mensaje": "Creado"});    
                }).catch(e => {
                    response.status(500).json(e);
                });
        } catch (error){
            response.status(401).send({error: error.message});
        };
    });

    app.delete('/salas/borrar/:pk', async (request, response) => {
        try {
            const token = request.headers.authorization.split(" ")[1];
            const payload = jwt.verify(token, secret);
            if (Date.now() > payload.exp) {
                return response.status(401).json({ error: 'Token expirado' });
            }
                const pk = request.params.pk;
                await borrarSala(pk);
                response.status(200).json({ mensaje: 'Sala eliminada con éxito' });
        } catch (error) {
            response.status(401).json({ error: error.message });
        }
    });

    app.put('/salas/actualizar/:pk', async (request, response) => {
        try {
          const token = request.headers.authorization.split(" ")[1];
          const payload = jwt.verify(token, secret);
          if (Date.now() > payload.exp) {
            return response.status(401).json({ error: 'Token expirado' });
          }
                const pk = request.params.pk;
                const { name, status, capacity } = request.body;
                // Verificar si la sala con la clave primaria proporcionada existe antes de intentar actualizar
                const salaExistente = await verificarExistenciaSala(pk);
                if (!salaExistente) {
                    return response.status(404).json({ error: 'Sala no encontrada' });
                }
                // Actualizar la sala si existe
                await actualizarSala(pk, { name, status, capacity });
                response.status(200).json({ mensaje: 'Sala actualizada con éxito' });
        } catch (error) {
          response.status(401).json({ error: error.message });
        }
      });

};