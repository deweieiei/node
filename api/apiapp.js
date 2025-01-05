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


// Save user data (simplified as both save-data and save-datas were identical)
router.post('/save-data', (req, res) => {
  const { username, password } = req.body;

  console.log('Request Body:', req.body); 

  res.json({
    success: true,
    message: { status: 'success', result: req.body },
    dateTime: getCurrentDateTime(),
  });

  // // Validate input
  // if (!username || !password) {
  //   return res.status(400).json({
  //     success: false,
  //     message: 'Username and password are required',
  //   });
  // }

  // // SQL query to insert user data
 
  // const query =  'INSERT INTO `user` ( `username`, `password`) VALUES (?, ?)'; //'INSERT INTO user (username, password) VALUES (?, ?)';
  // db.query(query, [username, password], (err, result) => {
  //   if (err) {
  //     console.error('Error inserting user:', err.message);
  //     return res.status(500).json({
  //       success: false,
  //       message: 'Error saving the user',
  //     });
  //   }

  //   // Respond with success
  //   res.json({
  //     success: true,
  //     message: 'User saved successfully',
  //     data: {
  //       userId: result.insertId,
  //       username: username,
  //     },
  //   });
  // });
});


router.post('/submit', (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
      return res.status(400).json({ error: 'Name and age are required' });
  }

  res.status(200).json({
      message: 'Data received successfully',
      data: {
          name,
          age,
      },
      dateTime: getCurrentDateTime(),
  });
});


module.exports = router;
