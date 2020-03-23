
exports.up = function(knex) {
    console.log('creating the article table');
    return knex.schema.createTable('articles', (articleTable) => {
        articleTable.increments('article_id');
        articleTable.string('title').notNullable();
        articleTable.body('body').notNullable();
        articleTable.bigInteger('votes').defaultTo('0');
        articleTable


    })
  
};

exports.down = function(knex) {
    console.log('dropping the article table');
  
};
