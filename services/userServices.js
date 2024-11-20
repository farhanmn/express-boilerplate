import _ from 'lodash'
import userModel from '#models/userModel.js'

const userServices = {
  getProfile: ({ id }) => {
    return userModel.getProfile({ id })
  },
  checkUser: async ({ phone = null, email = null, with_password = false }) => {
    const profile = await userModel.checkUser({ phone, email })
    const omitData = with_password ? [] : ['password', 'password_salt']
    return profile ? _.omit(profile, omitData) : undefined
  },
  createUser: ({ name, email, password, password_salt, phone, status = 0 }) => {
    return userModel.createUser({
      name,
      email,
      password,
      password_salt,
      phone,
      status,
    })
  },
  updateUser: async ({ id, data }) => {
    return userModel.updateUser({ id, ...data })
  },

  delUser: async ({ email }) => {
    return userModel.delUser({ email })
  },
}

export default userServices
