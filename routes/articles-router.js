const articlesRouter = require("express").Router();
const {
  sendArticleByArticleId,
  updateArticleVoteCount,
  addCommentToArticle,
  sendCommentsByArticleId,
  sendArticles
} = require("../controllers/articles-controller.js");

articlesRouter.route("/").get(sendArticles);

articlesRouter
  .route("/:article_id")
  .get(sendArticleByArticleId)
  .patch(updateArticleVoteCount);

articlesRouter
  .route("/:article_id/comments")
  .post(addCommentToArticle)
  .get(sendCommentsByArticleId);

module.exports = articlesRouter;
