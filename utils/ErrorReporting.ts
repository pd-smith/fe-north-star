import * as Sentry from "@sentry/browser";
import Settings from "./CarrotConfig";

const initializeErrorReporting = () =>
  Sentry.init({
    dsn: Settings.SENTRY_URL,
    beforeSend(event) {
      // Group together certain errors by adding a fingerprint to the Sentry data.
      // https://blog.sentry.io/2018/01/18/setting-up-custom-fingerprints
      //
      // Unfortunately this callback only has access to the error message and stack trace, not extra fields.
      // So we have to regex match either the message or stack trace to determine the error type.
      const exception = event.exception;
      if (exception && exception.values && exception.values.length > 0) {
        const errorMessage = exception.values[0].value;
        const sentryGroupMessages = [
          // Session expired errors
          "Provided credentials not valid or not sufficient to fulfill this request",
          // Fetch / network errors
          "Failed to fetch",
          "Network request failed",
          "NetworkError when attempting to fetch resource",
          // No origin (happens on IE11)
          "No origin header was found in the request",
          // Reimbursement upload failure
          "Unexpected end of JSON input",
        ];
        sentryGroupMessages.forEach((sentryGroupMessage) => {
          if (errorMessage.match(sentryGroupMessage)) {
            event.fingerprint = [`Type: ${sentryGroupMessage}`];
          }
        });
      }
      return event;
    },
  });

const reportErrorMessage = (errorMessage: string) =>
  Sentry.captureException(new Error(errorMessage));

const reportError = (error: any) => {
  if (error.correlationId !== undefined) {
    Sentry.captureException(error, {
      tags: { correlationId: error.correlationId },
    });
  } else {
    Sentry.captureException(error);
  }
};

export { initializeErrorReporting, reportErrorMessage, reportError };
