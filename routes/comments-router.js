const commentsRouter = require("express").Router();
const {
  updateCommentVoteCount,
  removeComment
} = require("../controllers/comments-controller.js");
const { methodNotAllowed } = require("../errors/index.js");

commentsRouter
  .route("/:comment_id")
  .patch(updateCommentVoteCount)
  .delete(removeComment)
  .all(methodNotAllowed);

module.exports = commentsRouter;
