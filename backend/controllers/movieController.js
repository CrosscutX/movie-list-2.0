const List = require("../models/list");
const Movie = require("../models/movie");
const asyncHandler = require("express-async-handler");

exports.displayListMovies = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Display list's movies" });
});

exports.createNewMovie = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Create New Movie" });
});

exports.deleteMovie = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Delete Movie From List" });
});

exports.updateMovie = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Update Movie In List" });
});
