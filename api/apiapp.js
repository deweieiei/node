// apiapp.js
const express = require('express');
const router = express.Router(); 
const db = require('./dbConnection'); 

 

 
const getCurrentDateTime = () => {
  return new Date().toISOString();
};

 
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: { status: 'success' },
    dateTime: new Date().toISOString(),
  });
});
 
router.get('/check-connect', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Error connecting to the database',
        error: err.message,
        dateTime: getCurrentDateTime(),
      });
    }

    console.log('Database connection successful');
    connection.release(); // ปล่อยการเชื่อมต่อหลังจากตรวจสอบเสร็จ
    res.json({
      success: true,
      message: 'Database connection successful',
      dateTime: getCurrentDateTime(),
    });
  });
});

router.get('/get-all-users', (req, res) => {
  const query = 'SELECT * FROM `user`';  

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).json({
        success: false,
        message: { status: 'error', error: err.message },
        dateTime: getCurrentDateTime(),
      });
    }

    // ตรวจสอบว่ามีผลลัพธ์หรือไม่
    if (!results || results.length === 0) {
      return res.status(404).json({
        success: false,
        message: { status: 'no_data_found', error: 'No users found in the database' },
        dateTime: getCurrentDateTime(),
      });
    }

    // ส่งข้อมูลกลับถ้ามีผลลัพธ์
    res.json({
      success: true,
      message: { status: 'success', users: results },
      dateTime: getCurrentDateTime(),
    });
  });
});


module.exports = router;
