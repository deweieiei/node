// apiapp.js
const express = require('express');
const router = express.Router();
const { connectDb } = require('./dbConnection'); // นำเข้า connectDb
const db = require('./dbConnection'); // Import the MySQL connection

 


// เวลาเเละวันที่
const getCurrentDateTime = () => {
  return new Date().toISOString();
};

// API สำหรับแสดงเวลาปัจจุบัน
// router.get('/', (req, res) => {
//   // Uncomment and define this function if needed
//   // connectDb();
//   res.json({
//     success: true,
//     message: { status: 'success' },
//     dateTime: getCurrentDateTime(),
//   });
// });

router.get('/', (req, res) => {
  connectDb();
  res.json({
    success: true,
    message: { status: 'success' },
    dateTime: new Date().toISOString(),
  });
});

// API to get all users
router.get('/get-all-users', (req, res) => {
  const query = 'SELECT * FROM `user`'; // SQL query to fetch all users

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).json({
        success: false,
        message: { status: 'error', error: err.message },
        dateTime: getCurrentDateTime(),
      });
    }

    // Respond with fetched user data
    res.json({
      success: true,
      message: { status: 'success', users: results },
      dateTime: getCurrentDateTime(),
    });
  });
});
 

module.exports = router;
