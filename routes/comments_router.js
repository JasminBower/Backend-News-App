const express = require('express');
const commentsRouter = express.Router();
const {patchVotes, deleteComment} = require('../controllers/comments')


commentsRouter
.route('/:comment_id')
.patch(patchVotes)
.delete(deleteComment)



module.exports = {commentsRouter};