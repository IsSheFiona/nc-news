const connection = require("../db/connection.js");

const fetchArticleByArticleId = (article_id, voteObject) => {
  return connection
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .first("articles.*")
    .groupBy("articles.article_id", "comments.article_id")
    .count("comments.article_id AS comment_count")
    .from("articles")
    .where("articles.article_id", article_id)
    .then(article => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: "Article not found."
        });
      } else return article;
    });
};

const changeArticleVoteCount = (article_id, voteObject) => {
  return connection
    .where("article_id", article_id)
    .increment("votes", voteObject || 0)
    .returning("*")
    .from("articles")
    .then(([article]) => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: "Article not found."
        });
      } else return article;
    });
};

const insertCommentOnArticle = (article_id, newComment) => {
  return connection
    .insert({
      body: newComment.body,
      article_id: article_id,
      author: newComment.username,
      votes: 0,
      created_at: "???"
    })
    .into("comments")
    .returning("*")
    .then(([comment]) => comment);
};
const fetchCommentsByArticleId = (article_id, sort_by, order) => {
  return connection
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by || "created_at", "desc");
};
const fetchArticles = () => {
  return connection
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .select("articles.*")
    .from("articles")
    .groupBy("articles.article_id", "comments.article_id")
    .count("comments.article_id AS comment_count");
};

module.exports = {
  fetchArticleByArticleId,
  changeArticleVoteCount,
  insertCommentOnArticle,
  fetchCommentsByArticleId,
  fetchArticles
};
