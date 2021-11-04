const mongoose = require("mongoose");
const Joi = require("joi");
const { genresSchema } = require("./genresModel");

const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    genre: { type: genresSchema, required: true },
    numberInStock: { type: Number, required: true, default: 0, min: 0 },
    dailyRentalRate: { type: Number, required: true, default: 0, min: 0 },
  })
);

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    genre: Joi.string().min(3).max(255).required(),
    numberInStock: Joi.number().min(0),
    dailyRentalRate: Joi.number().min(0),
  });

  return schema.validate(movie);
};

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;
