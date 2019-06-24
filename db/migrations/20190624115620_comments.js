exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable.string("body").notNullable();
    commentsTable.integer("article_id").references("articles.article_id");
    commentsTable.string("created_by").references("users.username");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.string("created_at");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
