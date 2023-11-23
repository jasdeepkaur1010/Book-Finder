const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUsersBySubId = (subId) => {
  return db.query('SELECT * FROM users WHERE sub_id = $1;', [subId])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers, getUsersBySubId };
