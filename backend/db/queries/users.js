const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUsersBySubId = (sub_id) => {
  return db.query('SELECT * FROM users WHERE sub_id = $1;', [sub_id])
    .then(data => {
      return data.rows;
    });
};

const insertUser = (username, sub_id, email) => {
  return db.query('SELECT * FROM users WHERE sub_id = $1;', [sub_id])
    .then(data => {
      if (data.rows.length === 0) {
        // If no user exists with the provided sub_id, insert a new user
        return db.query('INSERT INTO users (username, sub_id, email) VALUES ($1, $2, $3) RETURNING *;', [username, sub_id, email])
          .then(newUser => {
            return newUser.rows[0]; // Return the newly inserted user
          });

        } else {
          const existingUser = data.rows[0];
          if (!existingUser.username && username) {
            // If the user exists but doesn't have a username and a new username is provided, update the existing user
            return db.query('UPDATE users SET username = $1 WHERE sub_id = $2 RETURNING *;', [username, sub_id])
              .then(updatedUser => {
                return updatedUser.rows[0]; // Return the updated user
              });

      } else {
        // If user with sub_id exists, return null (or handle differently as needed)
        return null;
      }
    }
    });
};

module.exports = { getUsers, getUsersBySubId, insertUser };

