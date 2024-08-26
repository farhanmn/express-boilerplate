import { SC } from '#helper/statuscode.js'

import { hash } from '#helper/crypto.js'
import { create_token, verify } from '#helper/user.js'
import moment from 'moment'

import userServices from '#services/userServices.js'
import defaultResponse from '#views/defaultResponse.js'
import { errorValue, validateParams } from '#helper/validate.js'

const signUp = async (req, res) => {
  const { user_email, user_password, user_name, user_phone } = req.body
  try {
    validateParams(req.body, ['user_email', 'user_password'])
    const user = await userServices.checkUser({ user_email, user_phone })
    errorValue(user, {
      statusCode: SC.UNPROCESSABLE,
      message: 'User with that email or phone already exists',
    })

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
    const stCode = e.statusCode || SC.SERVER_ERROR
    const message = e.message || 'Could not perform operation at this time'

    return res.status(stCode).json(
      defaultResponse.renderError({
        message,
      })
    )
  }
}

const signIn = async (req, res) => {
  const { user_email, user_phone, user_password } = req.body
  try {
    validateParams(req.body, ['user_email', 'user_password'])

    const user = await userServices.checkUser({ user_email, user_phone })

    errorValue(!user, {
      statusCode: SC.UNAUTHORIZED,
      message: 'User with that email or phone does not exist',
    })

    const verifyData = verify(user, { user_password })

    errorValue(!verifyData, {
      statusCode: SC.UNAUTHORIZED,
      message: 'Email or password is incorrect',
    })

    await userServices.updateUser({
      user_id: user.user_id,
      user_last_login_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    })

    user.token = create_token(verifyData)
    return res.status(SC.OK).json(defaultResponse.renderData(user))
  } catch (e) {
    console.log(e)
    const stCode = e.statusCode || SC.SERVER_ERROR
    const message = e.message || 'Could not perform operation at this time'

    return res.status(stCode).json(
      defaultResponse.renderError({
        message,
      })
    )
  }
}

export default { signUp, signIn }
