enum HttpStatusCodes {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

const SUCCESS_CODES = [HttpStatusCodes.OK, HttpStatusCodes.NO_CONTENT];

export { HttpStatusCodes, SUCCESS_CODES };
