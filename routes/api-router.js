const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router.js");
const usersRouter = require("./users-router.js");
const articlesRouter = require("./articles-router.js");
const commentsRouter = require("./comments-router.js");

apiRouter
  .route("/")
  .get(() => console.log("at api"))
  .all((req, res) => {
    res.status(405).send({ msg: "Sorry that method is not happening" });
  });
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
