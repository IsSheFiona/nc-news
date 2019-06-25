const connection = require("../db/connection.js");

const fetchUserByUsername = username => {
  return connection
    .first("*")
    .from("users")
    .where("username", username)
    .then(user => {
      if (!user) {
        return Promise.reject({
          status: 404,
          msg: "Sorry, this is not a registered user."
        });
      } else return user;
    });
};

module.exports = { fetchUserByUsername };
