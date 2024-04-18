/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("routes", function (table) {
        table.increments('id');
        table.string('embarkation_place').notNullable();
        table.string('embarkation_time').notNullable();
        table.string('destinations').notNullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('routes')
};
