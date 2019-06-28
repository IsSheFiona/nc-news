const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router.js");
const {
  handleCustomErrors,
  handleNotFoundPsqlErrors,
  handleOtherPsqlErrors,
  serverError
} = require("./errors/index.js");

app.use(express.json());
app.use("/api", apiRouter);
app.use("/*", (req, res) => {
  res.status(404).send({ msg: "Page not found." });
});

app.use(handleCustomErrors);
app.use(handleNotFoundPsqlErrors);
app.use(handleOtherPsqlErrors);
app.use(serverError);

module.exports = app;
