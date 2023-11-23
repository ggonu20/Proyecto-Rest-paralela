const { refreshToken } = require('firebase-admin/app');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TOKEN = process.env.TOKEN || 'faltatoken';
const CLIENTID = process.env.CLIENTID || 'faltaclientid';

module.exports = (app, passport) => {
    
    passport.serializeUser((user, done)=>{
        done(null, user);
    });

    passport.deserializeUser((user,done)=>{
        done(null,user);
    });

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (token,refreshToken,params,profile,done) =>{
        console.log('aaa');
        return done(null, {
            profile: profile,
            token: token,
            parametros: params.id_token,
        });
    }
    ));

    app.use(passport.initialize());
    app.get('/',(req,res)=>{
        if (req.session.token){
            res.cookie('token',req.session.token);
            res.json({
                status: 'session cookie set'
            });
        } else{
            res.cookie('token','');
            res.json({
                status:'No existe cookie, inicia en localhost:3000/auth/google'
            });
        }
    });

    app.get('/logout',(req,res)=>{
        if(req.session){
            req.session.destroy(err => {
                if (err){
                    res.status(400).send('Unable to log out');
                } else {
                    res.send('Log out successful');
                }
            });
        } else {
            res.end();
        }
    });

    app.get('/auth/google', passport.authenticate('google',{
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
    }));

    app.get('/auth/google/callback',
    passport.authenticate('google',{
        failureRedirect: '/'
    }),
    (req,res)=>{
        req.session.token = req.user.token;
        req.session.profile = req.user.profile;
        req.session.parametros = req.user.parametros;
        res.redirect('/');
        console.log(req.session.parametros);
    }
    );
};