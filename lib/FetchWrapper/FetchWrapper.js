import { SUCCESS_CODES } from "../../utils/HttpStatusCodes";
import { v4 as uuid } from "uuid";
import {
  HttpErrors,
  StatusCodeToHttpErrorMapping,
} from "../../utils/HttpErrors";
import fetch from "node-fetch";

const fetchWrapper = async (url, options) => {
  const correlationId = uuid();
  // Stack traces of error following async don't show the entry point to the stack
  // So create an error with navigable stack trace just before the fetch
  const error = new Error();
  error.correlationId = correlationId;

  // For some reason adding headers to non v2 calls breaks things. Only
  // add to calls which are already sending headers
  if (options.headers) {
    options.headers.append("X-Request-ID", correlationId);
  }

  let response;
  try {
    response = await fetch(url, options);
  } catch (caughtError) {
    // Not including options as that would be a high risk of leaking sensitive information into our logs
    error.message = `${caughtError.name} - ${caughtError.message} | URL: ${url}`;
    error.name = "FetchError";
    throw error;
  }

  if (SUCCESS_CODES.includes(response.status)) {
    return response;
  }

  if (
    Object.keys(StatusCodeToHttpErrorMapping).includes(
      response.status.toString()
    )
  ) {
    error.name = StatusCodeToHttpErrorMapping[response.status];
    error.message = `URL: ${url}`;
    error.response = response;
    throw error;
  }

  error.name = HttpErrors.UNHANDLED_STATUS_CODE;
  error.message = `Status Code: ${response.status} | URL: ${url}`;
  error.response = response;
  throw error;
};

export { fetchWrapper };
