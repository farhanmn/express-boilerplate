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
  res.stdJson = (status, data, message) => {
    res
      .status(status)
      .json(formatJson(status, data, message || getName(status)))
  }
  next()
}
