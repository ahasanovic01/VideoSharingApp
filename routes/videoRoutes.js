const express = require('express');
const router = express.Router();
const Video = require('../models/Video'); 


router.get('/dashboard', async (req, res) => {
    try {
        const videos = await Video.find({}); 
        res.render('dashboard', { videos }); 
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).send('Error fetching videos');
    }
});

module.exports = router;
