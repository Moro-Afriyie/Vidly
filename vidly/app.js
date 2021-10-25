const express = require("express");
const app = express();
const genres = require("./routes/genres");
PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/genres", genres);

app.listen(PORT, () => {
  console.log(`server listening at ${PORT}`);
});
