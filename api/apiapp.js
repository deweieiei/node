const express = require('express');
const router = express.Router();
const db = require('./dbConnection');  
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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
  const { username, password, email, image } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({
      success: false,
      message: 'Username, password, and email are required',
      dateTime: getCurrentDateTime(),
    });
  }
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
    const insertUserQuery = 'INSERT INTO `user` (`username`, `password`, `email`, `image`, `create_time`) VALUES (?, ?, ?, ?, ?)';
    db.query(insertUserQuery, [username, password, email, image, getCurrentDateTime()], (err, result) => {
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
          username: username,
        },
        dateTime: getCurrentDateTime(),
      });
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
      return res.status(404).json({
        success: false,
        message: 'User not found',
        dateTime: getCurrentDateTime(),
      });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
        dateTime: getCurrentDateTime(),
      });
    }

 
    delete user.password;

    res.json({
      success: true,
      message: 'Login successful',
      data: user,
      dateTime: getCurrentDateTime(),
    });
  });
});

router.post('/addpolicy', (req, res) => {
  const { section, content } = req.body;
  
  const insertUserQuery = 'INSERT INTO `privacy_policy` (`section`, `content`, `create_time`) VALUES (?, ?, ?)';
  db.query(insertUserQuery, [section, content, getCurrentDateTime()], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Error saving the Policy',
        error: err.message,
        dateTime: getCurrentDateTime(),
      });
    }
    res.json({
      success: true,
      message: 'Policy saved successfully',
      data: {
        policyId: result.insertId,
      },
      dateTime: getCurrentDateTime(),
    });
  });
}); 
const uploadImage = () => {
  const uploadDir = path.join(__dirname, "../userimage");
  if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
  }

  // ตั้งค่า Multer
  const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, uploadDir),
      filename: (req, file, cb) => {
          // ตรวจสอบว่า req.body.filename มีค่าหรือไม่
          let customFilename = req.body.filename || Date.now().toString();
          console.log(req.body.filename);
          customFilename = customFilename.replace(/\s+/g, "_"); // ลบช่องว่างออกจากชื่อไฟล์
          cb(null, customFilename + path.extname(file.originalname));
      }
  });
  const upload = multer({ storage });

  return (req, res) => {
      // ใช้ upload.fields เพื่อให้ req.body ถูกอ่านก่อน multer
      upload.fields([{ name: "image" }])(req, res, (err) => {
          if (err) return res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปโหลด" });
          if (!req.files || !req.files.image) return res.status(400).json({ message: "กรุณาอัปโหลดรูปภาพ" });

          const uploadedFile = req.files.image[0];

          res.json({
              message: "อัปโหลดสำเร็จ",
              filename: uploadedFile.filename,
              path: `/userimage/${uploadedFile.filename}`
          });
      });
  };
};

router.post("/uploadImage", uploadImage());

module.exports = router;

 