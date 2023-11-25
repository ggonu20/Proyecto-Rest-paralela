const jwt = require('jsonwebtoken');
const { crearSala, listarSalas, borrarSala, actualizarSala, verificarExistenciaSala, crearReserva, listarReservas, actualizarReserva, borrarReservaPorToken, obtenerReservaPorToken, buscarSalaPorCodigo } = require('./services/databaseService');
require('dotenv').config();
const secret = process.env.SECRET;
module.exports = function(app, databaseService){
    
    
    app.get('/', (request, response) =>{
        response.status(200).json({"mensaje": "Todo bien"});

    });

    app.get('/v1/rooms', async (request,response)=>{
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

      app.get('/v1/rooms/:pk', async (request, response) => {
        try {
          const token = request.headers.authorization.split(" ")[1];
          const payload = jwt.verify(token, secret);
          if (Date.now() > payload.exp) {
            return response.status(401).json({ error: 'Token expirado' });
          }
    
          const codigoSala = request.params.pk;
          const sala = await buscarSalaPorCodigo(codigoSala);
    
          if (!sala) {
            return response.status(404).json({ error: 'Sala no encontrada' });
          }
    
          response.status(200).json({ sala, mensaje: 'Sala obtenida con éxito' });
        } catch (error) {
          response.status(401).json({ error: error.message });
        }
      });
//--------------------reservas---------------------------


    app.post('/v1/reserve/request', async (request, response) => {
        try {
            const token = request.headers.authorization.split(" ")[1];
            const payload = jwt.verify(token, secret);
            if (Date.now() > payload.exp) {
                return response.status(401).json({ error: 'Token expirado' });
            }
            try {
                const nuevaReserva = request.body;
                await crearReserva(nuevaReserva);
                response.status(200).json({ mensaje: 'Reserva creada con éxito' });
              } catch (error) {
                response.status(500).json({ error: error.message });
              };
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });  
    

    app.get('/reservas', async (request, response) => {
        try {
            const token = request.headers.authorization.split(" ")[1];
            const payload = jwt.verify(token, secret);
            if (Date.now() > payload.exp) {
                return response.status(401).json({ error: 'Token expirado' });
            }
            try {
                const reservas = await listarReservas();
                response.status(200).json({ reservas, mensaje: 'Listado de reservas' });
              } catch (error) {
                response.status(500).json({ error: error.message });
              };
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });
    
    app.put('/reservas/actualizar/:token', async (request, response) => {
        try {
            const token = request.headers.authorization.split(" ")[1];
            const payload = jwt.verify(token, secret);
            if (Date.now() > payload.exp) {
                return response.status(401).json({ error: 'Token expirado' });
            }
            try {
                const token = request.params.token;
                const datosActualizados = request.body;
                await actualizarReserva(token, datosActualizados);
                response.status(200).json({ mensaje: 'Reserva actualizada con éxito' });
              } catch (error) {
                response.status(500).json({ error: error.message });
              };
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    app.delete('/reservas/borrar/:token', async (request, response) => {
        try {
            const token = request.headers.authorization.split(" ")[1];
            const payload = jwt.verify(token, secret);
            if (Date.now() > payload.exp) {
                return response.status(401).json({ error: 'Token expirado' });
            }
            const tokenReserva = request.params.token;
            await borrarReservaPorToken(tokenReserva);
            response.status(200).json({ mensaje: 'Reserva eliminada con éxito' });
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    });

    app.get('/reservas/obtener/:token', async (request, response) => {
        try {
            const token = request.headers.authorization.split(" ")[1];
            const payload = jwt.verify(token, secret);
            if (Date.now() > payload.exp) {
                return response.status(401).json({ error: 'Token expirado' });
            }
    
            const tokenReserva = request.params.token;
            const reserva = await obtenerReservaPorToken(tokenReserva);
    
            if (!reserva) {
                return response.status(404).json({ error: 'Reserva no encontrada' });
            }
    
            response.status(200).json({ reserva, mensaje: 'Reserva obtenida con éxito' });
        } catch (error) {
            response.status(401).json({ error: error.message });
        }
    });

      

};