export async function testYahooConnection(): Promise<{ ok: boolean; recordsCount: number }> {
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/PETR4.SA";
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
    });
    clearTimeout(timeout);
    if (!response.ok) return { ok: false, recordsCount: 0 };
    const data = await response.json();
    return { ok: true, recordsCount: data?.chart?.result?.length ?? 0 };
  } catch {
    return { ok: false, recordsCount: 0 };
  }
}
