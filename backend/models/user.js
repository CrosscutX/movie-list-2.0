const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lists: [{ type: Schema.Types.ObjectId, ref: "list" }],
  friends: [
    {
      friend: { type: Schema.Types.ObjectId, ref: "user" },
      accepted: { type: Boolean },
      sentFrom: { type: String },
    },
  ],
});

UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
