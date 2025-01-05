const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');  // To handle POST body data

app.use(cors());
app.use(bodyParser.json());

const apiApp = require('./api/apiapp');

app.set('view engine', 'ejs');
app.set('views', './views');




app.get('/', (req, res) => {
    res.render('home', { title: 'BeingStory', message: 'Welcome' });
});
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login', message: 'Login' });////77777
});

app.use('/apiapp', apiApp);



app.use(express.static('public'));
app.listen(80, () => {
    console.log('Server is running  ');
});