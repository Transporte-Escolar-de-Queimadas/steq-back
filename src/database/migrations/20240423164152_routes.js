/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("notices", function (table) {
        table.increments('id');
        table.string('title').notNullable();
        table.string('data').notNullable();
        table.string('description').notNullable();
        table.boolean('edited').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('notices')
};
