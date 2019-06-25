const articlesRouter = require("express").Router();
const {
  sendArticleByArticleId
} = require("../controllers/articles-controller.js");

articlesRouter.route("/");
console.log("send articles");

articlesRouter.route("/:article_id").get(sendArticleByArticleId);

module.exports = articlesRouter;
