const express = require('express');
const router = express.Router();

// Dummy user database for demonstration
let users = [];

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Basic validation and user creation logic
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    const userExists = users.some(user => user.email === email);

    if (userExists) {
        return res.status(400).send('User already exists');
    }

    const newUser = { email, password };
    users.push(newUser);

    // Redirect to login after successful registration
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // User authentication logic
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        return res.status(401).send('Invalid credentials');
    }

    // Create a session for the user
    req.session.user = user;

    // Redirect to dashboard after successful login
    res.redirect('/dashboard');
});

module.exports = router;
