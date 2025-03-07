const express = require('express');
const router = express.Router();
const db = require('./dbConnection');  
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const getCurrentDateTime = () => new Date().toISOString();

const uploadDir = path.join(__dirname, "../userimage");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ตั้งค่า Multer สำหรับอัปโหลดภาพ
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    let customFilename = req.body.filename || Date.now().toString();
    customFilename = customFilename.replace(/\s+/g, "_"); // ลบช่องว่างออกจากชื่อไฟล์
    cb(null, customFilename + path.extname(file.originalname));
  },
});
const upload = multer({storage /*, limits: { fileSize: 10 * 1024 * 1024 },*/});

// API ลงทะเบียน + อัปโหลดรูป
router.post("/register", upload.single("image"), (req, res) => {
  const { username, password, email } = req.body;
  
  if (!username || !password || !email) {
    return res.status(400).json({
      success: false,
      message: "Username, password, and email are required",
      dateTime: getCurrentDateTime(),
    });
  }

  // ตรวจสอบว่ามี username ซ้ำหรือไม่
  const checkUserQuery = "SELECT COUNT(*) AS count FROM `user` WHERE `username` = ?";
  db.query(checkUserQuery, [username], (err, results) => {
    if (err) {
      console.error("Error checking user:", err.message);
      return res.status(500).json({
        success: false,
        message: "Error checking the user",
        error: err.message,
        dateTime: getCurrentDateTime(),
      });
    }

    if (results[0].count > 0) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
        dateTime: getCurrentDateTime(),
      });
    }

    // ตรวจสอบว่ามีไฟล์อัปโหลดหรือไม่
    let imagePath = req.file ? `/userimage/${req.file.filename}` : '';

    // บันทึกข้อมูลลง Database
    const insertUserQuery =
      "INSERT INTO `user` (`username`, `password`, `email`, `image`, `create_time`) VALUES (?, ?, ?, ?, ?)";
    db.query(insertUserQuery, [username, password, email, imagePath, getCurrentDateTime()], (err, result) => {
      if (err) {
        console.error("Error inserting user:", err.message);
        return res.status(500).json({
          success: false,
          message: "Error saving the user",
          error: err.message,
          dateTime: getCurrentDateTime(),
        });
      }

      res.json({
        success: true,
        message: "User registered successfully",
        data: {
          userId: result.insertId,
          username: username,
          email: email,
          image: imagePath,
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
 
 

module.exports = router;

 