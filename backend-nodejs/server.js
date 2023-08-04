const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql");
const app = express();
const moviesURL = require("./constants");
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "marius",
  password: "Marius123456@",
  database: "movies_db",
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL database");
});

// Function to check if movies exist in the database and return only unique movies
function getUniqueMovies(moviesFromAPI) {
  return new Promise((resolve, reject) => {
    const query = "SELECT imdbID FROM Movies WHERE imdbID IN (?)";

    db.query(
      query,
      [moviesFromAPI.map((movie) => movie.imdbID)],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          const existingIds = result.map((row) => row.imdbID);
          resolve(
            moviesFromAPI.filter(
              (movie) => !existingIds.includes(movie.imdbID)
            ) || []
          );
        }
      }
    );
  });
}

// Helper function to fetch and save the poster image in Posters table
async function fetchAndSavePosterImage(posterUrl) {
  if (posterUrl === "N/A") {
    return null;
  }
  try {
    const response = await axios.get(posterUrl, {
      responseType: "arraybuffer",
    });
    const imageUrl =
      "data:image/jpeg;base64," +
      Buffer.from(response.data, "binary").toString("base64");
    return imageUrl;
  } catch (err) {
    console.error("Error fetching poster image:", err);
    throw err;
  }
}

// Middleware to fetch movies data from 3rd-party URL and save poster image URLs
const moviesMiddleware = async (req, res, next) => {
  const path = req.path;

  try {
    const response = await axios.get(moviesURL[path]);
    const moviesFromApi = response.data.Search;

    const uniqueMovies = await getUniqueMovies(moviesFromApi);

    for (const movie of uniqueMovies) {
      const { Poster, Title, Type, Year, imdbID } = movie;
      const imageBase64 = await fetchAndSavePosterImage(Poster);
      const insertQuery =
        "INSERT INTO Movies (Title, Type, Year, imdbID,button) VALUES (?, ?, ?, ?,?)";
      db.query(
        insertQuery,
        [Title, Type, Year, imdbID, path],
        (err, result) => {
          if (err) {
            throw err;
          }
          const movieId = result.insertId;
          if (imageBase64) {
            const insertImageUrlQuery =
              "INSERT INTO Posters (movieId, base64_data) VALUES (?, ?)";
            db.query(insertImageUrlQuery, [movieId, imageBase64], (err) => {
              if (err) {
                throw err;
              }
            });
          }
        }
      );
    }

    // const selectMovieQuery =
    //   "SELECT Movies.*, Posters.base64_data FROM Movies INNER JOIN Posters ON Movies.id = Posters.movieId";
    // const dbMovies = db.query(selectMovieQuery, (err, results) => {
    //   if (err) {
    //     console.error(err);
    //     res.status(500).json({ error: "Internal server error" });
    //   } else {
    //     const moviesArray = results.map((movie) => ({
    //       id: movie.id,
    //       Title: movie.Title,
    //       Type: movie.Type,
    //       Year: movie.Year,
    //       imdbID: movie.imdbID,
    //       Poster: movie.base64_data, // Include the PosterUrl in the response
    //     }));

    //     console.log(moviesArray);
    //     res.status(200).json(moviesArray);
    //   }
    // });
    res.status(200).json(moviesFromApi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

app.get("/button_1", moviesMiddleware);
app.get("/button_2", moviesMiddleware);
app.get("/button_3", moviesMiddleware);

// Start the server
const port = 4005;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
