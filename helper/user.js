import jwt from 'jsonwebtoken'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { StatusCodes as SC } from 'http-status-codes'

import { match } from '#helper/crypto.js'
const { sign } = jwt

import userServices from '#services/userServices.js'
import moment from 'moment'

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

  data.token = sign(data, jwtConf.secret, tokenOptions)

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

const authLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async function (username, password, done) {
        const user = await userServices.checkUser({
          email: username,
          with_password: true,
        })

        if (!user) {
          return done(null, false, {
            status: false,
            statusCode: SC.BAD_REQUEST,
            message: 'User with that email or phone does not exist',
          })
        }

        if (user.status !== 1) {
          return done(null, false, {
            status: false,
            statusCode: SC.BAD_REQUEST,
            message: 'User is not active',
          })
        }

        if (user.register_with !== 'manual') {
          return done(null, false, {
            status: false,
            statusCode: SC.CONFLICT,
            message:
              'This email has been registered with google. Please use google login',
          })
        }

        const verifyData = verify(user, { password })

        if (!verifyData) {
          return done(null, false, {
            status: false,
            statusCode: SC.UNAUTHORIZED,
            message: 'Incorrect password',
          })
        }

        user.token = create_token(verifyData)
        await userServices.updateUser({
          id: user.id,
          data: {
            last_login_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          },
        })

        return done(null, user)
      }
    )
  )
}

/**
 * Run passport middleware to handle authentication
 *
 * @function
 */
const auth = () => {
  authLocal()
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, { id: user.id, name: user.username, email: user.email })
    })
  })

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user)
    })
  })
}

export { create_token, verify, auth }
