const {
  changeCommentVoteCount,
  deleteComment
} = require("../models/comments-models.js");

const updateCommentVoteCount = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  changeCommentVoteCount(comment_id, inc_votes)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(err => next(err));
};

const removeComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then(comment => res.status(204).send({}))
    .catch(next);
};

module.exports = { updateCommentVoteCount, removeComment };
