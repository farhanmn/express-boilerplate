import { SC } from '#helper/statuscode.js'

import { hash } from '#helper/crypto.js'
import { create_token, verify } from '#helper/user.js'
import moment from 'moment'
import defaultResponse from '#views/defaultResponse.js'

import userServices from '#services/userServices.js'

const signUp = async (req, res) => {
  const { user_email, user_password, user_name, user_phone } = req.body
  try {
    const user = await userServices.checkUser({ user_email, user_phone })
    if (user) {
      return res.status(SC.UNPROCESSABLE).json(
        defaultResponse.renderError({
          message: 'User with that email or phone already exists',
        })
      )
    }

    const hashpassword = hash(user_password)
    await userServices.createUser({
      user_name,
      user_email,
      user_password: hashpassword.pwd,
      user_password_salt: hashpassword.salt,
      user_phone,
    })
    return res.status(SC.CREATED).json(defaultResponse.renderCreatedData())
  } catch (e) {
    console.log(e)
    return res.status(SC.SERVER_ERROR).json(
      defaultResponse.renderError({
        message:
          'Could not perform operation at this time, kindly try again later.',
      })
    )
  }
}

const signIn = async (req, res) => {
  const { user_email, user_phone, user_password } = req.body
  try {
    const user = await userServices.checkUser({ user_email, user_phone })
    if (!user) {
      return res.status(SC.UNAUTHORIZED).json(
        defaultResponse.renderError({
          message: 'User with that email or phone does not exist',
        })
      )
    }

    const verifyData = verify(user, { user_password })
    if (!verifyData) {
      return res.status(SC.UNAUTHORIZED).json(
        defaultResponse.renderError({
          message: 'Incorrect password',
        })
      )
    }

    await userServices.updateUser({
      user_id: user.user_id,
      user_last_login_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    })

    user.token = create_token(verifyData)
    return res.status(SC.OK).json(defaultResponse.renderData(user))
  } catch (e) {
    console.log(e)
    return res.status(SC.SERVER_ERROR).json(
      defaultResponse.renderError({
        message:
          'Could not perform operation at this time, kindly try again later.',
      })
    )
  }
}

export default { signUp, signIn }
