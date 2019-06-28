const connection = require("../db/connection.js");

const changeCommentVoteCount = (comment_id, inc_votes) => {
  return connection
    .where("comment_id", comment_id)
    .increment("votes", inc_votes || 0)
    .returning("*")
    .from("comments")
    .then(([comment]) => {
      if (!comment) {
        return Promise.reject({
          status: 404,
          msg: "Comment not found."
        });
      } else return comment;
    });
};

const deleteComment = comment_id => {
  return connection
    .where("comment_id", comment_id)
    .del()
    .from("comments")
    .then(comment => {
      if (!comment) {
        return Promise.reject({
          status: 404,
          msg: "Comment not found."
        });
      }
    });
};

module.exports = { changeCommentVoteCount, deleteComment };
