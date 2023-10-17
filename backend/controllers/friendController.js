const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.getFriends = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Display friends" });
});

exports.addFriend = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Add a new friend to friends list" });
});

exports.deleteFriend = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Delete friend from friends list" });
});

exports.acceptFriend = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Accept friend" });
});

//TEST
