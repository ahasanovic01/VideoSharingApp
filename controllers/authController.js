const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/helpers');

const authController = {
    async register(req, res) {
        try {
            const { email, password } = req.body;
            const hashedPassword = await hashPassword(password);
            const newUser = await User.create({ email, password: hashedPassword });

            res.redirect('/login');
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (user && await comparePassword(password, user.password)) {
                req.session.userId = user._id;  // Assuming session-based authentication
                res.redirect('/dashboard');
            } else {
                res.status(400).send('Invalid credentials');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
};

module.exports = authController;
