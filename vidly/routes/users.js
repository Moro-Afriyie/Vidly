const express = require("express");
const { User, validateUser } = require("../models/userModel");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();
  res.send(user);
});

module.exports = router;
