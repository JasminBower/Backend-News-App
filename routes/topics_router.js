const express = require("express");
const topicsRouter = express.Router();
const { getAllTopics } = require("../controllers/topics");

topicsRouter
	.route("/")
	.get(getAllTopics)
	.all((req, res, next) => {
		res.status(405).send({ msg: "Invalid method!" });
	});

module.exports = { topicsRouter };
