const express = require("express");
const articlesRouter = express.Router();
const {
	getArticle,
	patchArticle,
	postComment,
	getAllCommentsByArticleId,
	getAllArticles,
} = require("../controllers/articles");

articlesRouter
	.route("/")
	.get(getAllArticles)
	.all((req, res, next) => {
		res.status(405).send({ msg: "Invalid method!" });
	});

articlesRouter
	.route("/:article_id")
	.get(getArticle)
	.patch(patchArticle)
	.all((req, res, next) => {
		res.status(405).send({ msg: "Invalid method!" });
	});

articlesRouter
	.route("/:article_id/comments")
	.post(postComment)
	.get(getAllCommentsByArticleId)
	.all((req, res, next) => {
		res.status(405).send({ msg: "Invalid method!" });
	});

module.exports = { articlesRouter };
