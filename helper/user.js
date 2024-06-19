import jwt from 'jsonwebtoken'

import { match } from '#helper/crypto.js'
const { sign } = jwt

const jwtConf = {
  secret: process.env.JWT_SECRET || 'secret',
  refresh_secret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
  signOptions: {
    algorithm: process.env.JWT_ALGORITHM || 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN || '10d',
  },
  verifyOptions: {
    algorithms: [process.env.JWT_ALGORITHM] || ['HS256'],
  },
}

const create_token = (userdata) => {
  let data = {
    userid: userdata.user_id,
    username: userdata.user_name,
  }
  let token = sign(data, jwtConf.secret, jwtConf.signOptions)
  let tokenRefresh = sign(data, jwtConf.refresh_secret, jwtConf.signOptions)
  data.token = token
  data.tokenRefresh = tokenRefresh

  return data
}

const verify = (userdata, logindata) => {
  if (!userdata) {
    return false
  }
  if (
    match(
      logindata.user_password,
      userdata.user_password,
      userdata.user_password_salt
    )
  ) {
    delete userdata.user_password
    delete userdata.user_password_salt
    return userdata
  }
  return false
}

export { create_token, verify }
