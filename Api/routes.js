const jwt = require('jsonwebtoken');
const { crearSala, listarSalas } = require('./services/databaseService');
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

};