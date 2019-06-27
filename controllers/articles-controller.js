const {
  fetchArticleByArticleId,
  changeArticleVoteCount,
  insertCommentOnArticle,
  fetchCommentsByArticleId,
  fetchArticles
} = require("../models/articles-models.js");

const sendArticleByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleByArticleId(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => next(err));
};

const updateArticleVoteCount = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  changeArticleVoteCount(article_id, inc_votes)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => next(err));
};

const addCommentToArticle = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;
  insertCommentOnArticle(article_id, newComment)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(err => next(err));
};

const sendCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id, req.query)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(err => next(err));
};
const sendArticles = (req, res, next) => {
  fetchArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

module.exports = {
  sendArticleByArticleId,
  updateArticleVoteCount,
  addCommentToArticle,
  sendCommentsByArticleId,
  sendArticles
};
