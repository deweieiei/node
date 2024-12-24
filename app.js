const express = require('express');
const app = express();


app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', { title: 'Double', message: 'Hello, EJS!' });
});
app.get('/login', (req, res) => {
    res.render('login', { title: 'login', message: 'login' });
});

const apiApp = require('./api/apiapp');
app.use('/apiapp', apiApp);
app.use(express.static('public'));
app.listen(4000, () => {
    console.log('Server is running  ');
});
 

 