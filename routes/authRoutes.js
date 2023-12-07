const express = require('express');
const User = require('../models/User');  // Assuming you have a User model
const { hashPassword, comparePassword } = require('../utils/helpers');  // Password utilities
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ email, password: hashedPassword });

        // Redirect or respond depending on your app flow
        res.redirect('/login');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && await comparePassword(password, user.password)) {
            // Set up session, cookie, or token here

            // Redirect or respond based on your app flow
            res.redirect('/dashboard');
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
