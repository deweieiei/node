// const express = require('express');
// const app = express();


// app.set('view engine', 'ejs');
// app.set('views', './views');




// app.get('/', (req, res) => {
//     res.render('home', { title: 'Double', message: 'Hello, EJS!' });
// });
// app.get('/login', (req, res) => {
//     res.render('login', { title: 'login', message: 'login' });
// });

// const apiApp = require('./api/apiapp');
// app.use('/apiapp', apiApp);
// app.use(express.static('public'));
// app.listen(4000, () => {
//     console.log('Server is running  ');
// });

  const { Client } = require('pg');

// Set up the connection configuration
const client = new Client({
  user:  'my_database_psk5_user',// 'postgres',
  host:  'dpg-ctl1e3i3esus73ecgro0-a',// 'localhost',
  database: 'my_database_psk5',//'my_database',
  password: 'em8L3NqvObSvfaPmTDJF5QaYfZmUsy0X',//'your_password',
  port: 5432,
});

// Connect to PostgreSQL
client.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database!");
  })
  .catch(err => {
    console.error("Connection error", err.stack);
  });


  //dpg-ctl1e3i3esus73ecgro0-a//host
//5432//post
//my_database_psk5//database
//my_database_psk5_user//user
//em8L3NqvObSvfaPmTDJF5QaYfZmUsy0X//password

 