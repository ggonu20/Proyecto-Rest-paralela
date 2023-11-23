// auth/autenticacion.js
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

const initializePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: '384543085131-3t3qnb3p4sfg3g6et4io2h8qij2c7g99.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:3000/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  return passport; // Devuelve la instancia de Passport
};

module.exports = initializePassport;












/*
//prueba con jwt //


app.post("/token", (req, res) => {
  const {id: sub, name} = {id: "hola", name: "guillermo"};
  const token = jwt.sign({
    sub,
    name,
    exp: Date.now() + 60 * 1000
  }, secret);
  res.send({token})
})

app.get("/public", (req, res) =>{
  res.send("Estoy en Público")
})

app.get("/private", (req, res) =>{
  try{
    const token = req.headers.authorization.split("")[1];
    const payload = jwt.verify(token, secret);

    if (Date.now() > payload.exp){
      return res.status(401).send({error: "token expirado"})
    }
    res.send("Estoy en Privado")
  } catch (error) {
    res.status(401).send({error: error.message})
  }
  
})
//fin prueba con jwt//
*/