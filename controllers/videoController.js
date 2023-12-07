const Video = require('../models/Video');

const videoController = {
    getUploadPage(req, res) {
        res.render('upload');
    },

    uploadVideo(req, res) {
        try {
            
            const { title } = req.body;
            const videoPath = req.file.path; 

            const newVideo = new Video({ title, videoPath, user: req.session.userId });
            newVideo.save();

            res.redirect('/dashboard');
        } catch (error) {
            res.status(500).send("Error uploading video");
        }
    },

    getDashboard(req, res) {
        Video.find({ user: req.session.userId }, (err, videos) => {
            if (err) {
                return res.status(500).send("Error fetching videos");
            }
            res.render('dashboard', { videos });
        });
    }
};

module.exports = videoController;
