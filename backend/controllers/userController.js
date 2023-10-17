const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.getUsers = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Get all users" });
});

exports.getOneUser = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Get one user" });
});

exports.newUser = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Post new user" });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Post new user" });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Post new user" });
});
