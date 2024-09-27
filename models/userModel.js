import { knex } from '#models/index.js'

const tableName = 'users'

const userModel = {
  getProfile: ({ id }) => {
    return knex(tableName).where({ id }).first()
  },
  checkUser: ({ phone = null, email = null }) => {
    return knex(tableName)
      .where(function () {
        if (phone) this.where('phone', phone)
        if (email) this.orWhere('email', email)
      })
      .first()
  },
  createUser: ({ name, email, password, password_salt, phone, status }) => {
    return knex(tableName)
      .insert({
        name,
        email,
        password,
        password_salt,
        phone,
        status,
      })
      .onConflict('email')
      .merge()
      .returning('id')
  },
  updateUser: async ({ id, ...data }) => {
    const update = await knex(tableName)
      .where({ id })
      .update({ ...data })
      .returning('id')
    return update
  },

  delUser: async ({ email }) => {
    try {
      await knex(tableName).where({ email }).del()
    } catch (error) {
      console.error(error)
    }
  },
}

export default userModel
