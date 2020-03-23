

exports.up = function(knex) {
    console.log('made the uSeRs table')
    return knex.schema.createTable('users', (userTable) => {
        userTable.string('username').primary();
        userTable.string('avatar_url');
        userTable.string('name').notNullable();
    })
  
};

exports.down = function(knex) {
    console.log('dropped the USERs tble');
    return knex.schema.dropTable('users')
  
};