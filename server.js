var express = require('express');
var path = require('path');
var jade = require('jade');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var MySQLStore = require('express-mysql-session')(session);
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

//global root location
global.appRoot = path.resolve(__dirname);

require('dotenv').config();
var port = process.env.PORT || 9090;

var morgan = require('morgan'); 
var bodyParser = require('body-parser'); 
var methodOverride = require('method-override'); 
var index = require('./routes/index');
var auth = require('./routes/auth');
var api = require('./routes/api');

var app = express(); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(expressValidator());
app.use(methodOverride());

//passport session store in db
var options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME
};

var sessionStore = new MySQLStore(options);

app.use(session({
  secret: process.env.SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { 
      secure: false, 
      maxAge: 7200000
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//default route
app.get('/', function(req, res){
    res.redirect('/home');
});
app.use('/', index);
app.use('/auth', auth);
app.use('/api', api);

passport.use(new LocalStrategy(
  function(username, password, done) {
      return done(null, user);
  }
));

app.listen(port);
console.log("Server listening on port " + port);