import { StatusCodes as SC } from 'http-status-codes'
import jwt from 'jsonwebtoken'
const { verify } = jwt

import defaultResponse from '#helper/response.js'

import userServices from '#services/userServices.js'

const jwtConf = {
  secret: process.env.JWT_SECRET || 'secret',
  verifyOptions: {
    algorithms: process.env.JWT_ALGORITHM
      ? [process.env.JWT_ALGORITHM]
      : ['HS256'],
  },
}

/**
 * Middleware to verify user access token
 * @param {object} router - the express router
 * @function
 * @name useraccess
 * @description
 * This middleware is used to verify the user access token.
 * It checks if the token is valid and if the user is active.
 * If the token is invalid or the user is not active, it returns 401 Unauthorized.
 * If the token is valid and the user is active, it sets the req.access object with the user data.
 */
const useraccess = (router) => {
  router.use(async function (req, res, next) {
    let token =
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.headers['authorization'] ||
      req.get('x-access-token') ||
      req.headers['token'] ||
      req.get('authorization')

    if (token && token !== '') {
      token = token.replace('Bearer ', '')

      try {
        const decoded = verify(token, jwtConf.secret, jwtConf.verifyOptions)
        decoded.expx = decoded.exp
        if (decoded.iat) delete decoded.iat
        if (decoded.exp) delete decoded.exp
        if (decoded.userid) {
          const profile = await userServices.getProfile({
            id: decoded.userid,
          })
          if (!profile) {
            return res.status(SC.UNAUTHORIZED).json(
              defaultResponse.renderError({
                message: 'User not found',
              })
            )
          } else {
            if (profile.is_deleted == 1) {
              return res.status(SC.UNAUTHORIZED).json(
                defaultResponse.renderError({
                  message: 'User deleted',
                })
              )
            } else {
              req.access = decoded
              next()
            }
          }
        }
      } catch (err) {
        console.log(err)
        return res.status(SC.UNAUTHORIZED).json(
          defaultResponse.renderError({
            message: 'Invalid token',
          })
        )
      }
    } else {
      if (req.path === '/user/login' || req.path === '/user/register') {
        return next()
      } else {
        return res.status(SC.UNAUTHORIZED).json(
          defaultResponse.renderError({
            message: 'No token provided',
          })
        )
      }
    }
  })
}

export { useraccess }
