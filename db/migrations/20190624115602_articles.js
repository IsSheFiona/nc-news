exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title").notNullable();
    articlesTable.text("body").notNullable();
    articlesTable.string("topic").references("topics.slug");
    articlesTable.string("author").notNullable();
    articlesTable.integer("votes").defaultTo(0);
    articlesTable.string("created_at");
  });
};

exports.down = function(knex, Promise) {
  console.log("articles");
  return knex.schema.dropTable("articles");
};
