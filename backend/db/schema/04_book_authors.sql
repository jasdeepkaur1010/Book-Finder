DROP TABLE IF EXISTS book_author CASCADE;
CREATE TABLE book_author (
  id SERIAL PRIMARY KEY,
  book_id INTEGER REFERENCES books(id),
  author_id INTEGER REFERENCES authors(id)
);
