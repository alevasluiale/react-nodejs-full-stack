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
    const movies = response.data.Search;

    for (const movie of movies) {
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

    res
      .status(200)
      .json({ message: "Movies data and images saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

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
