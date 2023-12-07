const Video = require('../models/Video');

const videoController = {
    async uploadVideo(req, res) {
        try {
            const { title, url } = req.body;
            await Video.create({ title, url, user: req.session.userId });
            res.redirect('/dashboard');
        } catch (error) {
            res.status(500).send("Error uploading video");
        }
    },

    async getDashboard(req, res) {
        try {
            const videos = await Video.find({ user: req.session.userId });
            res.render('dashboard', { videos });
        } catch (error) {
            res.status(500).send("Error fetching videos");
        }
    }
};

module.exports = videoController;
