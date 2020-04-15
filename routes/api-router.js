const express = require("express");
const apiRouter = express.Router();
const { topicsRouter } = require("./topics_router");
const { usersRouter } = require("./user_router");
const { articlesRouter } = require("./article_router");
const { commentsRouter } = require("./comments_router");
const { getAllEndpoints } = require("../controllers/api");

apiRouter.route("/").get(getAllEndpoints);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = { apiRouter };
