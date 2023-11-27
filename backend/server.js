// load .env data into process.env
require('dotenv').config();
const path = require('path');
const db = require('./db/connection');
const { getBooks, addBook } = require('./db/queries/books');
const { getUsers, getUserBySubId, insertUser } = require('./db/queries/users');
// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const bp = require('body-parser');
const cors = require('cors');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080;
// parse application/x-www-form-urlencoded

// parse application/json
app.use(bodyParser.json())
app.set('views', path.join(__dirname, '..', 'book-finder', 'views'))
app.set('view engine', 'ejs');
app.use(cors());

// Enable CORS for a specific origin
app.use(cors({ origin: 'http://localhost:3000' }));
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

app.get('/books', async (req, res) => {
  try {
    //retrieve data from the database
    const bookData = await getBooks();

    // Sending the retrieved user data as JSON in the response
    res.json({ users: bookData });
  } catch (error) {
    console.error('Error fetching book data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//Addbook route
app.post('/books', async (req, res) => {
  try {
    // eslint-disable-next-line camelcase, no-unused-vars
    const { title, author_id, publication_date, genre, isbn, cover_image_url, summary, rating } = req.body;

    // Validate that the title is provided and is not empty
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }
    const result = await addBook(req.body);
    console.log('results', result);
    if (result === 'Book added successfully') {
      res.status(201).send(result);
    } else if (result === 'Book with this ISBN already exists') {
      res.status(400).send(result);
    } else {
      res.status(500).send('Error adding book');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
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
    console.log(error, 'error');
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

// Route to search for books
app.get('/api/search-books', async (req, res) => {
  try {
    const { query } = req.query;

    // Search for books in the database based on the query
    const result = await pool.query('SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1', [`%${query}%`]);

    // Return the search results
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
