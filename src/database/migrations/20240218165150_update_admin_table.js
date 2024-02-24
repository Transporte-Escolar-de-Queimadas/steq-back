/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable("admins", function (table) {
        // Renomeando a coluna 'nome' para 'name'
        table.renameColumn("nome", "name");
    
        // Mudando o tipo da coluna 'senha' para string
        table.string("senha").alter();
        table.renameColumn("senha", "password");
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
