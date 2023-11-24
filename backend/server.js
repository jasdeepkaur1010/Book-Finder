// load .env data into process.env
require('dotenv').config();
const path = require('path');
const db = require('./db/connection');
const { getUsers, getUserBySubId, insertUser } = require('./db/queries/users');
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
    //logic to retrieve data from the database
    const userData = await getUsers();

    // Sending the retrieved user data as JSON in the response
    res.json({ users: userData });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Route to find/insert user based on sub_id//
// API endpoint to handle user insertion based on sub_id
app.post('/users', async (req, res) => {
  // const { sub_id } = req.params;
  const { username, sub_id, email, isAdministrator } = req.body;
  console.log('payload', req.body);
  try {
    // Check if a user with the provided sub_id exists
    const existingUser = await getUserBySubId(sub_id);

    if (existingUser.length > 0) {
      // If the user with the sub_id exists, send back a message indicating the user already exists
      res.status(400).json({ message: 'User with provided sub_id already exists' });
    } else {
      // If the user with the sub_id doesn't exist, insert a new user
      const newUser = await insertUser(username, sub_id, email, isAdministrator);

      if (newUser) {
        // Return the newly inserted user data
        res.status(201).json({ user: newUser });
      } else {
        // Failed to insert user
        res.status(500).json({ error: 'Failed to insert user' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// app.get('/', (req, res) => {
//   res.send('home');
// });

// API endpoint to handle user insertion or retrieval based on sub_id
app.get('/users/:sub_id', async (req, res) => {
  const { sub_id } = req.params;
  const { username, email, isadministrator } = req.body;

  try {
    // Check if a user with the provided sub_id exists
    const existingUser = await getUserBySubId(sub_id);

    if (existingUser.length > 0) {
      // If the user with the sub_id exists, return the user data
      res.json({ user: existingUser[0] });
    } else {
      // If the user with the sub_id doesn't exist, insert a new user
      const newUser = await insertUser(username, sub_id, email, isadministrator);

      if (newUser) {
        // Return the newly inserted user data
        res.status(201).json({ user: newUser });
      } else {
        // Failed to insert user
        res.status(500).json({ error: 'Failed to insert user' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});