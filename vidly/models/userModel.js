const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, min: 5, max: 50 },
  email: { type: String, required: true, unique: true, min: 5, max: 255 },
  password: { type: String, required: true, min: 8, max: 1024 },
  isAdmin: { type: Boolean },
});

// method to generate token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    "jwtPrivateKey"
  ); //checks if a user is admin
  return token;
};

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(user);
};

module.exports = { User, validateUser };
