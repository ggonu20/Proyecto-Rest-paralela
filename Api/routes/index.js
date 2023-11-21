const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const {Pool} = require('pg');

const app = express();
const port = 3000;

//Iniciar el servidor
app.listen(port, () => {
    console.log('servidor escuchando en el puerto ${port}');
});
