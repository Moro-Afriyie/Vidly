const express = require("express");
const router = express.Router();
const Genre = require("../models/genresModel");

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

router.post("/", (req, res) => {
  if (!req.body.name) {
    return res.status(400).send("Enter a valid genre ");
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

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) {
    return res.status(404).send("The genre you entered does not exist ");
  }
  res.status(200).send("genre deleted succesfully");
});

module.exports = router;
