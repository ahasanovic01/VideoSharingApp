const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');

const app = express();


mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


app.use(express.static('public'));


app.set('view engine', 'pug');


app.use(authRoutes);
app.use(videoRoutes);


app.get('/', (req, res) => {
    res.render('index');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
