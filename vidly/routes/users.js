const express = require("express");
const { User, validateUser } = require("../models/userModel");
const router = express.Router();

// create a new user
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //check if a user exists
  const checkUser = await User.findOne({ email: req.body.email });
  if (checkUser) return res.status(400).send("user already registered");

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();
  res.send(user);
});

module.exports = router;
