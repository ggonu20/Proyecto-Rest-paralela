const express = require('express');
const salasRoutes = require('./routes/salas');
const autenticacionMiddleware = require('./auth/autenticacion');

const app = express();
const port = 3000;

// Middleware para procesar datos JSON
app.use(express.json());

// Middleware de autenticación
app.use(autenticacionMiddleware);

// Rutas
app.use('/api/salas', salasRoutes);

app.listen(port, () => {
  console.log(`El servidor está escuchando en http://localhost:3000`);
});
