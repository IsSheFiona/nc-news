const topicsRouter = require("express").Router();
const { sendTopics } = require("../controllers/topics-controller.js");
const { methodNotAllowed } = require("../errors/index.js");

topicsRouter
  .route("/")
  .get(sendTopics)
  .all(methodNotAllowed);

module.exports = topicsRouter;
