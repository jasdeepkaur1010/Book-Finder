DROP TABLE IF EXISTS library CASCADE;
CREATE TABLE library (
  id SERIAL PRIMARY KEY,
  UserID INTEGER REFERENCES users(id),
  BookID INTEGER REFERENCES books(id),
  status VARCHAR(50),
  address VARCHAR(255),
  postal_code VARCHAR(20),
  city VARCHAR(100),
  province VARCHAR(100)
);
