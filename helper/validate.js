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

const errorValue = (condition, { statusCode, message }) => {
  if (condition) {
    const error = new Error(message)
    error.statusCode = statusCode
    throw error
  }
}

export { validateParams, errorValue }
