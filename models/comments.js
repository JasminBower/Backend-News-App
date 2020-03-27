const knex = require('../connection');


exports.updatedVotes = (comment_id, inc_votes) => {
    return knex('comments')
    .select('*')
    .where({comment_id})
    .increment('votes', inc_votes)
    .returning('*')
    .then(([comment]) => {
        return comment
    })
};

exports.deleteCommentById = comment_id => {
    return knex('comments')
    .where({comment_id})
    .del()
    .then(noOfDelComments => {
        if(noOfDelComments === 0){
            return Promise.reject({status: 404, msg: 'Comment not found'});
        }
    })
}