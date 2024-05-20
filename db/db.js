const mysql = require("mysql2");

const db = mysql.createPool({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '',
   database: 'employee_details'
});
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database', connection.threadId)
});
// data base creation
// db.query("CREATE DATABASE mydb1", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
module.exports = db;
