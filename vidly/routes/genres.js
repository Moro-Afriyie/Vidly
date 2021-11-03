const express = require("express");
const router = express.Router();
const Genre = require("../models/genresModel");

const genres = [
  { id: 1, genre: "action" },
  { id: 2, genre: "movies" },
  { id: 3, genre: "horror" },
  { id: 4, genre: "romance" },
];

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
    const genre = await Genre.find({ name: req.params.genre });
    if (!genre) {
      res.status(404).send("The genre you entered does not exist ");
    }
    res.send(genre);
  } catch (error) {
    res.status(404).send("The genre you entered does not exist ");
  }
});

router.post("/", (req, res) => {
  if (!req.body.genre) {
    res.status(404).send("Enter a genre ");
  }
  const genre = new Genre({ name: genre });
  res.send(genre);
});

router.delete("/:genre", (req, res) => {
  const newGenre = genres.find((c) => c.genre === req.params.genre);
  if (!newGenre) {
    res.status(404).send("The genre you entered does not exist ");
  }
  const index = genres.indexOf(newGenre);
  genres.splice(index, 1);
  res.send(genres);
});

module.exports = router;
