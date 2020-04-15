const {updatedVotes, deleteCommentById} = require('../models/comments')




exports.patchVotes = (req, res, next) => {
    const {comment_id} = req.params;
    const {inc_votes} = req.body;

    updatedVotes(comment_id, inc_votes)
    .then(comment => {
        res.status(200).send({comment})

    })
    .catch(err => {
        next(err)
    })
};


exports.deleteComment = (req, res, next) => {
    const {comment_id} = req.params;
   deleteCommentById(comment_id)
   .then(() => {
       res.sendStatus(204)}
       )
   .catch(err => {
       next(err)
   })
};