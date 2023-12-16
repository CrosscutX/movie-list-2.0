const List = require("../models/list");
const Movie = require("../models/movie");
const asyncHandler = require("express-async-handler");

exports.getAllMovies = asyncHandler(async (req, res, next) => {
  const movies = await Movie.find({});

  res.status(200).json(movies);
});

exports.getList = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const selectedList = await List.findById(id);

  res.status(200).json(selectedList);
});

exports.getMovieInfo = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);

  res.status(200).json(movie);
});

exports.addNewMovie = asyncHandler(async (req, res, next) => {
  // ID of list movie is being added to
  const { id } = req.params;
  const { imdbID } = req.body;

  let newMovie;

  try {
    // Check database for existing movie
    const existingMovie = await Movie.findOne({ imdbID });

    if (!existingMovie) {
      // If movie not in database call omdb
      const response = await fetch(
        `http://www.omdbapi.com/?i=${imdbID}&r=json&apikey=${process.env.API_KEY}`
      );

      if (!response.ok) {
        res.status(400).json({ msg: "Error fetching from api" });
      }

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
        genre: result.Genre,
      });
      await newMovie.save();
    } else {
      // If movie exists use that instead
      newMovie = existingMovie;
    }

    let thisList = await List.findById(id);
    let duplicateCheck = false;

    for (let i = 0; i < thisList.movies.length; i++) {
      console.log(thisList.movies[i].imdbID);
      if (thisList.movies[i].imdbID === imdbID) {
        duplicateCheck = true;
      }
    }

    // Add movie to user list
    if (duplicateCheck === false) {
      // await List.findByIdAndUpdate(id, {
      //   $push: {
      //     movies: {
      //       movie: newMovie._id,
      //       watched: false,
      //       imdbID: newMovie.imdbID,
      //     },
      //   },
      // });

      res.status(200).json({ msg: "Movie added to list" });
    } else {
      res.status(400).json({ msg: "Movie already in list" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

exports.deleteMovie = asyncHandler(async (req, res, next) => {
  const { listID, movieID } = req.params;

  //Searches for list that matches listID
  const list = await List.findById(listID);
  //Searches list to see if movie exists in movie array
  const movieIndex = list.movies.indexOf(movieID);

  //indexOf returns -1 if not found, so if movie is found remove it from the list if not return without doing anything
  if (movieIndex != -1) {
    list.movies.splice(movieIndex, 1);
    await list.save();
    res.status(200).json({ msg: "Movie was deleted from users list" });
  } else {
    res.status(404).json({ msg: "Movie or list was not found" });
  }
});

exports.updateMovie = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Update Movie In List" });
});
