var express = require('express');
var mysql = require('mysql');
var port = process.env.PORT || 8080;

var morgan = require('morgan'); 
var bodyParser = require('body-parser'); 
var methodOverride = require('method-override'); 

var app = express(); 

//connect to mysql
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

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

require('./routes/routes.js')(app, conn);

app.listen(port);
console.log("Server listening on port " + port);