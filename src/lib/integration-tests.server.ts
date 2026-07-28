import { createServerFn } from "@tanstack/react-start";

export const testYahooConnection = createServerFn({ method: "GET" }).handler(async () => {
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/PETR4.SA";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) return { ok: false as const, recordsCount: 0 };
    const data = await response.json();
    return { ok: true as const, recordsCount: (data?.chart?.result?.length ?? 0) as number };
  } catch {
    return { ok: false as const, recordsCount: 0 };
  } finally {
    clearTimeout(timeout);
  }
});
