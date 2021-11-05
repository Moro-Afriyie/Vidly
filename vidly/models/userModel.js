const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  })
);

const validateUser = (user) => {
  const schema = Joi.Object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(user);
};

module.exports = { User, validateUser };
