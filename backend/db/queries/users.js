const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserBySubId = (sub_id) => {
  return db.query('SELECT * FROM users WHERE sub_id = $1;', [sub_id])
    .then(data => {
      return data.rows;
    });
};

const insertUser = (username, sub_id, email, isAdministrator) => {
  return db.query('SELECT * FROM users WHERE sub_id = $1;', [sub_id])
    .then(data => {
      if (data.rows.length === 0) {
        // If no user exists with the provided sub_id, insert a new user
        return db.query('INSERT INTO users (username, sub_id, email, isAdministrator) VALUES ($1, $2, $3, $4) RETURNING *;', [username, sub_id, email, isAdministrator])
          .then(newUser => {
            return newUser.rows[0]; // Return the newly inserted user
          });

      } else {
        // If user with sub_id exists, return null//
        return data.rows;
      }

    });
};

module.exports = { getUsers, getUserBySubId, insertUser };

