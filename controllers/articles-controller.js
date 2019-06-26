const {
  fetchArticleByArticleId,
  changeArticleVoteCount,
  insertCommentOnArticle
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

module.exports = {
  sendArticleByArticleId,
  updateArticleVoteCount,
  addCommentToArticle
};
