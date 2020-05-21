const express = require("express");
const app = express();
const cors = require("cors");
const { errorHandler } = require("./errorhandlng");
const { apiRouter } = require("./routes/api-router");

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.use("/*", (req, res, next) => {
	res.status(404).send({ msg: "Path not found" });
});

app.use(errorHandler);

module.exports = app;
