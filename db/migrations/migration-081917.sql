\c movies_p3_dev;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL,
  email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  genre VARCHAR(255),
  user_id INT REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS favorites (
  movie_id INT REFERENCES movies(id),
  user_id INT REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  text VARCHAR,
  user_name VARCHAR REFERENCES users(username),
  movie_id INT REFERENCES movies(id)
);