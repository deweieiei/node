const express = require('express');
const router = express.Router(); 
router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    res.json({
        success: true,
        message: 'Test successful',
        dateTime: getCurrentDateTime(),
      });
  
  });
    
  
module.exports = router;