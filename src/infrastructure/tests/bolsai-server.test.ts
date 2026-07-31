import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  fetchBolsaiStockFundamentals,
  fetchBolsaiFiiFundamentals,
  isFiiTicker,
  getBolsaiCached,
  setBolsaiCache,
} from "@/lib/bolsai.server";

const KEY = "sk_test";

function mockFetchResponse(status: number, body: unknown): void {
  globalThis.fetch = vi.fn().mockResolvedValue(
    new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    }),
  ) as unknown as typeof fetch;
}

describe("bolsai.server", () => {
  const originalKey = process.env.BOLSAI_API_KEY;

  beforeEach(() => {
    process.env.BOLSAI_API_KEY = KEY;
  });

  afterEach(() => {
    process.env.BOLSAI_API_KEY = originalKey;
    vi.restoreAllMocks();
  });

  it("detects FII tickers by the 11 suffix", () => {
    expect(isFiiTicker("KNRI11")).toBe(true);
    expect(isFiiTicker("PETR4")).toBe(false);
    expect(isFiiTicker("bova11")).toBe(true);
  });

  it("fetches stock fundamentals and caches the result", async () => {
    const payload = {
      ticker: "PETR4",
      close_price: 41.21,
      market_cap: 531144677080.81,
      pl: 4.94,
      pvp: 1.19,
      roe: 24.17,
    };
    mockFetchResponse(200, payload);

    const r = await fetchBolsaiStockFundamentals("PETR4");
    expect(r?.pl).toBe(4.94);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);

    // Second call should hit cache (no extra fetch)
    await fetchBolsaiStockFundamentals("PETR4");
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);

    // Cache is readable
    const cached = getBolsaiCached<typeof payload>("bolsai-stock-PETR4");
    expect(cached?.pvp).toBe(1.19);
  });

  it("returns null on 404 (unsupported ticker)", async () => {
    mockFetchResponse(404, { error: "not_found" });
    const r = await fetchBolsaiStockFundamentals("IVVB11");
    expect(r).toBeNull();
  });

  it("returns null on rate limit (429)", async () => {
    mockFetchResponse(429, { error: "rate_limit" });
    const r = await fetchBolsaiStockFundamentals("RATE44");
    expect(r).toBeNull();
  });

  it("returns null without a configured API key", async () => {
    delete process.env.BOLSAI_API_KEY;
    const r = await fetchBolsaiStockFundamentals("NOKEY5");
    expect(r).toBeNull();
  });

  it("fetches FII fundamentals via the /fiis/ endpoint", async () => {
    const payload = {
      ticker: "KNRI11",
      close_price: 156.65,
      book_value_per_share: 163.51,
      pvp: 0.96,
      dividend_yield_ttm: 7.9,
    };
    mockFetchResponse(200, payload);
    const r = await fetchBolsaiFiiFundamentals("KNRI11");
    expect(r?.dividend_yield_ttm).toBe(7.9);
    const url = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url).toContain("/fiis/KNRI11");
  });

  it("setBolsaiCache/getBolsaiCached roundtrip", () => {
    setBolsaiCache("k", { hello: "world" });
    expect(getBolsaiCached<{ hello: string }>("k")?.hello).toBe("world");
  });
});
