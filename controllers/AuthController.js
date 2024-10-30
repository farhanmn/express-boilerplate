import moment from 'moment'

import { SC } from '#helper/statuscode.js'
import { hash } from '#helper/crypto.js'
import { create_token, verify } from '#helper/user.js'
import defaultResponse from '#helper/response.js'
import { errorValue, validateParams } from '#helper/validate.js'

import userServices from '#services/userServices.js'

const signUp = async (req, res) => {
  const { email, password, name, phone } = req.body
  try {
    validateParams(req.body, ['email', 'password'])
    const user = await userServices.checkUser({ email, phone })
    errorValue(user, {
      statusCode: SC.UNPROCESSABLE,
      message: 'User with that email or phone already exists',
    })

    const hashpassword = hash(password)
    await userServices.createUser({
      name,
      email,
      password: hashpassword.pwd,
      password_salt: hashpassword.salt,
      phone,
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
  const { email, phone, password } = req.body
  try {
    validateParams(req.body, ['email', 'password'])

    const user = await userServices.checkUser({ email, phone })

    errorValue(!user, {
      statusCode: SC.UNAUTHORIZED,
      message: 'User with that email or phone does not exist',
    })

    errorValue(user.status === 0, {
      statusCode: SC.UNAUTHORIZED,
      message: 'User is not active',
    })

    const verifyData = verify(user, { password })

    errorValue(!verifyData, {
      statusCode: SC.UNAUTHORIZED,
      message: 'Email or password is incorrect',
    })

    await userServices.updateUser({
      id: user.id,
      data: {
        last_login_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
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

const getProfile = async (req, res) => {
  const { userid } = req.access

  try {
    const profile = await userServices.getProfile({ id: userid })
    return res.status(SC.OK).json(defaultResponse.renderData(profile))
  } catch (error) {
    console.log(error)

    const stCode = error.statusCode || SC.SERVER_ERROR
    const message = error.message || 'Could not perform operation at this time'

    return res.status(stCode).json(
      defaultResponse.renderError({
        message,
      })
    )
  }
}

const updateProfile = async (req, res) => {
  const { userid } = req.access
  const { name, email, phone } = req.body
  try {
    const profile = await userServices.updateUser({
      id: userid,
      data: {
        name,
        email,
        phone,
      },
    })
    console.log({ profile })
    return res.status(SC.OK).json(defaultResponse.renderData(profile))
  } catch (error) {
    console.log(error)

    const stCode = error.statusCode || SC.SERVER_ERROR
    const message = error.message || 'Could not perform operation at this time'

    return res.status(stCode).json(
      defaultResponse.renderError({
        message,
      })
    )
  }
}

export default { signUp, signIn, getProfile, updateProfile }
