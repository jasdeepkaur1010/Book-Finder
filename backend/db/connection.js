// PG database client/connection setup
const { Pool } = require('pg');
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);
const dbParams = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'satya',
  password: process.env.DB_PASS || 'Ram786$',
  database: process.env.DB_NAME || 'satya'
};

const db = new Pool(dbParams);

// db.connect();

module.exports = db;
