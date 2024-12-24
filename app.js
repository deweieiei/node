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
 

 const express = require('express');
 const { Pool } = require('pg');
 const fs = require('fs');
 
 // Express app setup
 const app = express();
 app.use(express.json()); // To parse JSON request bodies
 
 // PostgreSQL Pool setup
 const pool = new Pool({
   user: 'my_database_psk5_user', // Replace with your PostgreSQL username
   host: 'ctl1e3i3esus73ecgro0',        // Replace with your host
   database: 'my_database_psk5',  // Replace with your database name
   password: 'em8L3NqvObSvfaPmTDJF5QaYfZmUsy0X',  // Replace with your password
   port: 5432,               // Default PostgreSQL port
 });
 
 // Run the init.sql file to initialize the database
 const initDatabase = async () => {
   try {
     const initSQL = fs.readFileSync('./init.sql', 'utf-8');
     await pool.query(initSQL);
     console.log("Database initialized successfully.");
   } catch (err) {
     console.error("Error initializing database:", err.stack);
   }
 };
 
 // Define the /api/user route
 app.get('/api/user', async (req, res) => {
   try {
     const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
     res.json(result.rows);
   } catch (err) {
     console.error("Error fetching users:", err.stack);
     res.status(500).json({ error: "Internal Server Error" });
   }
 });
 
 // Start the server
 const startServer = async () => {
   await initDatabase(); // Initialize the database on startup
   app.listen(3000, () => {
     console.log("Server is running on http://localhost:3000");
   });
 };
 
 startServer();