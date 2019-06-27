const connection = require("../db/connection.js");

const changeCommentVoteCount = (comment_id, voteObject) => {
  return connection
    .where("comment_id", comment_id)
    .increment("votes", voteObject || 0)
    .returning("*")
    .from("comments")
    .then(([comment]) => {
      if (!comment) {
        return Promise.reject({
          status: 404,
          msg: "Article not found."
        });
      } else return comment;
    });
};

module.exports = { changeCommentVoteCount };

// const changeArticleVoteCount = (article_id, voteObject) => {
//   return connection
//     .where("article_id", article_id)
//     .increment("votes", voteObject || 0)
//     .returning("*")
//     .from("articles")
//     .then(([article]) => {
//       if (!article) {
//         return Promise.reject({
//           status: 404,
//           msg: "Article not found."
//         });
//       } else return article;
//     });
// };
