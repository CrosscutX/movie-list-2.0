const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const List = require("../models/list");

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
  const userID = req.user._id.toString();

  //The $regex allows us to indicate were going to be querying with a regular expression, this wont work without it
  //Searches the database for any usernames starting with whats in the user parameter regardless of case
  const users = await User.find({
    //using select with a field afterwards says only return that field from the results, 1 says you want to return, 0 or omitting says not to return it
    username: { $regex: `^${user}`, $options: "i" },
  }).select({ username: 1, _id: 1, lists: 1 });

  if (!users) {
    return res.status(404).json({ error: "No user found" });
  }

  let filterUser = users.filter((u) => u._id != userID);

  res.status(200).json(filterUser);
});

exports.getUserById = asyncHandler(async (req, res, next) => {
  //These need to have the same name, not sure why
  //What you set in the as the dynamic part of the route URL matters because the request then formats it with that name,
  //I think what this is saying is access the user parameter of the requst, you cannot just name it what you want which is what I was trying to do.
  const { id } = req.params;

  //The $regex allows us to indicate were going to be querying with a regular expression, this wont work without it
  //Searches the database for any usernames starting with whats in the user parameter regardless of case
  const user = await User.findById(id).select({
    username: 1,
    _id: 1,
    lists: 1,
    friends: 1,
  });

  if (!user) {
    return res.status(404).json({ error: "No user found" });
  }

  res.status(200).json(user);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(404).json({ error: "All fields must be filled" });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "Incorrect username" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(404).json({ error: "Incorrect password" });
  }

  // create a token
  const token = createToken(user._id);

  const id = user._id;

  res.status(200).json({ id, username, token });
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

    const allList = new List({
      listName: "all",
      public: false,
      movies: [],
      createdBy: user._id,
    });

    await allList.save();
    user.lists.push(allList._id);
    user.save();

    const token = createToken(user._id);

    const id = user._id;

    res.status(200).json({ id, username, token });
  }
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let userID = req.user._id.toString();

  if (userID == id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "User doesnt exist" });
    }

    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({ error: "User doesnt exist" });
    } else {
      //Removes the  user being deleted from anyone that has the user on their friends list
      const friendsOfUser = await User.find({
        //Checks for all users with user being deleted in friends list
        //Matches any array with the id of the deleted user id
        friends: { $elemMatch: { _id: id } },
      });

      await Promise.all(
        friendsOfUser.map(async (user) => {
          //Filtering users list to remove deleted user based on id
          let updatedFriends = user.friends.filter(
            (friend) => friend._id != id
          );
          await user.updateOne({ friends: updatedFriends });
        })
      );

      //Deletes all lists in users list array, including the all list

      await List.deleteMany({ _id: { $in: user.lists } });

      await User.deleteOne({ _id: id });

      res.status(200).json({ message: "User deleted" });
    }
  } else {
    res.status(400).json({ message: "Cannot delete anothers account" });
  }
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  res.status(200).json(user);
});
