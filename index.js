const express = require('express');
const bodyParser = require('body-parser');
const {databaseService} = require('./services/databaseService.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;
const port = process.env.PORT||3300;
const app = express();

app.use(bodyParser.json());

app.post("/token",(req,res)=>{
    // get user from DB
    const externalToken = req.body.jwt;
    const decodedExternalToken = jwt.decode(externalToken);
    
    // Verificar si se proporcionó un JWT en el cuerpo
    if (!externalToken) {
        return res.status(400).send({ error: 'No se proporcionó un JWT en el cuerpo de la solicitud.' });
    }  

    const token = jwt.sign({
        decodedExternalToken,
        exp: Date.now() + 2 * 24 * 60 * 60 * 1000 // 2 días en milisegundos
    }, secret)
    console.log('Contenido del token:', jwt.verify(token,secret));
    res.send({token});
});

require('./dist/routes')(app,databaseService);

app.listen(port, function () {
    console.log('App listening on port 3000!');
});