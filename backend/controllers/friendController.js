const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.getFriends = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Display friends" });
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
    username: friend.username,
    _id: friend.id,
    accepted: false,
  };

  console.log(friend.username);

  const addToFriend = {
    _id: user.id,
    accepted: false,
  };

  user.friends.push(addToUser);
  friend.friends.push(addToFriend);

  // user.save();
  // friend.save();

  res.status(200).json({ user, friend });
});

exports.deleteFriend = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Delete friend from friends list" });
});

exports.acceptFriend = asyncHandler(async (req, res, next) => {
  console.log(req.params);
  // const { id, friendId } = req.params;
  // if (!validateID(id, friendId)) {
  //   return res.status(404).json({ error: "User doesnt exist" });
  // }
  // const user = await User.findById(id);
  // const friend = await User.findById(friendId);
  //makes sure each person is in the opposites friendlist already
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
