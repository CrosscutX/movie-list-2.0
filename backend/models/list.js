const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ListSchema = new Schema({
  listName: { type: String, required: true },
  public: { type: Boolean },
  movies: [
    {
      movie: { type: Schema.Types.ObjectId, ref: "movie" },
      watched: { type: Boolean, default: false },
      imdbID: { type: String, required: true },
    },
  ],
  createdBy: { type: String },
});

module.exports = mongoose.model("List", ListSchema);
