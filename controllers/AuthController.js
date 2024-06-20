import { SC } from '#helper/statuscode.js'

import { hash } from '#helper/crypto.js'
import { create_token, verify } from '#helper/user.js'
import moment from 'moment'

import userServices from '#services/userServices.js'

const signUp = async (req, res) => {
  const { user_email, user_password, user_name, user_phone } = req.body
  try {
    const user = await userServices.checkUser({ user_email, user_phone })
    if (user) {
      return res.stdJson(
        SC.UNPROCESSABLE,
        null,
        'User with that email or phone already exists'
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
    return res.stdJson(SC.CREATED, null)
  } catch (e) {
    console.log(e)
    return res.stdJson(
      SC.SERVER_ERROR,
      null,
      'Could not perform operation at this time, kindly try again later.'
    )
  }
}

const signIn = async (req, res) => {
  const { user_email, user_phone, user_password } = req.body
  try {
    const user = await userServices.checkUser({ user_email, user_phone })
    if (!user) {
      return res.stdJson(SC.UNAUTHORIZED, null)
    }

    const verifyData = verify(user, { user_password })
    if (!verifyData) {
      return res.stdJson(SC.UNAUTHORIZED, null)
    }

    await userServices.updateUser({
      user_id: user.user_id,
      user_last_login_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    })

    user.token = create_token(verifyData)
    return res.stdJson(SC.OK, user)
  } catch (e) {
    console.log(e)
    return res.stdJson(
      SC.SERVER_ERROR,
      null,
      'Could not perform operation at this time, kindly try again later.'
    )
  }
}

export default { signUp, signIn }
