const db = require('../connection');

const getBooks = () => {
  return db.query('SELECT * FROM books;')
    .then(data => {
      return data.rows;
    });
};

//AddBook query

const addBook = (book) => {
  const { title, author_id, publication_date, genre, isbn, cover_image_url, summary, rating } = book;
  //check if book already exists with the given ISBN//
  const isbnCheck = 'SELECT * FROM books where isbn = $1';
  return db.query(isbnCheck, [isbn])
    .then((result) => {
      if (result.rows.length > 0) {
        return 'Book with this ISBN already exists';

      } else {
        const bookQuery = `
    INSERT INTO books (title, author_id, publication_date, genre, isbn, cover_image_url, summary, rating)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;
        const values = [title, author_id, publication_date, genre, isbn, cover_image_url, summary, rating];

        return db.query(bookQuery, values)
          .then(() => 'Book added successfully')
          .catch(err => {
            throw new Error(err.message);
          });
      }
    })
    .catch(err => {
      throw new Error(err.message);
    });
};
module.exports = { getBooks, addBook };
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
