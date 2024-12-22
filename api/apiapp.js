const express = require('express');
const router = express.Router();
// เวลาเเละวันที่
const getCurrentDateTime = () => {
    return new Date().toISOString();
};

//
router.get('/', (req, res) => {
    res.json({ success: true, 
               message: {"statu":"success"}, 
               dateTime: getCurrentDateTime()  
            });   
});


// API สำหรับดึงข้อมูลผู้ใช้
router.get('/load-data', (req, res) => {
    
    try {
        // สมมุติว่าคุณจะใส่โค้ดดึงข้อมูลจากฐานข้อมูลที่นี่
        const data = { id: 1, name: "John Doe" }; // ตัวอย่างข้อมูล
        res.json({ success: true, message: { status: "success", data },dateTime: getCurrentDateTime()});
    } catch (e) {
        res.json({ success: false, message: { error: e.message },dateTime: getCurrentDateTime()});
    }
    
});

 

module.exports = router;
