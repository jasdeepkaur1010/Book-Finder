// load .env data into process.env
require('dotenv').config();
const path = require('path');
const db = require('./db/connection');
const { getUsers, getUsersBySubId, insertUser } = require('./db/queries/users');
// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const bp = require('body-parser');

const PORT = process.env.PORT || 8080;
const app = express();
app.set('views', path.join(__dirname, '..', 'book-finder', 'views'))
app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const bookApiRoutes = require('./routes/books-api');
const usersRoutes = require('./routes/users');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/books', bookApiRoutes);
app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// Route for JSON data for '/users'

app.get('/users', async(req, res) => {
  try {
    // Your logic to retrieve data from the database
    const userData = await getUsers();

    // Sending the retrieved user data as JSON in the response
    res.json({ users: userData });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Route to find/insert user based on sub_id//
app.post('/users', async (req, res) => {
  const { username, sub_id, email } = req.body;
  console.log('Received Payload:', req.body);
  try {
    const newUser = await insertUser(username, sub_id, email);

    if (newUser) {
      return res.status(201).json({ user: newUser });
    } else {
      return res.status(400).json({ error: 'User with provided sub_id already exists' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


// app.get('/', (req, res) => {
//   res.send('home');
// });
// const users = [
//   { id: 1, Username: 'John', sub_id: 123, email: 'john@example.com', isAdministrator: false },
//   { id: 2, Username: 'Alice', sub_id: 456, email: 'alice@example.com', isAdministrator: true },

// ];

// API endpoint to get users by sub_id
app.get('/users/:sub_id', async (req, res) => {
  const { sub_id } = req.params;

  try {
    const query = 'SELECT * FROM users WHERE sub_id = $1';
    const { rows: foundUsers } = await db.query(query, [sub_id]);

    if (foundUsers.length > 0) {
      res.json(foundUsers);
    } else {
      res.status(404).json({ message: 'User not found' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
