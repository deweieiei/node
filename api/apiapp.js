const express = require('express');
const router = express.Router();
const db = require('./dbConnection');
const bcrypt = require('bcrypt');

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
});

router.post('/register', (req, res) => {
  const { username, password, email, image} = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required',
      dateTime: getCurrentDateTime(),
    });
  }

  const query = 'INSERT INTO `user` (`username`, `password`, `email`, `image`, `create_time`) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [username, password, email, image, getCurrentDateTime()], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Error saving the user',
        error: err.message,
        dateTime: getCurrentDateTime(),
        username: username,
        password: password,
        email: email,
      });
    }

    res.json({
      success: true,
      message: 'User saved successfully',
      data: {
        userId: result.insertId,
        username: username,
      },
      dateTime: getCurrentDateTime(),
    });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required',
      dateTime: getCurrentDateTime(),
    });
  }

  // ดึงข้อมูลผู้ใช้จากฐานข้อมูลโดยใช้ username
  const query = 'SELECT * FROM `user` WHERE `username` = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Error fetching the user',
        error: err.message,
        dateTime: getCurrentDateTime(),
      });
    }

    if (results.length === 0) {
      // ไม่มีผู้ใช้นี้ในระบบ
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
        dateTime: getCurrentDateTime(),
      });
    }

    const user = results[0];

    // ตรวจสอบรหัสผ่านโดยใช้ bcrypt.compare
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err.message);
        return res.status(500).json({
          success: false,
          message: 'Error comparing passwords',
          error: err.message,
          dateTime: getCurrentDateTime(),
        });
      }

      if (!isMatch) {
        // รหัสผ่านไม่ตรงกัน
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password',
          dateTime: getCurrentDateTime(),
        });
      }

      // ล็อกอินสำเร็จ
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          userId: user.id,
          username: user.username,
          email: user.email,
        },
        dateTime: getCurrentDateTime(),
      });
    });
  });
});

module.exports = router;

 