const express = require("express");
const app = express();
const genres = require("./routes/genres");
const mongoose = require("mongoose");
const customers = require("./routes/customers");
const movies = require("./routes/movie");
const rentals = require("./routes/rentals");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
PORT = 8000;

/**
 * // Database connection
mongoose.connect('mongodb://127.0.0.1:27017/geeksforgeeks', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
  
 */
mongoose
  .connect("mongodb://localhost:27017/vidly", {
    useUnifiedTopology: true,
  })
  .then((res) => console.log("connected to mongoDB"))
  .catch((err) => console.log("unable to connect to mongoDB"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/genres", genres);

app.use("/api/customers", customers);

app.use("/api/movies", movies);

app.use("/api/rentals", rentals);

app.listen(PORT, () => {
  console.log(`server listening at ${PORT}`);
});
