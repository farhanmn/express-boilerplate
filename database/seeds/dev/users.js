/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      name: 'userTest',
      email: 'mail@mail.com',
      phone: '0823333333332',
      password:
        'AjnEgE9HTRSMuQlHDGz7w3GxS8A/7qrZBTQ2uFuet8JZAQtWXmJhxJ3l9XW9hTZs+pvJff7iY3Xn/doCJovgsg==',
      password_salt: 'yHNnb4IOiWMqUyJo',
      status: 1,
    },
  ])
}
