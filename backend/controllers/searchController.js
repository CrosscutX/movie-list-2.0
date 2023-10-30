const asyncHandler = require("express-async-handler");

exports.getSearch = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Get search results" });
});

exports.getExtendedSearch = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Get extended search results" });
});
