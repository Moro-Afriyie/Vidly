const mongoose = require("mongoose");

const genresSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Genre = mongoose.model("Genres", genresSchema);

module.exports = Genre;
