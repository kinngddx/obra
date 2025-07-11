const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { handleUpload } = require('../controllers/uploadController');
const verifyToken = require('../middleware/verifyToken'); 


// const storage = multer.memoryStorage(); 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });


router.post('/', verifyToken, upload.single('audio'), handleUpload);

module.exports = router;
