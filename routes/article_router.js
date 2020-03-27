const express = require('express');
const articlesRouter = express.Router();
const {getArticle, patchArticle, postComment, getAllCommentsByArticleId, getAllArticles} = require('../controllers/articles');

articlesRouter
.route('/')
.get(getAllArticles);

articlesRouter
.route('/:article_id')
.get(getArticle)
.patch(patchArticle)


articlesRouter
.route('/:article_id/comments')
.post(postComment)
.get(getAllCommentsByArticleId)



module.exports = {articlesRouter};


