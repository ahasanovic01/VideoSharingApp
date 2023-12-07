const express = require('express');
const User = require('../models/User');  // Assuming you have a User model
const router = express.Router();

// Middleware to check if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
};

// Display the user profile
router.get('/profile', isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        res.render('profile', { user });
    } catch (error) {
        res.status(500).send("Error fetching user data");
    }
});

// Route to update user profile
router.post('/profile', isLoggedIn, async (req, res) => {
    try {
        const { username, bio } = req.body; // Assuming these are the fields in your user model

        await User.findByIdAndUpdate(req.session.userId, {
            username,
            bio
        });

        res.redirect('/profile');
    } catch (error) {
        res.status(500).send("Error updating user profile");
    }
});

// Additional user routes can be added here

module.exports = router;
