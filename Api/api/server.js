const express = require('express');
const index = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware


// Rutas
app.use('/auth', index);
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
