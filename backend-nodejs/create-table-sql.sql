CREATE TABLE movies_db.Movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Title VARCHAR(255),
  Type VARCHAR(100),
  Year INT,
  imdbID VARCHAR(20),
  button VARCHAR(20),
);

CREATE TABLE movies.Posters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movieId INT,
  base64_data TEXT
);
