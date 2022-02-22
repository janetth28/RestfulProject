// Creating the db configuration and referencing the DB config file.

const mysql = require("mysql2");
const dbConfig = require("../dbconfig/dbConfig.js")

//Create the connection to the DB
const connection = mysql.createConnection({
   host: dbConfig.HOST,
   port: dbConfig.PORT,
   user: dbConfig.USER,
   password: dbConfig.PASSWORD,
   database: dbConfig.DB
});

connection.connect(err => {
   if (err) throw err;
   console.log("Success connecting to MySQL database");
});

module.exports = connection;