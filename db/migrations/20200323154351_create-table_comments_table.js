
exports.up = function(knex) {
    
    return knex.schema.createTable('comments', (commentsTables) => {
        commentsTables.increments('comment_id');
        commentsTables.string('author').references('users.username');
        commentsTables.integer('article_id').references('articles.article_id').onDelete('CASCADE');
        commentsTables.integer('votes').defaultsTo(0);
        commentsTables.timestamp("created_at").defaultTo(knex.fn.now());
        commentsTables.text('body').notNullable();
    })
  
};

exports.down = function(knex) {
    
    return knex.schema.dropTable('comments');
  
};
