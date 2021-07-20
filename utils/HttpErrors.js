import { HttpStatusCodes } from "./HttpStatusCodes";

const HttpErrors = {
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  UNHANDLED_STATUS_CODE: "UNHANDLED_STATUS_CODE",
};

const StatusCodeToHttpErrorMapping = {
  [HttpStatusCodes.BAD_REQUEST]: HttpErrors.BAD_REQUEST,
  [HttpStatusCodes.UNAUTHORIZED]: HttpErrors.UNAUTHORIZED,
  [HttpStatusCodes.FORBIDDEN]: HttpErrors.FORBIDDEN,
  [HttpStatusCodes.NOT_FOUND]: HttpErrors.NOT_FOUND,
  [HttpStatusCodes.INTERNAL_SERVER_ERROR]: HttpErrors.INTERNAL_SERVER_ERROR,
};

const isHttpError = (error) => {
  return Object.values(HttpErrors).includes(error.name);
};

export { HttpErrors, StatusCodeToHttpErrorMapping, isHttpError };
