const commentsRouter = require("express").Router();
const {
  updateCommentVoteCount,
  removeComment
} = require("../controllers/comments-controller.js");

commentsRouter
  .route("/:comment_id")
  .patch(updateCommentVoteCount)
  .delete(removeComment)
  .all((req, res) => {
    res.status(405).send({ msg: "Sorry that method is not happening" });
  });

module.exports = commentsRouter;
