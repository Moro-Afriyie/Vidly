const express = require("express");
const { User } = require("../models/userModel");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

// create a new user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //check if a user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password"); //if user doesn't exit

  // validate password
  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatePassword)
    return res.status(400).send("Invalid email or password");

  res.send(true);
});

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(req);
};

module.exports = router;
