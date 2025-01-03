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
  
  res.json({
    success: true,
    message: { status: 'success' },
    dateTime: getCurrentDateTime(),
  });
});
 

module.exports = router;
