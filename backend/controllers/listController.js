const List = require("../models/list");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

exports.getAllLists = asyncHandler(async (req, res, next) => {
  const lists = await List.find({});
  res.status(200).json(lists);
});

exports.displayUserLists = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  console.log("user" + user);
  if (user.lists.length > 0) {
    res.json(user.lists);
  }
});

exports.createUserList = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let userID = req.user._id.toString();

  if (userID == id) {
    const user = await User.findById(id);

    if (req.body.listName == "all") {
      return res
        .status(404)
        .json({ error: "Cannot create list with name of all" });
    } else {
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
    }
  } else {
    res.status(400).json({ message: "Unauthorized user" });
  }
});

exports.addListFromFriend = asyncHandler(async (req, res, next) => {
  const { listID, friendsID } = req.params;
  const userID = req.user._id.toString();
  const user = await User.findById(userID);
  const friendUser = await User.findById(friendsID);
  let isFriends = false;

  for (friend of friendUser.friends) {
    if (friend._id.toString() == userID && friend.accepted == true) {
      isFriends = true;
      break;
    }
  }

  if (isFriends == true) {
    const friendList = await List.findById(listID);
    user.lists.push(friendList._id);
    await user.save();

    res.status(200).json({ msg: "Friends movie list inherited" });
  } else {
    res.status(400).json({ msg: "Must be accepted friends to inherit list" });
  }
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
  if (list.listName == "all") {
    return res.status(404).json({ error: "Can not delete list with name all" });
  }

  //remove list ID from users lists
  if (user.lists.includes(listID)) {
    const listIndex = user.lists.indexOf(listID);
    user.lists.splice(listIndex, 1);
    await List.findByIdAndDelete(listID);
  }

  await user.save();

  res.status(200).json({ msg: "List deleted" });
});

exports.updateUserList = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { listID, nameChange } = req.body;

  const user = await User.findById(id);
  const userList = await List.findById(listID);

  if (user.lists.includes(listID) && user._id == userList.createdBy) {
    userList.listName = nameChange;

    await userList.save();
    res.status(200).json(userList);
  } else {
    res.status(406).json({ msg: "User ID and list author do not match" });
  }
});

exports.updateUserListShared = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const userList = await List.findById(id);

  if (userList.public === false) {
    userList.public = true;
  } else {
    userList.public = false;
  }

  await userList.save();

  res.status(200).json(userList.public);
});
