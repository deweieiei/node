const express = require('express');
const router = express.Router();



// const mysql = require('mysql2');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'testdb'
// });



// API สำหรับดึงข้อมูลผู้ใช้
router.get('/load-data', (req, res) => {
    
    res.json({ success: true, message: {"key":"dew1"} });
  try{
    // connection.connect();
    // connection.query('SELECT * FROM users', (err, results) => {
    //     if (err) throw err;      
    //     res.json({ success: true, message: results });

    // });
}catch (e){
    res.json({success: true, message: {"error":e}});
}
    
});

// API สำหรับข้อมูลผู้ใช้
router.get('/profile', (req, res) => {
    res.json({ success: true, data: { name: 'John Doe', age: 30 } });
});

module.exports = router;
