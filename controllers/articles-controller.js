const {
  fetchArticleByArticleId,
  changeArticleVoteCount
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
  changeArticleVoteCount(article_id, inc_votes).then(article => {
    res.status(200).send({ article });
  });
};

module.exports = { sendArticleByArticleId, updateArticleVoteCount };
