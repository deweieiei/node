const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login', message: 'Login' });
});

const apiApp = require('./api/apiapp');
app.use('/apiapp', apiApp);

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
