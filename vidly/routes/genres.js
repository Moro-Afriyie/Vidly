const express = require("express");
const router = express.Router();
const Genre = require("../models/genresModel");

// const genres = [
//   { id: 1, genre: "action" },
//   { id: 2, genre: "movies" },
//   { id: 3, genre: "horror" },
//   { id: 4, genre: "romance" },
// ];

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
    const genre = await Genre.findOne({ genre: req.params.genre });
    if (!genre) {
      return res.status(404).send("The genre you entered does not exist ");
    }
    res.send(genre);
  } catch (error) {
    res.status(404).send("The genre you entered does not exist ");
  }
});

router.post("/", (req, res) => {
  if (!req.body.genre) {
    return res.status(404).send("Enter a genre ");
  }
  const genre = new Genre({ genre: req.body.genre });
  genre.save();
  res.send(genre);
});

router.delete("/:genre", async (req, res) => {
  const genre = await Genre.findOneAndDelete({ genre: req.params.genre });
  if (!genre) {
    return res.status(404).send("The genre you entered does not exist ");
  }
  genre.save();
  res.send(genre);
});

module.exports = router;
