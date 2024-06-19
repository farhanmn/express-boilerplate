import { randomBytes, createHmac } from 'crypto'

const SALTSIZE = 16

const generateRandomSalt = (saltSize) => {
  return randomBytes(saltSize).toString('base64').slice(0, saltSize)
}

const hashPassword = (pwd, salt) => {
  return createHmac('sha512', salt).update(pwd).digest('base64')
}

const match = (currPwd, hashedPwd, salt) => {
  const currPwdHash = createHmac('sha512', salt)
    .update(currPwd)
    .digest('base64')

  return currPwdHash === hashedPwd
}

const hash = (currPwd) => {
  const salt = generateRandomSalt(SALTSIZE)
  const pwd = hashPassword(currPwd, salt)

  return {
    pwd,
    salt,
  }
}

export { match, hash }
