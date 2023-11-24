module.exports = function(app, databaseService){
    app.get('/', (request, response) =>{
        response.status(200).json({"mensaje": "Todo bien"});

    });

    app.get('/salas',(request,response)=>{
        databaseService.listarSalas();
        response.send(data);
        response.status(200).json({"mensaje": "listado de salas"});    
    });

    app.post('/salas',(request,response)=>{
        const nuevolenguaje = request.body;
        console.log(nuevolenguaje);

        databaseService.crearSala(nuevolenguaje)
        .then(()=>{
            response.status(200).json({"mensaje": "Creado"});    
        }).catch(e => {
            response.status(500).json(e);
        });

        
    });

};