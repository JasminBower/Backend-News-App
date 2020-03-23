
exports.up = function(knex) {
    console.log('creating the COMMENTS table');
    return knex.schema.createTable('comments', (commentsTables) => {
        commentsTables.increments('comment_id');
        commentsTables.string('author').references('users.username');
        commentsTables.integer('article_id').references('articles.article_id');
        commentsTables.integer('votes').defaultsTo(0);
        commentsTables.timestamp("created_at").defaultTo(knex.fn.now());
        commentsTables.text('body').notNullable();
    })
  
};

exports.down = function(knex) {
    console.log('dropping the CoMmEntS');
    return knex.schema.dropTable('comments');
  
};
