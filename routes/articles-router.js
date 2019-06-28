const articlesRouter = require("express").Router();
const {
  sendArticleByArticleId,
  updateArticleVoteCount,
  addCommentToArticle,
  sendCommentsByArticleId,
  sendArticles
} = require("../controllers/articles-controller.js");
const { methodNotAllowed } = require("../errors/index.js");

articlesRouter
  .route("/")
  .get(sendArticles)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(sendArticleByArticleId)
  .patch(updateArticleVoteCount)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id/comments")
  .post(addCommentToArticle)
  .get(sendCommentsByArticleId)
  .all(methodNotAllowed);

module.exports = articlesRouter;
