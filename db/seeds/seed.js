const ENV = process.env.NODE_ENV || "development";
const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../index.js");

const { formatDate, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsInsertions = knex("topics").insert(topicData);

      const usersInsertions = knex("users").insert(userData);

      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(() => {
      const formattedArticles = formatDate(articleData);
      return knex("articles")
        .insert(formattedArticles)
        .returning("*")
        .then(articleRows => {
          const articleRef = makeRefObj(articleRows);
          const formattedComments = formatComments(commentData, articleRef);
          return knex("comments").insert(formattedComments);
        });
    });
};
