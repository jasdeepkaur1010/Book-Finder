DROP TABLE IF EXISTS library_books CASCADE;
CREATE TABLE library_book (
  id SERIAL PRIMARY KEY,
  library_id INTEGER REFERENCES libraries(library_id),
  book_id INTEGER REFERENCES library_books(book_id)
);
