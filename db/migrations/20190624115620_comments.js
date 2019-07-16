exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable.text("body").notNullable();
    commentsTable.integer("article_id").references("articles.article_id");
    commentsTable
      .string("author")
      .references("users.username")
      .notNullable();
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
