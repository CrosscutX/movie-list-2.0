require("dotenv").config();
const asyncHandler = require("express-async-handler");

exports.getSearch = asyncHandler(async (req, res, next) => {
  const { movie } = req.params;

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${movie}&r=json&apikey=${process.env.API_KEY}`
    );

    if (!response.ok) {
      res.status(400).json({ msg: "Error fetching from api" });
    }

    const result = await response.json();
    console.log(result);
    if (result.Search.length > 5) {
      const filterResult = result.Search.splice(0, 5);
      res.status(200).json({ filterResult });
    } else {
      res.status(200).json({ result });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

exports.getExtendedSearch = asyncHandler(async (req, res, next) => {
  res.json({ msg: "Get extended search results" });
});
