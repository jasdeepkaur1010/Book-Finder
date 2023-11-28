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

async function updateUserIsAdmin(sub_id, isadministrator) {
  try {
    // Construct an SQL query to update the 'isAdministrator' field for a user
    const query = 'UPDATE users SET isAdministrator = true WHERE sub_id = $1';
    const values = [sub_id];

    // Execute the update query in the database
    const result = await db.query(query, values);

    // If the update affected rows, fetch and return the updated user data
    return result.rowCount > 0;
  } catch (error) {
    // Throw an error if there's an issue with the database update
    throw new Error('Failed to update isAdmin status: ' + error.message);
  }
}

module.exports = { getUsers, getUserBySubId, insertUser, updateUserIsAdmin };

