const express = require("express");
const commentsRouter = express.Router();
const { patchVotes, deleteComment } = require("../controllers/comments");

commentsRouter
	.route("/:comment_id")
	.patch(patchVotes)
	.delete(deleteComment)
	.all((req, res, next) => {
		res.status(405).send({ msg: "Invalid method!" });
	});

module.exports = { commentsRouter };
