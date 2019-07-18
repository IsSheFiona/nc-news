const connection = require("../db/connection.js");
const {
  fetchArticleByArticleId,
  changeArticleVoteCount,
  insertCommentOnArticle,
  fetchCommentsByArticleId,
  fetchArticles,
  fetchArticleCount
} = require("../models/articles-models.js");

const checkExists = (value, table, column) => {
  return connection
    .select("*")
    .from(table)
    .where(column, value)
    .then(rows => {
      return rows.length !== 0;
    });
};

const sendArticleByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleByArticleId(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

const updateArticleVoteCount = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  changeArticleVoteCount(article_id, inc_votes)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

const addCommentToArticle = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;
  insertCommentOnArticle(article_id, newComment)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

const sendCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id, req.query)
    .then(comments => {
      const articleExists = article_id
        ? checkExists(article_id, "articles", "article_id")
        : null;
      return Promise.all([articleExists, comments]);
    })
    .then(([articleExists, comments]) => {
      if (articleExists === false)
        return Promise.reject({ status: 404, msg: "Not found." });
      else res.status(200).send({ comments });
    })
    .catch(next);
};

const sendArticles = (req, res, next) => {
  const { author, topic } = req.query;
  Promise.all([fetchArticles(req.query), fetchArticleCount()])
    // fetchArticles(req.query)
    .then(([articles, articleCount]) => {
      const authorExists = author
        ? checkExists(author, "users", "username")
        : null;
      const topicExists = topic ? checkExists(topic, "topics", "slug") : null;
      return Promise.all([authorExists, topicExists, articles, articleCount]);
    })
    .then(([authorExists, topicExists, articles, articleCount]) => {
      if (authorExists === false || topicExists === false)
        return Promise.reject({ status: 404, msg: "Not found." });
      else res.status(200).send({ articles, articleCount });
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
