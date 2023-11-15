DROP TABLE IF EXISTS library_book CASCADE;
CREATE TABLE library_book (
  id SERIAL PRIMARY KEY,
  library_id INTEGER REFERENCES library(id),
  book_id INTEGER REFERENCES books(id)
);
