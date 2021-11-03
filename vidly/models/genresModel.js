const mongoose = require("mongoose");

const genresSchema = new mongoose.Schema({
  genre: { type: String, required: true },
});

const Genre = mongoose.model("Genres", genresSchema);

module.exports = Genre;
