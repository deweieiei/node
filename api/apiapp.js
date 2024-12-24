// apiapp.js
const express = require('express');
const router = express.Router();
const { connectDb } = require('./dbConnection'); // นำเข้า connectDb
 


// เวลาเเละวันที่
const getCurrentDateTime = () => {
  return new Date().toISOString();
};

// API สำหรับแสดงเวลาปัจจุบัน
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: { status: 'success' },
    dateTime: getCurrentDateTime(),
  });
});

 

router.get('/get-all-users', async (req, res) => {
  try {
    // เชื่อมต่อกับฐานข้อมูล
    const connection = await connectDb();    
    // สร้างคำสั่ง SQL สำหรับดึงข้อมูลทั้งหมดจากตาราง users
    const query = 'SELECT * FROM users';  
    // ดำเนินการคำสั่ง SQL
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ success: false, message: 'Error fetching users', error: err.message, dateTime: getCurrentDateTime() });
        return;
      }    
      // ส่งผลลัพธ์กลับไปที่ผู้ใช้
      res.status(200).json({ success: true, message: 'successfully', data: results, dateTime: getCurrentDateTime() });
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message, dateTime: getCurrentDateTime()});
  }
});

router.post('/add-user', (req, res) => {
  const { username, password, email, profile_image } = req.body; // รับข้อมูลจาก body ของคำขอ POST
  if (!username || !password || !email) { // ตรวจสอบว่า ข้อมูลสำคัญครบถ้วน
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
  db.connectDb()  // เชื่อมต่อกับฐานข้อมูล
    .then((connection) => {
      const query = 'INSERT INTO users (username, password, email, profile_image) VALUES (?, ?, ?, ?)';  // SQL query สำหรับบันทึกข้อมูล
      const values = [username, password, email, profile_image || null];  // ข้อมูลที่ต้องการเก็บในตาราง
      connection.query(query, values, (err, result) => {
        if (err) {
          res.status(500).json({ success: false, message: 'Error inserting user data', error: err.message });
          return;
        }
        res.status(200).json({ success: true, message: 'User added successfully', data: result });
      });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: 'Database connection failed', error: err });
    });
});

module.exports = router;
