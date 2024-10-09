// deprecated
import { getName } from '#helper/statuscode.js'

const formatJson = (status, data, message) => {
  return {
    status,
    message: message || 'DEFAULT_MESSAGE_FOR_' + status,
    data,
  }
}

export default (req, res, next) => {
  /**
   * Returns a standardized JSON response.
   * @param {number} status - HTTP status code.
   * @param {object|array} data - Response data.
   * @param {string} [message] - Optional response message. If not provided,
   *   the default message for the given status code will be used.
   */
  res.stdJson = (status, data, message) => {
    res
      .status(status)
      .json(formatJson(status, data, message || getName(status)))
  }
  next()
}
