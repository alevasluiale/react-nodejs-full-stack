const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql");
const app = express();

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

// Endpoint to fetch movies data from 3rd-party URL and save poster image URLs
app.get("/button_1", async (req, res) => {
  try {
    // Replace 'https://example.com/movies' with the actual URL to fetch movies data from the 3rd-party API
    const response = await axios.get(
      "http://www.omdbapi.com/?s=Matrix&apikey=720c3666"
    );
    const moviesFromApi = response.data.Search;

    const uniqueMovies = await getUniqueMovies(moviesFromApi);

    for (const movie of uniqueMovies) {
      const { Poster, Title, Type, Year, imdbID } = movie;
      const imageUrl = await fetchAndSavePosterImage(Poster);
      const insertQuery =
        "INSERT INTO Movies (Title, Type, Year, imdbID) VALUES (?, ?, ?, ?)";
      db.query(insertQuery, [Title, Type, Year, imdbID], (err, result) => {
        if (err) {
          throw err;
        }
        const movieId = result.insertId;
        const insertImageUrlQuery =
          "INSERT INTO Posters (movieId, PosterUrl) VALUES (?, ?)";
        db.query(insertImageUrlQuery, [movieId, imageUrl], (err) => {
          if (err) {
            throw err;
          }
        });
      });
    }

    const selectMovieQuery =
      "SELECT Movies.*, Posters.PosterUrl FROM Movies INNER JOIN Posters ON Movies.id = Posters.movieId";
    const dbMovies = db.query(selectMovieQuery, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const moviesArray = results.map((movie) => ({
          id: movie.id,
          Title: movie.Title,
          Type: movie.Type,
          Year: movie.Year,
          imdbID: movie.imdbID,
          Poster: movie.PosterUrl, // Include the PosterUrl in the response
        }));

        console.log(moviesArray);
        res.status(200).json(moviesArray);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
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

// Helper function to fetch and save the poster image in PosterImages table
async function fetchAndSavePosterImage(posterUrl) {
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

app.get("/button_4", async (req, res) => {
  try {
    const thirdPartyURL = "http://www.omdbapi.com/?s=Matrix&apikey=720c3666";
    const response = await axios.get(thirdPartyURL);

    res.json(response.data.Search);
  } catch (error) {
    console.error("Error fetching data from the third-party URL:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch data from the third-party URL" });
  }
});

app.get("/button_2", async (req, res) => {
  try {
    const thirdPartyURL =
      "http://www.omdbapi.com/?s=Matrix%20Reloaded&apikey=720c3666 ";
    const response = await axios.get(thirdPartyURL);

    res.json(response.data.Search);
  } catch (error) {
    console.error("Error fetching data from the third-party URL:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch data from the third-party URL" });
  }
});

app.get("/button_3", async (req, res) => {
  try {
    const thirdPartyURL =
      "http://www.omdbapi.com/?s=Matrix%20Revolutions&apikey=720c3666";
    const response = await axios.get(thirdPartyURL);

    res.json(response.data.Search);
  } catch (error) {
    console.error("Error fetching data from the third-party URL:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch data from the third-party URL" });
  }
});

// Start the server
const port = 4005;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
