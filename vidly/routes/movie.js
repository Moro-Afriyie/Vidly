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
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send("The movie you entered does not exist ");
    }
    res.send(movie);
  } catch (error) {
    res.status(404).send("The movie you entered does not exist ");
  }
});

router.post("/", async (req, res) => {
  //   const { error } = validateMovie(req.body);
  //   if (error) {
  //     return res.status(400).send(error.details[0].message);
  //   }
  let movie = new Movie({
    title: req.body.title,
    genre: { name: req.body.genre },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: { name: req.body.genre },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  if (!movie) {
    return res.status(404).send("The movie you entered does not exist ");
  }
  res.status(200).send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) {
    return res.status(404).send("The movie you entered does not exist ");
  }
  res.status(200).send("movie deleted succesfully");
});

module.exports = router;
