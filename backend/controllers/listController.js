const List = require("../models/list");
const Movie = require("../models/movie");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const movie = require("../models/movie");

exports.getAllLists = asyncHandler(async (req, res, next) => {
  const lists = await List.find({});
  res.status(200).json(lists);
});

exports.displayUserLists = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user.lists.length > 0) {
    const allList = await List.findById(user.lists[0]);
    const allMovieList = allList.movies;
    let currentList;
    for (let i = 1; i < user.lists.length; i++) {
      currentList = await List.findById(user.lists[i]);
      currentList = currentList.movies;
      for (let j = 0; j < allMovieList.length; j++) {
        for (let l = 0; l < currentList.length; l++) {
          if (allMovieList[j].movie !== currentList[l].movie) {
            allList.movies.push(currentList[l]);
            await allList.save();
          }
        }
      }
    }
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
  let { listID, friendsID } = req.params;
  let userID = req.user._id.toString();
  let user = await User.findById(userID);
  let friendUser = await User.findById(friendsID);
  let isFriends = false;

  for (friend of friendUser.friends) {
    if (friend._id.toString() == userID && friend.accepted == true) {
      isFriends = true;
      break;
    }
  }

  if (isFriends == true) {
    let friendList = await List.findById(listID);
    let userListArray = [];
    for (userList of user.lists) {
      userListArray.push(userList.toString());
    }

    let userAllListArray = [];
    let friendListMovieArray = [];

    let userAllList = user.lists[0];
    let actualUserAllList = await List.findById(userAllList);

    for (testMovie of actualUserAllList.movies) {
      userAllListArray.push(testMovie.movie.toString());
    }

    for (friendMovie of friendList.movies) {
      friendListMovieArray.push(friendMovie.movie.toString());
    }

    if (!userListArray.includes(friendList._id.toString())) {
      user.lists.push(friendList._id);
      await user.save();

      for (friendMovie of friendList.movies) {
        if (!userAllListArray.includes(friendMovie.movie.toString())) {
          actualUserAllList.movies.push({
            movie: friendMovie.movie,
            watched: friendMovie.watched,
            imdbID: friendMovie.imdbID,
          });
        }
      }
      await actualUserAllList.save();
      res.status(200).json({ msg: "MEME" });
    } else {
      res.status(400).json({ msg: "Cannot add duplicate lists " });
    }
  } else {
    res.status(400).json({ msg: "Must be accepted friends to inherit list" });
  }
});

exports.deleteUserList = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { listID } = req.body;
  let userID = req.user._id.toString();

  const list = await List.findById(listID);

  const user = await User.findById(id);
  const listCreator = await User.findById(list.createdBy);

  if (list.listName == "all") {
    return res.status(404).json({ error: "Can't delete list with name all" });
  }

  if (userID != list.createdBy) {
    let isFriends = false;

    for (friend of listCreator.friends) {
      if (friend.accepted == true && friend._id == userID) {
        isFriends = true;
        break;
      }
    }

    if (isFriends) {
      await User.findByIdAndUpdate(user._id, { $pull: { lists: list._id } });
      res.status(200).json({ msg: "List deleted from user list" });
    } else if (!isFriends) {
      res
        .status(400)
        .json({ msg: "Cannot delete list from user not in your friends list" });
    } else {
      res.status(400).json({ msg: "Place holder for weird errors" });
    }
  } else if (userID == list.createdBy) {
    await User.updateMany({}, { $pull: { lists: listID } });
    await List.findByIdAndDelete(listID);
    res.status(200).json({ msg: "List deleted by creator" });
  }
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
