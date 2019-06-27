const { changeCommentVoteCount } = require("../models/comments-models.js");

const updateCommentVoteCount = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  changeCommentVoteCount(comment_id, inc_votes)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(err => next(err));
};

module.exports = { updateCommentVoteCount };
