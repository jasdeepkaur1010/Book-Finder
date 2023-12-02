DROP TABLE IF EXISTS books CASCADE;
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author_id VARCHAR(255),
  publication_date DATE,
  genre VARCHAR(100),
  isbn VARCHAR(20) UNIQUE,
  cover_image_url VARCHAR(255),
  summary TEXT,
  status VARCHAR(50),
  rating NUMERIC(3, 2)
);
