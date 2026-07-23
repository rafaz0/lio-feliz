import * as Sentry from "@sentry/node";

const SENTRY_DSN = process.env.SENTRY_DSN ?? "";

export function initSentryServer(): void {
  if (!SENTRY_DSN) return;

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NODE_ENV ?? "development",
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 0,
  });
}

export function logServerError(error: unknown, context?: Record<string, unknown>): void {
  console.error("[server]", error, context ?? "");
  if (SENTRY_DSN) {
    Sentry.captureException(error, { extra: context });
  }
}
