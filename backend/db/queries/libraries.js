const db = require('../connection');

const getLibrary = () => {
  return db.query('SELECT * FROM libraries;')
    .then(data => {
      return data.rows;
    });
};

//get library by ID Query//


const getLibraryById = (id) => {
  return db.query('SELECT * FROM libraries WHERE id = $1;', [id])
    .then(async (data) => {
      const library = data.rows[0];
      if (!library) {
        throw new Error(`Library with ID ${id} not found`);
      }

      const booksQuery = 'SELECT * FROM books INNER JOIN library_book ON books.id = library_book.book_id WHERE library_book.library_id = $1';
      const booksData = await db.query(booksQuery, [id]);
      const books = booksData.rows;

      // Combine library details with associated books
      const libraryWithBooks = {
        ...library,
        books: books,
      };

      return libraryWithBooks;

    });
};



const insertLibrary = (UserID, name, cover_photo, status, address, postal_code, city, province) => {
  return db.query('INSERT INTO libraries (UserID, name, cover_photo, status, address, postal_code, city, province) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;', [UserID, name, cover_photo, status, address, postal_code, city, province])
    .then(newLibraryEntry => {
      return newLibraryEntry.rows[0]; // Return the newly inserted library entry
    })
    .catch(error => {
      console.error('Error inserting into libraries:', error);
      throw new Error('Failed to insert into libraries');
    });
};

module.exports = { insertLibrary, getLibrary, getLibraryById };
