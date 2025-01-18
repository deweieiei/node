const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',    
  user: 'beingstory_database', 
  password: '9k9_6n6Db', 
  database: 'beingstory_',  
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the MySQL database!');
});
module.exports = db;