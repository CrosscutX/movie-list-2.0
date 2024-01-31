const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

// Require controller modules
const userController = require("../controllers/userController");
const listController = require("../controllers/listController");
const searchController = require("../controllers/searchController");
const movieController = require("../controllers/movieController");
const friendController = require("../controllers/friendController");

/// USER ROUTES ///

//Get all users
router.get("/users", requireAuth, userController.getAllUsers);
// Get users for friend requests
router.get("/users/search/:user", requireAuth, userController.getUsers);
// User by id
router.get("/users/:id", requireAuth, userController.getUserById);
// Login
router.post("/login", userController.login);
// Create a user during signup
router.post("/signup", userController.signUp);
// Delete a user
router.delete("/users/:id", requireAuth, userController.deleteUser);
// Update a user
router.patch("/users/:id", requireAuth, userController.updateUser);

/// LIST ROUTES ///

//Get all lists
router.get("/lists", requireAuth, listController.getAllLists);
// Get user's lists
router.get("/lists/:id", requireAuth, listController.displayUserLists);

// Post new list
router.post("/lists/:id", requireAuth, listController.createUserList);
// Get a friends list
router.post(
  "/lists/:listID/friends/:friendsID",
  requireAuth,
  listController.addListFromFriend
);
// delete user list
router.delete("/lists/:id", requireAuth, listController.deleteUserList);
// update user list
router.patch("/lists/:id", requireAuth, listController.updateUserList);

router.patch(
  "/lists/public/:id",
  requireAuth,
  listController.updateUserListShared
);

///MOVIE ROUTES ///

//NOTES ADD MOVIES TO LIST DELETE MOVIES FROM LIST

// Get all movies
router.get("/movies", requireAuth, movieController.getAllMovies);
// Get specific movies to the designated list id
router.get("/movies/:id", requireAuth, movieController.getList);
// Get the watched value of a movie in a list
router.get(
  "/lists/:listID/movies/:movieID",
  requireAuth,
  movieController.getWatched
);
// Get all of the info from a singular movie
router.get("/movies/info/:id", requireAuth, movieController.getMovieInfo);
// Post new movie to list
router.post("/lists/:id/movies", requireAuth, movieController.addNewMovie);
// delete movie from list
router.delete(
  "/lists/:listID/movies/:movieID",
  requireAuth,
  movieController.deleteMovie
);
// update movie watched value in list
router.patch(
  "/lists/:listID/movies/:movieID",
  requireAuth,
  movieController.updateWatched
);

/// SEARCH ROUTES ///

// Initial search results for search bar
router.post("/search/:movie", requireAuth, searchController.getSearch);
// Search results for the search page
router.post(
  "/searchExtended/:movie",
  requireAuth,
  searchController.getExtendedSearch
);
//Return one movie info when clicked on search page
router.post("/searchOne/:movie", requireAuth, searchController.getOneMovie);

/// FRIEND ROUTES ///

// Get friends on friends list
router.get("/users/:id/friends", requireAuth, friendController.getFriends);
// Add new friend
router.post(
  "/users/:id/friends/:friendId",
  requireAuth,
  friendController.addFriend
);
// Delete friend
router.patch(
  "/users/:id/friends/:friendId/remove",
  requireAuth,
  friendController.deleteFriend
);
// Change the friend accepted boolean to true
router.patch(
  "/users/:id/friends/:friendId",
  requireAuth,
  friendController.acceptFriend
);

module.exports = router;
