const express = require('express');
const User = require('../models/User');  
const router = express.Router();

const isLoggedIn = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
};

router.get('/profile', isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        res.render('profile', { user });
    } catch (error) {
        res.status(500).send("Error fetching user data");
    }
});

router.post('/profile', isLoggedIn, async (req, res) => {
    try {
        const { username, bio } = req.body; 

        await User.findByIdAndUpdate(req.session.userId, {
            username,
            bio
        });

        res.redirect('/profile');
    } catch (error) {
        res.status(500).send("Error updating user profile");
    }
});


module.exports = router;
