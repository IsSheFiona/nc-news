const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router.js");

apiRouter.route("/").get(() => console.log("at api"));
apiRouter.use("/topics", topicsRouter);

module.exports = apiRouter;
