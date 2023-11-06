const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find({});

  res.status(200).json(user);
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  //These need to have the same name, not sure why
  //What you set in the as the dynamic part of the route URL matters because the request then formats it with that name,
  //I think what this is saying is access the user parameter of the requst, you cannot just name it what you want which is what I was trying to do.
  const { user } = req.params;

  //The $regex allows us to indicate were going to be querying with a regular expression, this wont work without it
  //Searches the database for any usernames starting with whats in the user parameter regardless of case
  const users = await User.find({
    username: { $regex: `^${user}`, $options: "i" },
  });

  if (!users) {
    return res.status(404).json({ error: "No user found" });
  }

  res.status(200).json(users);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(404).json("All fields must be filled");
    return;
  }

  const user = await User.findOne({ username });

  if (!user) {
    res.status(404).json("Incorrect username");
    return;
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    res.status(404).json("Incorrect password");
    return;
  }

  // create a token
  const token = createToken(user._id);

  res.status(200).json({ username, token });
});

exports.signUp = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body;

  //Runs a query on database to find usernames and emails that are already taken regardless of case, the $options: i flag makes this case insensitive
  const userCheck = await User.find({
    username: { $regex: `${username}`, $options: "i" },
  });

  const emailCheck = await User.find({
    email: { $regex: `${email}`, $options: "i" },
  });

  if (userCheck.length > 0) {
    return res.status(404).json({ error: "Username is already taken" });
  } else if (emailCheck.length > 0) {
    return res.status(404).json({ error: "Email is already in use" });
  } else if (password.length < 5) {
    return res
      .status(404)
      .json({ error: "Password must be 5 characters long" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: hash });

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  }
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
  const { id } = req.params;

  const user = await User.findById(id);
  res.status(200).json(user);
});
