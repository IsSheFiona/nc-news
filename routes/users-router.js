const usersRouter = require("express").Router();
const { sendUserByUsername } = require("../controllers/users-controller.js");
const { methodNotAllowed } = require("../errors/index.js");

usersRouter.route("/").all(methodNotAllowed);

usersRouter
  .route("/:username")
  .get(sendUserByUsername)
  .all(methodNotAllowed);

module.exports = usersRouter;
