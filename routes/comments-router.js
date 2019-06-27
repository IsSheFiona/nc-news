const commentsRouter = require("express").Router();
const {
  updateCommentVoteCount
} = require("../controllers/comments-controller.js");

commentsRouter.route("/:comment_id").patch(updateCommentVoteCount);

module.exports = commentsRouter;
