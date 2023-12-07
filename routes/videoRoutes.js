const express = require('express');
const Video = require('../models/Video');  // Assuming you have a Video model
const router = express.Router();

// Dashboard displaying videos
router.get('/dashboard', async (req, res) => {
    try {
        const videos = await Video.find({});  // Retrieve all videos or per user basis
        res.render('dashboard', { videos });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to handle video upload
router.post('/upload', async (req, res) => {
    try {
        const { title, url } = req.body;  // Assuming you're receiving title and URL of the video
        await Video.create({ title, url, user: req.session.userId });  // Assuming you store userId in session

        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
