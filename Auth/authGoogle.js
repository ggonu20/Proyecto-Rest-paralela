const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const session = require('express-session');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
require('dotenv').config();
const secret = process.env.SECRET;

const app = express();

app.use(bodyParser.json());
app.use(session({ secret: secret, resave: true, saveUninitialized: true })); // Añade este middleware
app.use(passport.initialize());
app.use(passport.session());

// Configuración de la estrategia de autenticación de Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
(accessToken, refreshToken,params, profile, done) => {
  console.log(`info devuelta por google parametros: ${params.id_token}`);

      return done(null, {
        profile: profile,
        token: accessToken,
        parametros: params.id_token ,
      });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Rutas de autenticación con Google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
      // Si la autenticación es exitosa, puedes generar tu propio JWT aquí
      const user = req.user;
      console.log('user:',user.profile.id); // desde aqui tengo que acceder a correo y luego crear mi jwt
          

  // Creas un nuevo token JWT utilizando el valor de user.parametros
  const nuevoToken = jwt.sign({ id_token: user }, process.env.SECRET, { expiresIn: '2d' });
  // Aquí envías el nuevo token JWT como parte de la respuesta
  res.json({ mensaje: 'Autenticación exitosa', tokennnnnnn: jwt.decode(user,{ complete: true }) });
  }
);

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
