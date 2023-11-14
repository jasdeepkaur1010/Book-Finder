DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE review (
  id SERIAL PRIMARY KEY,
  book_id INTEGER REFERENCES books(book_id),
  user_id INTEGER REFERENCES users(user_id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT
);
