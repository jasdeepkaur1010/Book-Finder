DROP TABLE IF EXISTS readlists CASCADE;
CREATE TABLE readlist (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  book_id INTEGER REFERENCES books(book_id)
);