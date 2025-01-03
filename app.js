const express = require('express');
const app = express();

const apiApp = require('./api/apiapp');

app.set('view engine', 'ejs');
app.set('views', './views');




app.get('/', (req, res) => {
    res.render('home', { title: 'BeingStory', message: 'Welcome' });
 
});
app.get('/login', (req, res) => {
    res.render('login', { title: 'login', message: 'login' });////77777
});


app.use('/apiapp', apiApp);



app.use(express.static('public'));
app.listen(80, () => {
    console.log('Server is running  ');
});