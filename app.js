const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const db = require('api/dbConnection');

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

cron.schedule('*/15 * * * *', () => {
  console.log('ทำงานทุก15นาที:', new fetchGoldPrice());
});
const getCurrentDateTime = () => new Date().toISOString();
async function fetchGoldPrice() {
  try {
  const insertUserQuery = 'INSERT INTO `data` (`text`) VALUES (?)';
    db.query(insertUserQuery, [getCurrentDateTime() ], (err, result) => {    });
  }catch(error){}
}

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
