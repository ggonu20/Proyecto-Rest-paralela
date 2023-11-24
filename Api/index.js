const express = require('express');
const bodyParser = require('body-parser');
const {databaseService} = require('./services/databaseService.js');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'sadasdasdasd';
const app = express();

app.use(bodyParser.json());

app.post("/token",(req,res)=>{
    // get user from DB
    const { id: sub, name } = { id: "gonzalez",name: "gabriel" };

    const token = jwt.sign({
        sub,
        name,
        exp: Date.now() + 60 * 1000,
    }, secret)

    res.send({token});
});

require('./routes')(app,databaseService());

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});