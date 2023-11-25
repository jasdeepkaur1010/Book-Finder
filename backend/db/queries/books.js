const { Pool } = require('pg');
const db = require('../connection');

// Set up the PostgreSQL connection pool
const pool = new Pool();

// Query to search for books
const searchBooks = async (query) => {
  try {
    const result = await pool.query(
      'SELECT * FROM books WHERE title ILIKE $1 OR genre ILIKE $1 OR isbn ILIKE $1',
      [`%${query}%`]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Query to get all books
const getAllBooks = async () => {
  try {
    const result = await pool.query('SELECT * FROM books');
    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Query to get a specific book by ID
const getBookById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchBooks,
  getAllBooks,
  getBookById,
};
