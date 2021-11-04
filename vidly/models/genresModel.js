const mongoose = require("mongoose");
const Joi = require("joi");

const genresSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Genre = mongoose.model("Genres", genresSchema);

const validateGenre = (name) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(name);
};

module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;
