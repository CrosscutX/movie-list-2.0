const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find({});

  res.status(200).json(user);
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const { user } = req.params;

  const users = await User.find({ username: user });

  if (!users) {
    return res.status(404).json({ error: "No user found" });
  }

  res.status(200).json(users);
});

exports.getOneUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User doesnt exist" });
  }

  const user = await User.find({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "User doesnt exist" });
  }

  res.status(200).json(user);
});

exports.newUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const userCheck = await User.find({ username: username });
  const emailCheck = await User.find({ email: email });

  if (userCheck.length > 0) {
    return res.status(404).json({ error: "Username is already taken" });
  }
  if (emailCheck.length > 0) {
    return res.status(404).json({ error: "Email is already in use" });
  }

  const user = await User.create({ username, email, password });

  res.status(200).json(user);
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User doesnt exist" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "User doesnt exist" });
  }

  res.status(200).json(user);
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Post new user" });
});
