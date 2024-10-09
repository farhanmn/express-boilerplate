import { randomBytes, createHmac } from 'crypto'

const SALTSIZE = 16

/**
 * Generate random salt with given size
 * @param {number} saltSize - size of generated salt
 * @returns {string} generated salt
 */
const generateRandomSalt = (saltSize) => {
  return randomBytes(saltSize).toString('base64').slice(0, saltSize)
}

/**
 * Hash given password with given salt
 * @param {string} pwd - given password
 * @param {string} salt - given salt
 * @returns {string} hashed password
 */
const hashPassword = (pwd, salt) => {
  return createHmac('sha512', salt).update(pwd).digest('base64')
}

/**
 * Compare given password with given hashed password and salt
 * @param {string} currPwd - given password
 * @param {string} hashedPwd - given hashed password
 * @param {string} salt - given salt
 * @returns {boolean} if given password match with given hashed password
 */
const match = (currPwd, hashedPwd, salt) => {
  const currPwdHash = createHmac('sha512', salt)
    .update(currPwd)
    .digest('base64')

  return currPwdHash === hashedPwd
}

/**
 * Generate salt and hash given password
 * @param {string} currPwd - given password
 * @returns {{pwd: string, salt: string}} object with salt and hashed password
 */
const hash = (currPwd) => {
  const salt = generateRandomSalt(SALTSIZE)
  const pwd = hashPassword(currPwd, salt)

  return {
    pwd,
    salt,
  }
}

export { match, hash }
