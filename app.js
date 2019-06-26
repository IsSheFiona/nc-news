const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router.js");
app.use(express.json());
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  // console.log(err);
  if (err.status === 404) {
    res.status(404).send(err);
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "Not found." });
  } else next(err);
});
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid request." });
  } else next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
