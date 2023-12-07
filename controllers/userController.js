const User = require('../models/User');

const userController = {
    async getProfile(req, res) {
        try {
            const user = await User.findById(req.session.userId);
            res.render('profile', { user });
        } catch (error) {
            res.status(500).send("Error fetching user data");
        }
    },

    async updateProfile(req, res) {
        try {
            const { username, bio } = req.body;
            await User.findByIdAndUpdate(req.session.userId, { username, bio });
            res.redirect('/profile');
        } catch (error) {
            res.status(500).send("Error updating user profile");
        }
    }
};

module.exports = userController;
