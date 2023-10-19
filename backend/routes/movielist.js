const express = require("express");
const router = express.Router();

// Require controller modules
const userController = require("../controllers/userController");
const listController = require("../controllers/listController");
const searchController = require("../controllers/searchController");
const movieController = require("../controllers/movieController");
const friendController = require("../controllers/friendController");

/// USER ROUTES ///

// Get users for friend requests
router.get("/users/:params", userController.getUsers);
// Get a single user
router.get("/users/:id", userController.getOneUser);
// Post a new user
router.post("/users", userController.newUser);
// Delete a user
router.delete("/users/:id", userController.deleteUser);
// Update a user
router.patch("/users/:id", userController.updateUser);

/// LIST ROUTES ///

// Get user's lists
router.get("/lists/:id", listController.displayUserLists);
// Post new list
router.post("/lists/:id", listController.createUserList);
// delete user list
router.delete("/lists/:id", listController.deleteUserList);
// update user list
router.patch("/lists/:id", listController.updateUserList);

///MOVIE ROUTES ///
// Get user's lists
router.get("/lists/:id/movies", movieController.displayListMovies);
// Post new list
router.post("/lists/:id/movies", movieController.createNewMovie);
// delete user list
router.delete("/lists/:id/movies/:id", movieController.deleteMovie);
// update user list
router.patch("/lists/:id/movies/:id", movieController.updateMovie);

/// SEARCH ROUTES ///

// Initial search results for search bar
router.get("/search", searchController.getSearch);
// Search results for the search page
router.get("/search/:param", searchController.getExtendedSearch);

/// FRIEND ROUTES ///

// Get friends on friends list
router.get("/users/:id/friends", friendController.getFriends);
// Add new friend
router.post("/users/:id/friends/:friendId", friendController.addFriend);
// Delete friend
router.delete("users/:id/friends/:friendId", friendController.deleteFriend);
// Change the friend accepted boolean to true
router.patch("users/:id/friends/:friendId", friendController.acceptFriend);

module.exports = router;