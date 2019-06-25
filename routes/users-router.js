const usersRouter = require("express").Router();
const { sendUserByUsername } = require("../controllers/users-controller.js");

usersRouter.route("/");
console.log("send users");

usersRouter.route("/:username").get(sendUserByUsername);

module.exports = usersRouter;
