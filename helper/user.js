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
    algorithms: process.env.JWT_ALGORITHM
      ? [process.env.JWT_ALGORITHM]
      : ['HS256'],
  },
}

/**
 * Create a JWT token for the given userdata
 * @param {Object} userdata - data to be inserted in the JWT token
 * @param {string} [expires] - override the default expiration of the token
 * @returns {Object} containing the JWT token and the userdata
 */
const create_token = (userdata, expires) => {
  let data = {
    userid: userdata.id,
    username: userdata.name,
  }
  let tokenOptions = jwtConf.signOptions

  if (expires)
    Object.assign({}, tokenOptions, {
      expiresIn: expires,
    })

  let token = sign(data, jwtConf.secret, tokenOptions)
  data.token = token

  return data
}

/**
 * Verify if the given userdata and logindata are valid
 * @param {Object} userdata - data from the database. userdata minimum have password and password_salt
 * @param {Object} logindata - data from the user. logindata minimum have password
 * @returns {Object} userdata if valid, false if not
 */
const verify = (userdata, logindata) => {
  if (!userdata) {
    return false
  }
  if (match(logindata.password, userdata.password, userdata.password_salt)) {
    delete userdata.password
    delete userdata.password_salt
    return userdata
  }
  return false
}

export { create_token, verify }
