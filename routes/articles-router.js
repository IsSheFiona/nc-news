const articlesRouter = require("express").Router();
const {
  sendArticleByArticleId,
  updateArticleVoteCount
} = require("../controllers/articles-controller.js");

articlesRouter.route("/");
console.log("send articles");

articlesRouter
  .route("/:article_id")
  .get(sendArticleByArticleId)
  .patch(updateArticleVoteCount);

module.exports = articlesRouter;
