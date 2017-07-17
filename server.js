/*    A lot of this code (most) does not belong to me
      This app was created under a time constraint      */


const passport      = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose      = require('mongoose')
const express       = require('express')
const session       = require('express-session')
const cookieParser  = require('cookie-parser')
const morgan        = require('morgan')
const path          = require('path')
const bodyParser    = require('body-parser')
const flash         = require('req-flash')
const http          = require('http')

var app             = express()
var server          = http.createServer(app)
var io              = require('socket.io').listen(server)

var configDB = require('./config/database.js')

require('./config/passport')(passport); // pass passport for configuration

// configuration ===============================================================
mongoose.connect(configDB.url)                                  // connect to our database

// Set up express application
app.use(morgan('dev'))                                          // log every request to the console
app.use(cookieParser())                                         // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'thesupersecretsecret',
    name: 'punchclock',
//    store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
}))
app.use(flash())


// Set up passport
app.use(session({ secret: 'ilovescchscotcscotchstch' }))        // session secret
app.use(passport.initialize())
app.use(passport.session())                                     // persistent login sessions
app.use('/', express.static('dist'))

// Routes
app.post('/auth/signup', passport.authenticate('local-signup', {
  successRedirect : '/dash', // redirect to the secure profile section
  failureRedirect : '/', // redirect back to the signup page if there is an error
}));

app.post('/auth/login', passport.authenticate('local-login', {
  successRedirect : '/dash', // redirect to the secure profile section
  failureRedirect : '/', // redirect back to the signup page if there is an error
}));

app.post('/auth/register', passport.authenticate('local-signup', {
  successRedirect : '/dash', // redirect to the secure profile section
  failureRedirect : '/', // redirect back to the signup page if there is an error
}));

app.get('/auth/logout', function (req, res){
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

app.get('/dash', isLoggedIn, function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/dash.html'));
})

app.get('/supervisor', isLoggedIn, function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/supervisor.html'));
})

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

server.listen(80);