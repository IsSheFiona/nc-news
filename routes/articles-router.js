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
  .patch(updateArticleVoteCount)
  .all((req, res) => {
    res.status(405).send({ msg: "Sorry that method is not happening" });
  });

articlesRouter
  .route("/:article_id/comments")
  .post(addCommentToArticle)
  .get(sendCommentsByArticleId)
  .all((req, res) => {
    res.status(405).send({ msg: "Sorry that method is not happening" });
  });

module.exports = articlesRouter;
