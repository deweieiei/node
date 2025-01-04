// apiapp.js
const express = require('express');
const router = express.Router(); 
const db = require('./dbConnection'); 

 

 
const getCurrentDateTime = () => {
  return new Date().toISOString();
};

 
router.get('/', (req, res) => {
  //connectDb();
  res.json({
    success: true,
    message: { status: 'success' },
    dateTime: new Date().toISOString(),
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
