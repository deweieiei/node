const mysql = require('mysql');

// สร้างการเชื่อมต่อกับฐานข้อมูล
const db = mysql.createConnection({
  host: 'localhost',     // ชื่อโฮสต์ (ปกติจะเป็น localhost)
  user: 'beingstory_database', // ชื่อผู้ใช้ของ MySQL
  password: 'your_password', // รหัสผ่าน MySQL
  database: 'beingstory_', // ชื่อฐานข้อมูล
});

// เริ่มเชื่อมต่อ
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the MySQL database!');
});

module.exports = db;
