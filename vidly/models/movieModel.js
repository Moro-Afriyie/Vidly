const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, required: true, default: 0 },
    dailyRentalRate: { type: Number, required: true, default: 0 },
  })
);

const validateMovie = (movie) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(name);
};

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;
