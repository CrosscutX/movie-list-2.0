const List = require("../models/list");
const Movie = require("../models/movie");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

exports.getAllLists = asyncHandler(async (req, res, next) => {
  const lists = await List.find({});
  res.status(200).json(lists);
});

exports.displayUserLists = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Display User's Lists" });
});

exports.createUserList = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  const list = new List({
    listName: req.body.listName,
    public: false,
    movies: [],
    createdBy: user._id,
  });

  await list.save();

  user.lists.push(list._id);

  await user.save();

  res.status(200).json(user);
});

exports.deleteUserList = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { listID } = req.body;

  const list = await List.findById(listID);

  const user = await User.findById(id);

  if (user._id != list.createdBy) {
    return res
      .status(404)
      .json({ error: "User doesnt have permission to delete list" });
  }

  //remove list ID from users lists
  if (user.lists.includes(listID)) {
    const listIndex = user.lists.indexOf(listID);
    user.lists.splice(listIndex, 1);
    await List.findByIdAndDelete(listID);
  }

  await user.save();

  res.status(200).json({ user });
});

exports.updateUserList = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Update User List" });
});
