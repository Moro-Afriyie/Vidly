const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { genresSchema } = require("./genresModel");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    genre: { type: genresSchema, required: true },
    numberInStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 500,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 500,
    },
  })
);

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(500).required(),
    dailyRentalRate: Joi.number().min(0).max(500).required(),
  });

  return schema.validate(movie);
};

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;
