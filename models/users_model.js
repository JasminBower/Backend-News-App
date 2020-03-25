const knex = require('../connection');


exports.fetchSingleUser = (username) => {
    return knex('users')
    .select('*')
    .where('users.username', username)
    .then(([user]) => {
        if(!user){
            return Promise.reject()
        }
        return user
    })


   

}