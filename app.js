const express = require('express');
const app = express();


app.set('view engine', 'ejs');
app.set('views', './views');
const apiApp = require('./api/apiapp');

app.get('/', (req, res) => {
    res.render('home', { title: 'My EJS Page', message: 'Hello, EJS!' });
});
app.get('/login', (req, res) => {
    res.render('login', { title: 'login', message: 'login' });
});

app.use('/apiapp', apiApp);

app.listen(80, () => {
    console.log('Server is running on http://localhost:80');
});