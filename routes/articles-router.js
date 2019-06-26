const articlesRouter = require("express").Router();
const {
  sendArticleByArticleId,
  updateArticleVoteCount,
  addCommentToArticle,
  sendCommentsByArticleId
} = require("../controllers/articles-controller.js");

articlesRouter.route("/");
console.log("send articles");

articlesRouter
  .route("/:article_id")
  .get(sendArticleByArticleId)
  .patch(updateArticleVoteCount);

articlesRouter
  .route("/:article_id/comments")
  .post(addCommentToArticle)
  .get(sendCommentsByArticleId);

module.exports = articlesRouter;
