DROP TABLE IF EXISTS libraries CASCADE;
CREATE TABLE library (
  id SERIAL PRIMARY KEY,
  BookID INTEGER REFERENCES books(book_id),
  status VARCHAR(50),
  address VARCHAR(255),
  postal_code VARCHAR(20),
  city VARCHAR(100),
  province VARCHAR(100)
);
