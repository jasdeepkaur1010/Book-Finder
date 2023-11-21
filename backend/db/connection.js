// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'labber',
  password: process.env.DB_PASS || 'labber',
  database: process.env.DB_NAME || 'finals'
};

const db = new Pool(dbParams);

db.connect();

module.exports = db;
