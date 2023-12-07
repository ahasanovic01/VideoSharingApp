const User = require('../models/User');
const { comparePassword } = require('../utils/helpers');

const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (user && await comparePassword(password, user.password)) {
                // Assuming you're using session
                req.session.userId = user._id;
                res.redirect('/dashboard');
            } else {
                res.status(401).send('Invalid credentials');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Additional methods for registration, logout, etc.
};

module.exports = authController;
