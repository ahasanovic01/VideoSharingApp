const Video = require('../models/Video');

const videoController = {
    getUploadPage(req, res) {
        res.render('upload');
    },

    uploadVideo: async (req, res) => {
        try {
            const { title } = req.body;
            const videoPath = req.file.path; 

            const newVideo = new Video({
                title, 
                videoPath, 
                user: req.session.userId  
            });
            await newVideo.save();

            res.redirect('/dashboard');
        } catch (error) {
            res.status(500).send("Error uploading video");
        }
    },

    getDashboard: async (req, res) => {
        try {
            const videos = await Video.find({ user: req.session.userId });
            res.render('dashboard', { videos });
        } catch (error) {
            res.status(500).send("Error fetching videos");
        }
    },

};

module.exports = videoController;
