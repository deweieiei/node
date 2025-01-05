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
    if (!results || results.length === 0) {
      return res.status(404).json({
        success: false,
        message: { status: 'no_data_found', error: 'No users found in the database' },
        dateTime: getCurrentDateTime(),
      });
    }
 
    res.json({
      success: true,
      message: { status: 'success', users: results },
      dateTime: getCurrentDateTime(),
    });
  });
});


router.post('/save-data', (req, res) => {
    res.json({success: "123456",});
  const { username, password } = req.body;
 
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required',
    });
  }
 
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Error saving the user',
      });
    }

    res.json({
      success: true,
      message: 'User saved successfully',
      data: {
        userId: result.insertId,
        username: username,
      },
    });
  });
});


module.exports = router;
