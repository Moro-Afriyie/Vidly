const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: { type: String, required: true, trim: true, min: 5, max: 50 },
    email: { type: String, required: true, unique: true, min: 5, max: 255 },
    password: { type: String, required: true, min: 8, max: 1024 },
  })
);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(8).max(1024).required(),
  });

  return schema.validate(user);
};

module.exports = { User, validateUser };
