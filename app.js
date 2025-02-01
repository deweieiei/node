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

const getCurrentDateTime = () => new Date().toISOString();

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

async function fetchGoldPrice() {
  try {
    const insertUserQuery = 'INSERT INTO `data` (`text`) VALUES (?)';
    await query(insertUserQuery, [getCurrentDateTime()]);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

cron.schedule('*/15 * * * *', () => {
  console.log('ทำงานทุก 15 นาที');
  fetchGoldPrice();
});

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
