import * as Sentry from "@sentry/react";

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN ?? "";

export function initSentry(): void {
  if (!SENTRY_DSN) return;

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: import.meta.env.MODE ?? "development",
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 0,
    integrations: [Sentry.browserTracingIntegration()],
  });
}

export function logError(error: unknown, context?: Record<string, unknown>): void {
  console.error("[observability]", error, context ?? "");
  if (SENTRY_DSN) {
    Sentry.captureException(error, { extra: context });
  }
}

export function logWarning(message: string, context?: Record<string, unknown>): void {
  console.warn("[observability]", message, context ?? "");
  if (SENTRY_DSN) {
    Sentry.captureMessage(message, { level: "warning", extra: context });
  }
}

export function setUser(userId: string | null): void {
  if (SENTRY_DSN) {
    Sentry.setUser(userId ? { id: userId } : null);
  }
}

export { Sentry };
