/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router  = express.Router();
const { getUsers } = require('../db/queries/users');

router.get('/users', async(req, res) => {
  try {
    const userData = await getUsers(); // Retrieve data from the database
    res.json({ users: userData }); // Send the retrieved user data as JSON in the response
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
