const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your secret key', resave: false, saveUninitialized: true }));

app.use(authRoutes);
app.use(videoRoutes);

app.get('/', (req, res) => res.render('index'));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
