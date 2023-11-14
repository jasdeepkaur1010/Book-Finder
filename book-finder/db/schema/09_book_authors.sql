DROP TABLE IF EXISTS book_authors CASCADE;
CREATE TABLE book_author (
  id SERIAL PRIMARY KEY,
  book_id INTEGER REFERENCES library_books(book_id),
  author_id INTEGER REFERENCES authors(author_id)
);
