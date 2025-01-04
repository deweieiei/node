const express = require('express');
const app = express();

const apiApp = require('./api/apiapp');

app.set('view engine', 'ejs');
app.set('views', './views');




app.get('/', (req, res) => {
    res.render('home', { title: 'BeingStory', message: 'Welcome' });
});
 
app.use('/apiapp', apiApp);



app.use(express.static('public'));
app.listen(80, () => {
    console.log('Server is running  ');
});