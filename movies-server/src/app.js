const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const Movie = require("./models/movies");
const { verifyAccessToken, roleIdentity } = require("./middleware/auth");
const { capitalizeFirstLetter, getMonth, getYear } = require("./utils/utils");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/movies", verifyAccessToken, roleIdentity, async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "No body found" });
    }

    const { userId } = req.payload;
    const { movieTitle } = req.body;

    if (!movieTitle) {
      return res.status(400).json({ error: "Enter movi title" });
    }

    let moviExist = await Movie.count({
      userId: userId,
      title: capitalizeFirstLetter(movieTitle),
    });

    if (moviExist > 0)
      return res
        .status(400)
        .json({ message: `Already created movie with title ${movieTitle}` });

    const moviDetails = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${movieTitle}`
    );

    if (moviDetails.data.Response == "False") {
      return res.status(400).json({ message: "Movie not found!" });
    }

    const { Title, Released, Genre, Director } = moviDetails.data;

    const movie = new Movie({
      userId,
      title: Title,
      released: Released,
      genre: Genre,
      director: Director,
      createdAt: Math.round(new Date().getTime()),
      month: getMonth(),
      year: getYear(),
    });
    await movie.save();

    return res
      .status(200)
      .json({ message: `Successfully created a movie with title ${Title}` });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});

app.get("/movies", async (req, res) => {
  try {
    const { userId } = req.payload;
    const createdMovies = await Movie.find({ userId }).sort("createdAt");

    return res.status(200).json(createdMovies);
  } catch (error) {
    return res.status(401).send(error.message);
  }
});

module.exports = app;
