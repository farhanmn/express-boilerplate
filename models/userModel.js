import knex from '#models/index.js'

const tableName = 'users'

const userModel = {
  getProfile: ({ user_id }) => {
    return knex(tableName).where({ user_id }).first()
  },
  checkUser: ({ user_phone = null, user_email = null }) => {
    return knex(tableName)
      .where(function () {
        this.where('user_phone', user_phone).orWhere('user_email', user_email)
      })
      .first()
  },
  createUser: ({
    user_name,
    user_email,
    user_password,
    user_password_salt,
    user_phone,
  }) => {
    return knex(tableName).insert({
      user_name,
      user_email,
      user_password,
      user_password_salt,
      user_phone,
    })
  },
  updateUser: async ({ user_id, user_last_login_at }) => {
    const update = await knex(tableName)
      .where({ user_id })
      .update({
        user_last_login_at,
      })
      .returning('user_id')
    console.log(update)
    return update
  },
}

export default userModel
