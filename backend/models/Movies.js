const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  Title: {
    type: String,
    required: true,
  },
  Poster: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
    enum: ["watching", "considering", "completed"],
  },
});
module.exports = mongoose.model("Movie", movieSchema);
