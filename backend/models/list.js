const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ListSchema = new Schema({
  listName: { type: String, required: true },
  movies: [{ type: Schema.Types.ObjectId, ref: "movie" }],
});

module.exports = mongoose.model("List", ListSchema);
