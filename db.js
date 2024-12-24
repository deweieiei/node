// const mysql = require('mysql2');

// // สร้างการเชื่อมต่อกับ MySQL
// const connection = mysql.createConnection({
//   host: 'localhost',    // ชื่อโฮสต์ MySQL
//   user: 'root',         // ชื่อผู้ใช้ MySQL
//   password: 'your_password', // รหัสผ่าน MySQL
// });

// // เชื่อมต่อกับ MySQL
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err.message);
//     return;
//   }
//   console.log('Connected to MySQL!');
  
//   // สร้างฐานข้อมูลใหม่
//   const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS nodejs_project';

//   connection.query(createDatabaseQuery, (err, results) => {
//     if (err) {
//       console.error('Error creating database:', err.message);
//       return;
//     }
//     console.log('Database created successfully or already exists');
    
//     // ปิดการเชื่อมต่อ
//     connection.end();
//   });
// });
