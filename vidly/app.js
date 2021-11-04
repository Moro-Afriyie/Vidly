const express = require("express");
const app = express();
const genres = require("./routes/genres");
const mongoose = require("mongoose");
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

app.listen(PORT, () => {
  console.log(`server listening at ${PORT}`);
});
