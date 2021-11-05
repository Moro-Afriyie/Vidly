const express = require("express");
const router = express.Router();
const { Genre, validateGenre } = require("../models/genresModel");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find({}).sort("name");
    res.send(genres);
  } catch (error) {
    res.send("an error occured");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      return res.status(404).send("The genre you entered does not exist ");
    }
    res.send(genre);
  } catch (error) {
    res.status(404).send("The genre you entered does not exist ");
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = new Genre({ name: req.body.name });
  genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(
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

// [auth, admin] array of middlewares
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) {
    return res.status(404).send("The genre you entered does not exist ");
  }
  res.status(200).send("genre deleted succesfully");
});

module.exports = router;
