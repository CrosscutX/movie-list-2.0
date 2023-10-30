const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const passport = require("passport");

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

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ user });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ message: "Logged out" });
  });
};

exports.newUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  //Runs a query on database to find usernames and emails that are already taken regardless of case, the $options: i flag makes this case insensitive
  const userCheck = await User.find({
    username: { $regex: `${username}`, $options: "i" },
  });

  const emailCheck = await User.find({
    email: { $regex: `${email}`, $options: "i" },
  });

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
  const { id } = req.params;

  const user = await User.findById(id);
  res.status(200).json(user);
});
