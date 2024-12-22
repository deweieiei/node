const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
// // สร้างการเชื่อมต่อ
// var connection = mysql.createConnection({
//   host: 'localhost',  // ชื่อโฮสต์
//   user: 'root',       // ชื่อผู้ใช้ MySQL
//   password: '', // รหัสผ่าน MySQL
// });
// // สร้างฐานข้อมูลถ้าไม่มีอยู่แล้ว
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err.message);
//     return;
//   }
//   console.log('Connected to MySQL!');
//   const createDbQuery = 'CREATE DATABASE IF NOT EXISTS my_database';
//   connection.query(createDbQuery, (err, results) => {
//     if (err) {
//       console.error('Error creating database:', err.message);
//       return;
//     }
//     console.log('Database created successfully!');
//     connection.end(); // ปิดการเชื่อมต่อ
//   });
// });

// เวลาเเละวันที่
const getCurrentDateTime = () => {
    return new Date().toISOString();
};

//
router.get('/', (req, res) => {
    res.json({ success: true, 
               message: {"statu":"success"}, 
               dateTime: getCurrentDateTime()  
            });   
});


// API สำหรับดึงข้อมูลผู้ใช้
router.get('/load-data', (req, res) => {
    
    try {
        // สมมุติว่าคุณจะใส่โค้ดดึงข้อมูลจากฐานข้อมูลที่นี่
        const data = { id: 1, name: "John Doe" }; // ตัวอย่างข้อมูล
        res.json({ success: true, message: { status: "success", data },dateTime: getCurrentDateTime()});
    } catch (e) {
        res.json({ success: false, message: { error: e.message },dateTime: getCurrentDateTime()});
    }
    
});

 

module.exports = router;
