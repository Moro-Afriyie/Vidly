const express = require("express");
const router = express.Router();
const { Movie, validateMovie } = require("../models/movieModel");
const { Genre } = require("../models/genresModel");
const { validateId } = require("../helpers/validateId");
const { auth } = require("../middleware/auth");

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

router.post("/", auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  if (req.body.genreId) {
    const { error } = validateId({ Id: req.body.genreId });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findById(req.body.genreId);

    if (!genre) return res.status(400).send("Invalid genre");

    await Movie.findByIdAndUpdate(
      req.params.id,
      {
        genre: {
          _id: genre._id,
          name: genre.name,
        },
      },
      { new: true }
    );
  }

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
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
