DROP TABLE IF EXISTS libraries CASCADE;
CREATE TABLE libraries (
  id SERIAL PRIMARY KEY,
  UserID INTEGER REFERENCES users(id),
  name VARCHAR(255),
  cover_photo VARCHAR(255),
  status VARCHAR(50),
  address VARCHAR(255),
  postal_code VARCHAR(20),
  city VARCHAR(100),
  province VARCHAR(100)
);
