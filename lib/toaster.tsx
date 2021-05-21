import * as Sentry from "@sentry/node";
import { toaster } from "baseui/toast";
import { Button, SIZE } from "baseui/button";
import { hashMessage } from "./utils";

// error messages that start with
// the following will be filtered out:
const DEV_ONLY_ERRORS = [
  // often react logs a supplimental error when an error is thrown,
  // this is just noise to the user
  "the above error",

  // sometimes libraries log warnings as errors
  // and sentry picks it up
  "warning",
];

export default {
  /**
   * generates a toast error message in the nearest baseui `ToasterContainer`. If Sentry is active, sends the message to
   * Sentry first, which will then re-send the toast with the `sentryKey`. Toasts with a `sentryKey` include
   * a button that brings up a report modal, allowing our users to provide us with additional context to that error.
   *
   * @param {(Error | string)} errorObjectOrMessage - the error object or error message to notify the user of
   * @param {string} [sentryKey] - when Sentry is active, the toaster will use the key provided by sentry to manage the error instance
   * @param {number} [autoHideDuration=3000] - time in milleseconds until the toast is auto-hidden
   * @returns the key used to manage the toast. you can use `toaster.update` to update the toast at that key
   */
  error(errorObjectOrMessage: Error | string, sentryKey?: string, autoHideDuration = 3000) {
    let key = sentryKey;
    if (process.env.SENTRY_DSN && !sentryKey) {
      // eslint-disable-next-line no-param-reassign
      sentryKey = Sentry.captureException(errorObjectOrMessage);
    }

    const message =
      typeof errorObjectOrMessage === "string"
        ? errorObjectOrMessage
        : errorObjectOrMessage?.message;

    if (
      !errorObjectOrMessage ||
      (process.env.NODE_ENV !== "development" &&
        DEV_ONLY_ERRORS.some(errorString => message.toLocaleLowerCase().startsWith(errorString)))
    ) {
      return null;
    }

    key = sentryKey || hashMessage(message);

    toaster.negative(
      <>
        {message}
        {Boolean(process.env.SENTRY_DSN && sentryKey) && (
          <Button
            overrides={{
              BaseButton: {
                style: ({ $theme }) => {
                  return {
                    backgroundColor: $theme.colors.negative700,
                    color: $theme.colors.white,
                    display: "block",
                    marginTop: "1rem",
                  };
                },
              },
            }}
            size={SIZE.mini}
            onClick={() => (Sentry as any).showReportDialog({ eventId: sentryKey })}
          >
            Report Issue
          </Button>
        )}
      </>,
      { key, autoHideDuration }
    );

    return key;
  },
  update: toaster.update,
  toast(errorObjectOrMessage: Error | string, autoHideDuration = 3000) {
    const message =
      typeof errorObjectOrMessage === "string"
        ? errorObjectOrMessage
        : errorObjectOrMessage?.message;

    if (!errorObjectOrMessage) return null;

    toaster.negative(<>{message}</>, { autoHideDuration });
    return null;
  },
};
