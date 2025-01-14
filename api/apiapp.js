const express = require('express');
const router = express.Router();
const db = require('./dbConnection');

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
        dew1: username,
        dew2: password,
        dew: email,
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

module.exports = router;

 