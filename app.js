const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');  // You can still keep bodyParser if you prefer, but it's better to use express.json()
const path = require('path');

// Replace body-parser with express.json() which is the newer way
app.use(express.json()); // For parsing JSON bodies
app.use(cors());

const apiApp = require('./api/apiapp');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home', { title: 'BeingStory', message: 'Welcome' });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login', message: 'Login' });
});

app.use('/apiapp', apiApp); // This will route all API requests prefixed with /apiapp

app.use(express.static(path.join(__dirname, 'public')));

app.listen(80, () => {
    console.log('Server is running on http://localhost:80');
});
