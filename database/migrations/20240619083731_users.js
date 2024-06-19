/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('users', function (table) {
    table.uuid('user_id', 36).primary().defaultTo(knex.fn.uuid())
    table.string('user_name', 255).notNullable()
    table.string('user_email', 255).notNullable()
    table.string('user_phone', 255).notNullable()
    table.string('user_password', 255).notNullable()
    table.string('user_password_salt', 255).nullable()
    table.tinyint('user_status').defaultTo(1)
    table.timestamp('user_last_login_at').defaultTo(knex.fn.now()).notNullable()
    table.string('user_last_ip_address', 255).nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').nullable()
    table.tinyint('is_deleted').defaultTo(0)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('users')
}
