const usersRouter = require("express").Router();
const { sendUserByUsername } = require("../controllers/users-controller.js");

usersRouter.route("/");

usersRouter
  .route("/:username")
  .get(sendUserByUsername)
  .all((req, res) => {
    res.status(405).send({ msg: "Sorry that method is not happening" });
  });

module.exports = usersRouter;
