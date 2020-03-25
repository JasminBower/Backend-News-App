const knex = require('../connection');


exports.fetchAllTopics= () => {
    return knex('topics')
    .select('*')
};