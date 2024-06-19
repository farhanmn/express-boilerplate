const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  FOUND: 302,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  SERVER_ERROR: 500,
  OTHER: 900,
}

function getName(code) {
  let REF = STATUS_CODE
  if (code) {
    return Object.keys(REF).find((key) => REF[key] === code) || 'OTHER'
  } else {
    return Object.keys(REF).reduce(
      (obj, key) => Object.assign({}, obj, { [REF[key]]: key }),
      {}
    )
  }
}

export { getName, STATUS_CODE as SC }
