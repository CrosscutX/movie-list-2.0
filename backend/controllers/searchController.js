require("dotenv").config();
const asyncHandler = require("express-async-handler");
const Movie = require("../models/movie");

exports.getSearch = asyncHandler(async (req, res, next) => {
  const { movie } = req.params;
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

    if (!responseTitle.ok) {
      res.status(400).json({ msg: "Error fetching from api" });
    }

    res.status(200).json([resultTitle]);
  }
});

exports.getExtendedSearch = asyncHandler(async (req, res, next) => {
  const { movie } = req.params;

  const response = await fetch(
    `http://www.omdbapi.com/?s=${movie}&r=json&apikey=${process.env.API_KEY}`
  );

  if (!response.ok) {
    res.status(400).json({ msg: "Error fetching from api" });
  }

  const result = await response.json();
  const movies = result.Search;

  if (movies !== undefined) {
    const filterMovies = await Promise.all(
      movies.map(async (movie) => {
        const newResponse = await fetch(
          `http://www.omdbapi.com/?i=${movie.imdbID}&r=json&apikey=${process.env.API_KEY}`
        );

        if (!newResponse.ok) {
          res.status(400).json({ msg: "Error fetching from api" });
        }

        const result = await newResponse.json();

        const newMovie = new Movie({
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
          genre: result.Genre,
        });
        return newMovie;
      })
    );
    res.status(200).json(filterMovies);
  } else {
    const responseTitle = await fetch(
      `http://www.omdbapi.com/?t=${movie}&r=json&apikey=${process.env.API_KEY}`,
      { method: "POST" }
    );

    if (!responseTitle.ok) {
      res.status(400).json({ msg: "Error fetching from api" });
    }

    const resultTitle = await responseTitle.json();

    const newMovie = new Movie({
      title: resultTitle.Title,
      description: resultTitle.Plot,
      director: resultTitle.Director,
      writers: resultTitle.Writer,
      actors: resultTitle.Actors,
      release_date: resultTitle.Released,
      score: resultTitle.Ratings.find(
        (rating) => rating.Source === "Rotten Tomatoes"
      )?.Value,
      boxoffice: resultTitle.BoxOffice,
      image: resultTitle.Poster,
      imdbID: resultTitle.imdbID,
      genre: resultTitle.Genre,
    });

    res.status(200).json([newMovie]);
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

    const newMovie = new Movie({
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
      genre: result.Genre,
    });

    res.status(200).json(newMovie);
  }
});
