DROP TABLE IF EXISTS books CASCADE;
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author_id INTEGER REFERENCES authors(author_id),
  publication_date DATE,
  genre VARCHAR(100),
  isbn VARCHAR(20) UNIQUE,
  cover_image_url VARCHAR(255),
  summary TEXT,
  rating NUMERIC(3, 2)
);