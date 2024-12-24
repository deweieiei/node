// dbConnection.js
const mysql = require('mysql2');


// สร้างการเชื่อมต่อ (ครั้งแรกจะไม่เชื่อมต่อฐานข้อมูลเลย)
const { Client } = require('pg');

// Set up the connection configuration
const client = new Client({
  user:  'my_database_psk5_user',// 'postgres',
  host:  'dpg-ctl1e3i3esus73ecgro0-a',// 'localhost',
  database: 'my_database_psk5',//'my_database',
  password: 'em8L3NqvObSvfaPmTDJF5QaYfZmUsy0X',//'your_password',
  port: 5432,
});
// Connect to PostgreSQL
client.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database!");
  })
  .catch(err => {
    console.error("Connection error", err.stack);
  });
// เชื่อมต่อกับ MySQL และสร้างตาราง
const addtable = () => {
  return new Promise((resolve, reject) => {
    // ใช้ connectDb() เพื่อเชื่อมต่อกับฐานข้อมูลที่ถูกต้อง
    connectDb()
      .then((connection) => {
        console.log('Database connection established!');       
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            profile_image VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            status ENUM('active', 'inactive', 'suspended') DEFAULT 'active'
          )
        `;
        
        // สร้างตาราง
        connection.query(createTableQuery, (err, result) => {
          if (err) {
            reject('Error creating table:', err.message);
            return;
          }
          console.log('Users table created or already exists!');
          resolve(connection);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = { connectDb, addtable };


 

 

  //dpg-ctl1e3i3esus73ecgro0-a//host
//5432//post
//my_database_psk5//database
//my_database_psk5_user//user
//em8L3NqvObSvfaPmTDJF5QaYfZmUsy0X//password

 