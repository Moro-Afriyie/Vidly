const express = require("express");
const router = express.Router();
const Genre = require("../models/genresModel");

router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find({});
    res.send(genres);
  } catch (error) {
    res.send("an error occured");
  }
});

router.get("/:genre", async (req, res) => {
  try {
    const genre = await Genre.findOne({ name: req.params.genre });
    if (!genre) {
      return res.status(404).send("The genre you entered does not exist ");
    }
    res.send(genre);
  } catch (error) {
    res.status(404).send("The genre you entered does not exist ");
  }
});

router.post("/", (req, res) => {
  if (!req.body.name) {
    return res.status(404).send("Enter a genre ");
  }
  const genre = new Genre({ name: req.body.name });
  genre.save();
  res.send(genre);
});

router.delete("/:genre", async (req, res) => {
  const genre = await Genre.findOneAndDelete({ name: req.params.genre });
  if (!genre) {
    return res.status(404).send("The genre you entered does not exist ");
  }
  genre.save();
});

module.exports = router;
