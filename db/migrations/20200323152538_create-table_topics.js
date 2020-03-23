
exports.up = function(knex) {
    console.log('making the TOPICSSSS table')
    return knex.schema.createTable('topics', (topicsTable) => {
        topicsTable.string('slug').primary();
        topicsTable.string('description').notNullable();
    })
  
};

exports.down = function(knex) {
    console.log('Dropping the Topics');
    return knex.schema.dropTable('topics')
  
};
