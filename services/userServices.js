import userModel from '#models/userModel.js'

const userServices = {
  getProfile: ({ id }) => {
    return userModel.getProfile({ id })
  },
  checkUser: ({ phone = null, email = null }) => {
    return userModel.checkUser({ phone, email })
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
