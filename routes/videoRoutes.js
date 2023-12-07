const express = require('express');
const router = express.Router();

// Dummy video database for demonstration
let videos = [];

router.get('/dashboard', (req, res) => {
    // Check if user is logged in
    if (!req.session.user) {
        return res.redirect('/login');
    }

    // Render the dashboard with available videos
    res.render('dashboard', { videos });
});

router.post('/upload', (req, res) => {
    // Basic upload logic
    const { videoUrl, title } = req.body;

    if (!videoUrl || !title) {
        return res.status(400).send('Video URL and title are required');
    }

    const newVideo = { videoUrl, title };
    videos.push(newVideo);

    res.redirect('/dashboard');
});

module.exports = router;
