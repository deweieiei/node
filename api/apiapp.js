const express = require('express');
const router = express.Router(); 
const db = require('./dbConnection');  
const multer = require('multer');
const path = require('path');
 
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
      message: { status: 'success-ok-test', users: results },
      dateTime: getCurrentDateTime(),
    });
  });
});

 
router.post('/save-data', (req, res) => {
  const { username, password } = req.body;
  console.log('Request Body:', req.body); 
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required:'+req.body+username+password,   
    });
  }
  const query =  'INSERT INTO `user` ( `username`, `password`) VALUES (?, ?)';  
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


const app = express();

// ตั้งค่าที่เก็บไฟล์และการตั้งชื่อไฟล์
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // โฟลเดอร์สำหรับเก็บภาพ
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์ใหม่
  }
});

const upload = multer({ storage: storage });

// สร้าง API สำหรับรับภาพ
app.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  res.json({
    success: true,
    message: 'File uploaded successfully',
    filePath: `/uploads/${req.file.filename}`
  });
});
 



module.exports = router;
