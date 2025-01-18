const express = require('express');
const router = express.Router();
const db = require('./dbConnection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getCurrentDateTime = () => new Date().toISOString();
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is working',
    dateTime: getCurrentDateTime(),
  });
});
router.get('/get-all-users', (req, res) => {
  const query = 'SELECT * FROM `user`';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Error fetching users',
        error: err.message,
        dateTime: getCurrentDateTime(),
      });
    }
    if (!results || results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No users found in the database',
        dateTime: getCurrentDateTime(),
      });
    }
    res.json({
      success: true,
      message: 'Users retrieved successfully',
      data: results,
      dateTime: getCurrentDateTime(),
    });
  });
});router.post('/register', (req, res) => {
  const { username, password, email, image } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({
      success: false,
      message: 'Username, password, and email are required',
      dateTime: getCurrentDateTime(),
    });
  }

  // ตรวจสอบว่า username มีอยู่แล้วหรือไม่
  const checkUserQuery = 'SELECT COUNT(*) AS count FROM `user` WHERE `username` = ?';

  db.query(checkUserQuery, [username], (err, results) => {
    if (err) {
      console.error('Error checking user:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Error checking the user',
        error: err.message,
        dateTime: getCurrentDateTime(),
      });
    }

    if (results[0].count > 0) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists',
        dateTime: getCurrentDateTime(),
      });
    }

    // เข้ารหัส username และ password
    bcrypt.hash(username, saltRounds, (err, hashedUsername) => {
      if (err) {
        console.error('Error hashing username:', err.message);
        return res.status(500).json({
          success: false,
          message: 'Error hashing username',
          error: err.message,
          dateTime: getCurrentDateTime(),
        });
      }

      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err.message);
          return res.status(500).json({
            success: false,
            message: 'Error hashing password',
            error: err.message,
            dateTime: getCurrentDateTime(),
          });
        }

        // บันทึกข้อมูลใหม่หลังจากเข้ารหัสแล้ว
        const insertUserQuery = 'INSERT INTO `user` (`username`, `password`, `email`, `image`, `create_time`) VALUES (?, ?, ?, ?, ?)';

        db.query(insertUserQuery, [hashedUsername, hashedPassword, email, image, getCurrentDateTime()], (err, result) => {
          if (err) {
            console.error('Error inserting user:', err.message);
            return res.status(500).json({
              success: false,
              message: 'Error saving the user',
              error: err.message,
              dateTime: getCurrentDateTime(),
            });
          }

          res.json({
            success: true,
            message: 'User saved successfully',
            data: {
              userId: result.insertId,
              username: username, // ส่ง username แบบเดิมกลับไปยังผู้ใช้
            },
            dateTime: getCurrentDateTime(),
          });
        });
      });
    });
  });
});
module.exports = router;

 