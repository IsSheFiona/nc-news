exports.formatDate = list => {
  if (!list.length) return [];
  list.forEach(article => {
    article.created_at = new Date(article.created_at);
  });
  return list;
};

exports.makeRefObj = list => {
  if (!list.length) return {};
  const authorRef = {};
  list.forEach(article => {
    authorRef[article.title] = article.article_id;
  });
  return authorRef;
};

exports.formatComments = (comments, articleRef = {}) => {
  if (!comments.length) return [];

  const newComments = comments.map(comment => {
    const newComment = {
      author: comment.created_by,
      article_id: articleRef[comment.belongs_to],
      body: comment.body,
      votes: comment.votes,
      created_at: new Date(comment.created_at)
    };
    return newComment;
  });
  return newComments;
};
