/**
 * Validate a given object against a list of mandatory parameters.
 *
 * @throws {Error} - with statusCode 400 if any mandatory parameter is missing
 * @param {Object} param - the object to validate
 * @param {Array<string>} mandatoryParams - the list of mandatory parameters
 */
const validateParams = (param, mandatoryParams) => {
  const missingParams = mandatoryParams.filter(
    (p) => param[p] === undefined || param[p] === null
  )

  if (missingParams.length > 0) {
    const missing = missingParams.join(', ')
    const error = new Error(`Missing mandatory parameters: ${missing}`)
    error.statusCode = 400
    throw error
  }
}

/**
 * Throws an error if the condition is true.
 *
 * @throws {Error} - with given statusCode and message
 * @param {boolean} condition - the condition to check
 * @param {{ statusCode: number, message: string }} errorDescriptor - the error descriptor
 */
const errorValue = (condition, { statusCode, message }) => {
  if (condition) {
    const error = new Error(message)
    error.statusCode = statusCode
    throw error
  }
}

export { validateParams, errorValue }
