const express = require('express');
const router = express.Router();


const users = {};

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    

    if (users[email] && users[email].password === password) {

        req.session.user = users[email]; 
        res.redirect('/dashboard'); 
    } else {

        res.redirect('/login'); 
    }
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    
    if (!users[email]) {

        users[email] = { email, password }; 
        res.redirect('/login'); 
    } else {

        res.redirect('/register'); 
    }
});

module.exports = router;
