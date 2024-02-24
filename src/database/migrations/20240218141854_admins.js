/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("admins", function (table) {
        table.increments('id');
        table.string('nome',255).notNullable();
        table.string('email', 255).notNullable();
        table.integer('senha', 20).notNullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
