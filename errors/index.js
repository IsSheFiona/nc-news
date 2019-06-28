const handleCustomErrors = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(err);
  } else next(err);
};

const handleNotFoundPsqlErrors = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "Not found." });
  } else next(err);
};

const handleOtherPsqlErrors = (err, req, res, next) => {
  const errorObj = {
    "22P02": "Invalid request.",
    23502: "Invalid request.",
    42703: "Invalid request."
  };
  if (errorObj[err.code]) {
    res.status(400).send({ msg: errorObj[err.code] });
  } else next(err);
};

const serverError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};

const methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Sorry that method is not happening" });
};

module.exports = {
  handleCustomErrors,
  handleNotFoundPsqlErrors,
  handleOtherPsqlErrors,
  serverError,
  methodNotAllowed
};
