const express = require("express");
const usersRouter = express.Router();
const { getUser } = require("../controllers/users");

usersRouter
	.route("/:username")
	.get(getUser)
	.all((req, res, next) => {
		res.status(405).send({ msg: "Invalid method!" });
	});

module.exports = { usersRouter };
