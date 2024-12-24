// //dbConnection.js
// //const mysql = require('mysql2');

// //สร้างการเชื่อมต่อ (ครั้งแรกจะไม่เชื่อมต่อฐานข้อมูลเลย)
// const connection = mysql.createConnection({
//   host: 'localhost',  // ชื่อโฮสต์
//   user: 'root',       // ชื่อผู้ใช้ MySQL
//   password: '',       // รหัสผ่าน MySQL
// });

// // เชื่อมต่อกับ MySQL และสร้างฐานข้อมูล
// const connectDb = () => {
//   return new Promise((resolve, reject) => {
//     connection.connect((err) => {
//       if (err) {
//         reject('Error connecting to MySQL:', err.message);
//         return;
//       }
//       console.log('Connected to MySQL!');
      
//       const createDbQuery = 'CREATE DATABASE IF NOT EXISTS my_database';
//       connection.query(createDbQuery, (err, results) => {
//         if (err) {
//           reject('Error creating database:', err.message);
//           return;
//         }
//         console.log('Database created successfully!');

//         // เลือกฐานข้อมูลที่สร้างขึ้น
//         connection.query('USE my_database', (err) => {
//           if (err) {
//             reject('Error selecting database:', err.message);
//             return;
//           }
//           resolve(connection); // ส่งคืนการเชื่อมต่อฐานข้อมูล my_database
//         });
//       });
//     });
//   });
// };

// // // เชื่อมต่อกับ MySQL และสร้างตาราง
// // const addtable = () => {
// //   return new Promise((resolve, reject) => {
// //     // ใช้ connectDb() เพื่อเชื่อมต่อกับฐานข้อมูลที่ถูกต้อง
// //     connectDb()
// //       .then((connection) => {
// //         console.log('Database connection established!');       
// //         const createTableQuery = `
// //           CREATE TABLE IF NOT EXISTS users (
// //             id INT AUTO_INCREMENT PRIMARY KEY,
// //             username VARCHAR(50) NOT NULL UNIQUE,
// //             password VARCHAR(255) NOT NULL,
// //             email VARCHAR(100) NOT NULL UNIQUE,
// //             profile_image VARCHAR(255),
// //             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// //             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
// //             status ENUM('active', 'inactive', 'suspended') DEFAULT 'active'
// //           )
// //         `;
        
// //         // สร้างตาราง
// //         connection.query(createTableQuery, (err, result) => {
// //           if (err) {
// //             reject('Error creating table:', err.message);
// //             return;
// //           }
// //           console.log('Users table created or already exists!');
// //           resolve(connection);
// //         });
// //       })
// //       .catch((err) => {
// //         reject(err);
// //       });
// //   });
// // };

// module.exports = { connectDb, addtable };

 