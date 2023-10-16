const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  director: [{ type: String }],
  writers: [{ type: String }],
  actors: [{ type: String }],
  release_date: { type: Date },
  score: { type: String },
  boxoffice: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("movie", MovieSchema);
