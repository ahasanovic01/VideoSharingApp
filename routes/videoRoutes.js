const express = require('express');
const multer = require('multer');
const videoController = require('../controllers/videoController');
const upload = multer({ dest: 'uploads/' }); // Adjust storage as needed
const router = express.Router();

router.get('/upload', videoController.getUploadPage);
router.post('/upload', upload.single('videoFile'), videoController.uploadVideo);
router.get('/dashboard', videoController.getDashboard);

module.exports = router;
