const List = require("../models/list");
const Movie = require("../models/movie");
const asyncHandler = require("express-async-handler");

exports.displayUserLists = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Display User's Lists" });
});

exports.createUserList = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Create New List" });
});

exports.deleteUserList = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Delete User List" });
});

exports.updateUserList = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Update User List" });
});
