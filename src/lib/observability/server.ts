type SentryModule = typeof import("@sentry/node");

let _sentry: SentryModule | null = null;

async function getSentry(): Promise<SentryModule | null> {
  if (_sentry) return _sentry;
  try {
    _sentry = await import("@sentry/node");
    return _sentry;
  } catch {
    return null;
  }
}

export async function initSentryServer(): Promise<void> {
  const dsn = process.env.SENTRY_DSN ?? "";
  if (!dsn) return;

  const Sentry = await getSentry();
  if (!Sentry) return;

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV ?? "development",
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 0,
  });
}

export async function logServerError(
  error: unknown,
  context?: Record<string, unknown>,
): Promise<void> {
  console.error("[server]", error, context ?? "");
  const dsn = process.env.SENTRY_DSN ?? "";
  if (!dsn) return;

  const Sentry = await getSentry();
  if (!Sentry) return;

  Sentry.captureException(error, { extra: context });
}
