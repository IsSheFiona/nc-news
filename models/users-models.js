const connection = require("../db/connection.js");

const fetchUserByUsername = username => {
  return connection
    .first("*")
    .from("users")
    .where("username", username);
};

module.exports = { fetchUserByUsername };
