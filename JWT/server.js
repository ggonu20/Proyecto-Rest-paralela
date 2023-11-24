const express = require('express'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;
const app = express();

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

app.get("/public",(req,res)=>{
    res.send("I'm i public");
});

app.get("/private",(req,res)=>{
    try{
        // Bearer "token"
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token,secret);
        if (Date.now() > payload.exp){
            res.status(401).send({error: error.message});
        };
        res.send("I'm i private");
    } catch (error){
        res.status(401).send({error: error.message});
    };
    
});


app.listen(3000, () => {
    console.log(`El servidor está escuchando en http://localhost:3300`);
  });