const topicsRouter = require("express").Router();
const { sendTopics } = require("../controllers/topics-controller.js");

topicsRouter
  .route("/")
  .get(sendTopics)
  .all((req, res) => {
    res.status(405).send({ msg: "Sorry that method is not happening" });
  });

module.exports = topicsRouter;
