const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fetch = require("fetch");
const app = express();

app.use(cors());

app.get("/button_1", async (req, res) => {
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
