const connection = require("../db/connection.js");

const fetchTopics = () => {
  console.log("fetching topics");
  return connection.select("*").from("topics");
};

module.exports = { fetchTopics };
