exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", usersTable => {
    usersTable
      .string("username")
      .primary()
      .notNullable();
    usersTable.string("name");
    usersTable.string("avatar_url");
  });
};

exports.down = function(knex, Promise) {
  console.log("users");
  return knex.schema.dropTable("users");
};
