const express  = require('express')
    , session  = require('express-session')
    , passport = require('passport')
    , Strategy = require('passport-discord').Strategy
    , app      = express()
    , cors = require("cors")
const handler = require("./controllers/discordOE.controller.js");
require('dotenv').config()
app.use(express.json())

try {
    app.route('/handler')
        .get(handler.get)
        .post(handler.get)
        .put(handler.get)
        .delete(handler.get)

} catch (err) {
    console.log(err)
}
app.route('/test').get(handler.test)

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

const scopes = ['identify', 'email', 'guilds', /*'guilds.join'*/];
const prompt = 'consent'

console.log(process.env.NODE_ENV)

const URL = process.env.NODE_ENV === 'prod' ?  process.env.ADDRESS : 'http://localhost:5000'
const frontUrl = process.env.NODE_ENV === 'prod' ?  process.env.ADDRESS : 'http://localhost:80'
const CallBackURL = process.env.NODE_ENV === 'prod' ? `${process.env.ADDRESS}/api` : 'http://localhost:5000'

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${CallBackURL}/callback`, //`${URL}/api/callback`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    scope: scopes,
    prompt: prompt
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile)
    })
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({origin: '*'}))
app.get('/', passport.authenticate('discord', { scope: scopes, prompt: prompt }), function(req, res) {});
app.get('/callback',
    passport.authenticate('discord', { failureRedirect: '/' }),
    function(req, res) { res.redirect(`/info`) } // /api/info !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
);
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/api/');
});
app.get('/info', checkAuth, async function (req, res) {
    if(req.user.guilds) {
        let good = false
        let id = req.user.id
        let avatar = req.user.avatar
        let username = `${req.user.username}`
        let discriminator = `${req.user.discriminator}`
        /*for(let i = 0; req.user.guilds.length > i; i++) {

            if(req.user.guilds[i].id === "300276721075355649") {
                good = true
            }
        }*/
        let urlData = `${id}&${avatar}&${username}&${discriminator}`
        const encode = Buffer.from(urlData).toString('hex') // Кодирование в Base64
        res.redirect(`${frontUrl}/edit/${encode}`)
        //res.json(req.user)
    }
    else {
        res.redirect(`${frontUrl}/error`)
    }
});

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    console.log("Запрос2")
    res.send('not logged in :(');
}


app.listen(5000, function (err) {
    if (err) return console.log(err)
    console.log(`Listening at ${CallBackURL}`)
})





/*
const express = require('express')
const session = require('express-session')
const DiscordStrategy = require('edit-discord').Strategy;
const edit = require('edit')
const routers = require('./router.js')
const scopes = ['identify', 'email', 'guilds', 'guilds.join'];
const app = express()
const PORT = 1000

edit.use(new DiscordStrategy({
    clientID: '864616678859603979',
    clientSecret: 'dc-VJAw49mRjJfU_-87qXUiJGsFD3SLS',
    callbackURL: 'localhost:1000/auth/redirect',
    scope: scopes
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    }))

app.use(session({
    secret: 'Random text',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false
}))
app.use(edit.initialize())
app.use(edit.session())

app.get('/auth/discord', edit.authenticate('discord'));
app.get('/auth/discord/callback', edit.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/secretstuff') // Successful auth
});

app.listen(PORT, () => {
    console.log(`server listening in port ${PORT}`)
})*/
