var express = require('express');
var mysql = require('mysql');
var admin = require("firebase-admin");
var serviceAccount = require("./private_key/herbeat-4e03e-firebase-adminsdk-pa8e2-2c44358147.json");

var port = process.env.PORT || 9090;

var morgan = require('morgan'); 
var bodyParser = require('body-parser'); 
var methodOverride = require('method-override'); 

var app = express(); 


//local env setup for MySql
var conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'herbeatapp'
});

conn.connect(function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('Connected to MySQL');
    }
});

//initialize firebase app API
try
{
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://herbeat-4e03e.firebaseio.com"
      });
} 
catch (err) 
{
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) 
  {
    console.error('Firebase initialization error');
  }
}

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

require('./routes/routes.js')(app, conn, admin);

app.listen(port);
console.log("Server listening on port " + port);