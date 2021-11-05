const express = require("express");
const { User, validateUser } = require("../models/userModel");
const router = express.Router();
const _ = require("lodash");

// create a new user
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //check if a user exists
  const checkUser = await User.findOne({ email: req.body.email });
  if (checkUser) return res.status(400).send("user already registered");

  const user = new User(_.pick(req.body, ["name", "email", "password"]));

  await user.save();

  // ommit the password when sending response to the user
  //   _.pick(user, ["name", "email"]); we send only email and name to the user
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
