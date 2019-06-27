const commentsRouter = require("express").Router();
const {
  updateCommentVoteCount,
  removeComment
} = require("../controllers/comments-controller.js");

commentsRouter
  .route("/:comment_id")
  .patch(updateCommentVoteCount)
  .delete(removeComment);

module.exports = commentsRouter;
