const express = require("express");
const router = express.Router();
const { Movie, validateMovie } = require("../models/movieModel");

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find({}).sort("name");
    res.send(movies);
  } catch (error) {
    res.send("an error occured");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await Movie.findById(req.params.id);
    if (!genre) {
      return res.status(404).send("The genre you entered does not exist ");
    }
    res.send(genre);
  } catch (error) {
    res.status(404).send("The genre you entered does not exist ");
  }
});

router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let genre = new Movie({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const genre = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  if (!genre) {
    return res.status(404).send("The genre you entered does not exist ");
  }
  res.status(200).send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Movie.findByIdAndRemove(req.params.id);
  if (!genre) {
    return res.status(404).send("The genre you entered does not exist ");
  }
  res.status(200).send("genre deleted succesfully");
});

module.exports = router;
