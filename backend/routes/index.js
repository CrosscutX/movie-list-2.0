const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ msg: "Welcome to the app" });
});

module.exports = router;
