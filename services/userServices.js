import userModel from '#models/userModel.js'

const userServices = {
  getProfile: ({ user_id }) => {
    return userModel.getProfile({ user_id })
  },
  checkUser: ({ user_phone = null, user_email = null }) => {
    return userModel.checkUser({ user_phone, user_email })
  },
  createUser: ({
    user_name,
    user_email,
    user_password,
    user_password_salt,
    user_phone,
  }) => {
    return userModel.createUser({
      user_name,
      user_email,
      user_password,
      user_password_salt,
      user_phone,
    })
  },
  updateUser: async ({ user_id, user_last_login_at }) => {
    return userModel.updateUser({ user_id, user_last_login_at })
  },
}

export default userServices
