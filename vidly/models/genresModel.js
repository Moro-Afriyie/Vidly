const mongoose = require("mongoose");

const genres = [
  { id: 1, genre: "action" },
  { id: 2, genre: "movies" },
  { id: 3, genre: "horror" },
  { id: 4, genre: "romance" },
];

const genresSchema = new mongoose.Schema({
  genre: { type: String, required: true },
});

const Genre = mongoose.model("Genres", genresSchema);

module.exports = Genre;
