import { ReasonPhrases, StatusCodes as SC } from 'http-status-codes'

const errorFormat = (e) => {
  return {
    stCode: e.statusCode || SC.INTERNAL_SERVER_ERROR,
    message: e.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
  }
}

export { errorFormat }
