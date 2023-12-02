DROP TABLE IF EXISTS books CASCADE;
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author_id INTEGER REFERENCES authors(id),
  publication_date DATE,
  genre VARCHAR(100),
  isbn VARCHAR(20) UNIQUE,
  cover_image_url VARCHAR(255),
  summary TEXT,
  status VARCHAR(50),
  rating NUMERIC(3, 2)
  comment VARCHAR(255)
);
