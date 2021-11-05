const express = require("express");
const { User, validateUser } = require("../models/userModel");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { auth } = require("../middleware/auth");

// get a user (authorisation)
router.get("/me", auth, async (req, res) => {
  // since we set the req.user = decoded token in the auth.js we get the id from the payload in the token
  const user = await User.findById(req.user._id).select("-password"); // omit the password
  res.send(user);
});
// create a new user
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //check if a user exists
  const checkUser = await User.findOne({ email: req.body.email });
  if (checkUser) return res.status(400).send("user already registered");

  const user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10); // 10 is the number of times the algorithm is to run
  user.password = await bcrypt.hash(user.password, salt); // generates a hashed password

  await user.save();

  // ommit the password when sending response to the user
  //   _.pick(user, ["name", "email"]); we send only email and name to the user

  // set the headers to jsonwebtoken to allow users to login directly after registering
  const token = user.generateAuthToken();
  //set the header to jsonwebtoken
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
