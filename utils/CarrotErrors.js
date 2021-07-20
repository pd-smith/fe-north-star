import Helpers from "utils/Helpers";

const CarrotErrorCodes = {
  NOT_AUTHENTICATED: "NOT_AUTHENTICATED",
};

const CARROT_ERROR_CODES_TO_MESSAGES = {
  [CarrotErrorCodes.NOT_AUTHENTICATED]: `client.notAuthenticated`,
};

const getErrorMessageFromCode = (errorCode) => {
  return Helpers.getFromMapOrReportAndDefault(
    CARROT_ERROR_CODES_TO_MESSAGES,
    errorCode,
    CarrotErrorCodes.UNEXPECTED_ERROR
  );
};

export { CarrotErrorCodes, getErrorMessageFromCode };
