/* eslint-disable no-useless-catch */
const db = require('../connection');

const getBooks = () => {
  return db.query('SELECT * FROM books;')
    .then(data => {
      return data.rows;
    });
};

//AddBook query

const addBook = (book) => {
  const { title, author_id, publication_date, genre, isbn, cover_image_url, summary, status, rating } = book;
  //check if book already exists with the given ISBN//
  const isbnCheck = 'SELECT * FROM books where isbn = $1';
  return db.query(isbnCheck, [isbn])
    .then((result) => {
      if (result.rows.length > 0) {
        return 'Book with this ISBN already exists';

      } else {
        const bookQuery = `
    INSERT INTO books (title, author_id, publication_date, genre, isbn, cover_image_url, summary, status, rating)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *
  `;
        const values = [title, author_id, publication_date, genre, isbn, cover_image_url, summary, status, rating];

        return db.query(bookQuery, values)
          .then((result) => {
            console.log(result.rows);
            return 'Book added successfully'})
          .catch(err => {
            throw new Error(err.message);
          });
      }
    })
    .catch(err => {
      throw new Error(err.message);
    });
};

const searchBooks = async (query) => {
  try {
    const result = await db.query(
      'SELECT * FROM books WHERE title ILIKE $1 OR genre ILIKE $1 OR CAST(isbn as text) ILIKE $1 ',
      [`%${query}%`]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};
// New function for searching by author
const searchByAuthor = async (query) => {
  try {
    const result = await db.query(
      'SELECT * FROM books WHERE LOWER(author_id) LIKE LOWER($1)',
      [`%${query}%`]
    );
    return result.rows;
  } catch (error) {
    console.error('Error in searchByAuthor:', error);
    throw error;
  }
};

const getBookById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

const getBookReviews = async (bookId) => {
  try {
    const result = await db.query('SELECT rating, comment FROM review WHERE book_id = $1', [bookId]);
    // console.log(result.rows[0]);
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw error;
  }
};

// Function to update book status in the database
const updateBookStatus = async (libraryID, bookID, status) => {
  console.log(typeof status);
  console.log('Status Value:', status);
  const updateQuery = `
    UPDATE books
    SET status = $1
    WHERE id = $2
    AND id IN (
      SELECT book_id
      FROM library_book
      WHERE library_id = $3
    )
  `;

  const updateValues = [status, bookID, libraryID];

  try {
    const result = await db.query(updateQuery, updateValues);
    return result.rowCount > 0; // Indicates if any row was updated
  } catch (error) {
    throw new Error('Error updating book status: ' + error.message);
  }
};

module.exports = {
  searchBooks,
  getBooks,
  addBook,
  updateBookStatus,
  // getBookById,
  searchByAuthor,
  getBookById,
  getBookReviews
};
