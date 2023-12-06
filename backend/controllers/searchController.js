require("dotenv").config();
const asyncHandler = require("express-async-handler");
const Movie = require("../models/movie");

exports.getSearch = asyncHandler(async (req, res, next) => {
  console.log("GetSearch");
  const { movie } = req.params;

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${movie}&r=json&apikey=${process.env.API_KEY}`,
      { method: "POST" }
    );

    if (!response.ok) {
      res.status(400).json({ msg: "Error fetching from api" });
    }

    const result = await response.json();
    if (result.Search !== undefined) {
      if (result.Search.length > 5) {
        const filterResult = result.Search.splice(0, 5);
        res.status(200).json(filterResult);
      } else {
        res.status(200).json(result.Search);
      }
    } else {
      const responseTitle = await fetch(
        `http://www.omdbapi.com/?t=${movie}&r=json&apikey=${process.env.API_KEY}`,
        { method: "POST" }
      );
      const resultTitle = await responseTitle.json();
      console.log(resultTitle);
      if (!responseTitle.ok) {
        res.status(400).json({ msg: "Error fetching from api" });
      }

      res.status(200).json([resultTitle]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

exports.getExtendedSearch = asyncHandler(async (req, res, next) => {
  const { movie } = req.params;

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${movie}&r=json&apikey=${process.env.API_KEY}`
    );

    if (!response.ok) {
      res.status(400).json({ msg: "Error fetching from api" });
    }

    const result = await response.json();
    const filterMovies = result.Search;
    console.log(result);
    res.status(200).json(filterMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

exports.getOneMovie = asyncHandler(async (req, res, next) => {
  const { movie } = req.params;

  const response = await fetch(
    `http://www.omdbapi.com/?i=${movie}&r=json&apikey=${process.env.API_KEY}`
  );

  if (!response.ok) {
    res.status(400).json({ msg: "Error fetching from api" });
  } else {
    const result = await response.json();

    newMovie = new Movie({
      title: result.Title,
      description: result.Plot,
      director: result.Director,
      writers: result.Writer,
      actors: result.Actors,
      release_date: result.Released,
      score: result.Ratings.find(
        (rating) => rating.Source === "Rotten Tomatoes"
      )?.Value,
      boxoffice: result.BoxOffice,
      image: result.Poster,
      imdbID: result.imdbID,
    });

    res.status(200).json(newMovie);
  }
});
