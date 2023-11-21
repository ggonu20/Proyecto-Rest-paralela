module.exports = function(app, databaseService){
    app.get('/', (request, response) =>{
        response.status(200).json({"mensaje": "Todo bien"});

    });

    app.get('/lenguajes',(request,response)=>{
        response.status(200).json({"mensaje": "mis lenguajes"});    
    });

    app.post('/lenguajes',(request,response)=>{
        const nuevolenguaje = request.body;
        console.log(nuevolenguaje);

        databaseService.crearlenguaje(nuevolenguaje)
        .then(()=>{
            response.status(200).json({"mensaje": "Creado"});    
        }).catch(e => {
            response.status(500).json(e);
        });

        
    });

};