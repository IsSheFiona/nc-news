exports.formatDate = list => {
  if (!list.length) return [];
  list.forEach(article => {
    article.created_at = new Date(article.created_at).toUTCString();
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

exports.formatComments = (comments, articleRef) => {
  if (!comments.length) return [];
  comments.forEach(comment => {
    comment.author = comment.created_by;
    delete comment.created_by;
    comment.article_id = comment.belongs_to;
    delete comment.belongs_to;
    comment.article_id = articleRef[comment.article_id];
  });
};

// exports.formatOwners = (shopData, ownerRef) => {
//   return shopData.map(shop => {
//     const { owner, ...restOfShop } = shop;
//     const owner_id = ownerRef[owner];
//     return { owner_id, ...restOfShop };
//   });
// };
