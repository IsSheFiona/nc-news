const { fetchArticleByArticleId } = require("../models/articles-models.js");

const sendArticleByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleByArticleId(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => next(err));
};

module.exports = { sendArticleByArticleId };
