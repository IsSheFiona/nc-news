const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router.js");
const usersRouter = require("./users-router.js");
const articlesRouter = require("./articles-router.js");
const commentsRouter = require("./comments-router.js");
const methodNotAllowed = require("../errors/index.js");
const endpoints = require("../endpoints.json");

// app.get('/search', function (req, res) {
//   res.header("Content-Type", 'application/json');
//   res.send(JSON.stringify(data));
// })

apiRouter.route("/").get(function(req, res, next) {
  res.status(200).send(endpoints);
});

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
