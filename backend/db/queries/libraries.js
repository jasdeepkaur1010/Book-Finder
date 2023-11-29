const db = require('../connection');

const getLibrary = () => {
  return db.query('SELECT * FROM libraries;')
    .then(data => {
      return data.rows;
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

module.exports = { insertLibrary, getLibrary };
