const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const dotenv = require('dotenv');
const firebaseConfig = require('./api/config/firebaseConfig');
const index = require('./api/routes/index');
const authConfig = require('./api/authorization/authGoogle');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3300;

// Middleware
app.use(session({
  name: 'session',
  secret: process.env.GOOGLE_CLIENT_SECRET
}));
authConfig(app,passport);
// Rutas
//app.use('/auth', index);
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
