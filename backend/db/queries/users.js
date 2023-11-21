const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM public.users;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
