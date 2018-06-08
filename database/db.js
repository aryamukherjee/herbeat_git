var mysql = require('mysql');
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});

connection.connect(function(err){
    if(err){
        //log the error
        console.log(err);
    }
    else{
        console.log('Connected to MySQL');
    }
});

module.exports = connection;
