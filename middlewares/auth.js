import moment from 'moment'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { StatusCodes as SC } from 'http-status-codes'

import { verify } from '#helper/user.js'
import { create_token } from '#helper/user.js'
import userServices from '#services/userServices.js'

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

export { auth }
