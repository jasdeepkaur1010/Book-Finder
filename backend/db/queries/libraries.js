const db = require('../connection');

const getLibrary = () => {
  return db.query('SELECT * FROM libraries;')
    .then(data => {
      return data.rows;
    });
};

//get library by ID Query//


const getLibraryById = async (id) => {
  try {
    const data = await db.query('SELECT * FROM libraries WHERE id = $1;', [id]);
    const library = data.rows[0];

    if (!library) {
      throw new Error(`Library with ID ${id} not found`);
    }

    return library;
  } catch (error) {
    throw new Error(`Error fetching library with ID ${id}: ${error.message}`);
  }
};


const getBooksByLibraryId = async (id) => {
  try {
    const bookQuery = await db.query('SELECT * FROM books WHERE id IN (SELECT book_id FROM library_book WHERE library_id = $1);', [id]);
    const books = bookQuery.rows;
    return books;
  } catch (error) {
    throw new Error(`Error fetching books for libraryId${id}: ${error.message}`);
  }
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

module.exports = { insertLibrary, getLibrary, getLibraryById, getBooksByLibraryId };
