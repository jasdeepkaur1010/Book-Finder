DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  sub_id VARCHAR(255),
  email VARCHAR(255),
  isAdministrator BOOLEAN DEFAULT FALSE
);
