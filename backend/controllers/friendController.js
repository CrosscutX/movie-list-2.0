const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.getFriends = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!validateID(id)) {
    return res.status(404).json({ error: "User doesnt exist" });
  }

  const user = await User.findById(id);

  const friendIDS = [];

  // Loops through users friends and adds them to friendsIDS to send to frontend
  for (const friend of user.friends) {
    friendIDS.push(friend._id);
  }

  res.status(200).json(friendIDS);
});

exports.addFriend = asyncHandler(async (req, res, next) => {
  const { id, friendId } = req.params;

  if (!validateID(id, friendId)) {
    return res.status(404).json({ error: "User doesnt exist" });
  }

  const user = await User.findById(id);
  const friend = await User.findById(friendId);

  //checks if recievers id is already in users list
  if (user.friends.find((friend) => friend._id == friendId)) {
    return res.status(404).json({ error: "Friend already in friend list" });
  }

  //checks if senders id is already in revievers list
  if (friend.friends.find((friend) => friend._id == id)) {
    return res.status(404).json({ error: "Friend already in friend list" });
  }

  //adding _id to the objects was needed or else the ID would change with every request, not sure why
  const addToUser = {
    _id: friend.id,
    accepted: false,
    sentFrom: user.id,
  };

  const addToFriend = {
    _id: user.id,
    accepted: false,
    sentFrom: user.id,
  };

  user.friends.push(addToUser);
  friend.friends.push(addToFriend);

  user.save();
  friend.save();

  res.status(200).json({ msg: "Friend successfully added" });
});

exports.deleteFriend = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Delete friend from friends list" });
});

exports.acceptFriend = asyncHandler(async (req, res, next) => {
  const { id, friendId } = req.params;

  const user = await User.findById(id);
  const friend = await User.findById(friendId);

  // Loop through friends for both  users and update boolean to true if in eachothers list
  user.friends.forEach((friend) => {
    if (friend._id.toString() === friendId) {
      friend.accepted = true;
    }
  });

  friend.friends.forEach((friend) => {
    if (friend._id.toString() === id) {
      friend.accepted = true;
    }
  });

  await user.save();
  await friend.save();

  res.status(200).json({ user, friend });
});

//Cant think or find a good way to make this into middleware
function validateID(...ids) {
  for (const id of ids) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return false;
    }
  }

  return true;
}
