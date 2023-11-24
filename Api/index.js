const express = require('express');
const bodyParser = require('body-parser');
const {databaseService} = require('./services/databaseService.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;
const app = express();

app.use(bodyParser.json());

app.post("/token",(req,res)=>{
    // get user from DB
    const { id: sub, name } = { id: "gonzalez",name: "gabriel" };

    const token = jwt.sign({
        sub,
        name,
        exp: Date.now() + 2 * 24 * 60 * 60 * 1000 // 2 días en milisegundos
    }, secret)

    res.send({token});
});

require('./routes')(app,databaseService);

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});