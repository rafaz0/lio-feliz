import { describe, it, expect, vi, beforeEach } from "vitest";
import { CoingeckoGateway } from "@/infrastructure/gateways/coingecko-gateway";

vi.mock("@/lib/coingecko.server", () => ({
  fetchCryptoQuotes: vi.fn(),
}));

describe("CoingeckoGateway", () => {
  let gateway: CoingeckoGateway;

  beforeEach(() => {
    gateway = new CoingeckoGateway();
    vi.clearAllMocks();
  });

  it("retorna cotacoes cripto como operacoes", async () => {
    const { fetchCryptoQuotes } = await import("@/lib/coingecko.server");
    vi.mocked(fetchCryptoQuotes).mockResolvedValue({
      "BTC-USD": {
        ticker: "BTC-USD",
        priceUsd: 50000,
        priceBrl: 275000,
        changePct24h: 2.5,
        name: "Bitcoin",
      },
      "ETH-USD": {
        ticker: "ETH-USD",
        priceUsd: 3000,
        priceBrl: 16500,
        changePct24h: 1.5,
        name: "Ethereum",
      },
    });

    const result = await gateway.ObterDadosImportacao("coingecko", {
      origem: "coingecko",
      conexao: { tickers: "BTC-USD,ETH-USD" },
    });

    expect(result.operacoes).toHaveLength(2);
    expect(result.operacoes[0].tipo).toBe("QUOTE");
    expect(result.operacoes[0].valor).toBe(275000);
    expect(result.operacoes[1].valor).toBe(16500);
    expect(result.metadados.count).toBe("2");
  });

  it("retorna operacoes vazias quando api retorna vazio", async () => {
    const { fetchCryptoQuotes } = await import("@/lib/coingecko.server");
    vi.mocked(fetchCryptoQuotes).mockResolvedValue({});

    const result = await gateway.ObterDadosImportacao("coingecko", {
      origem: "coingecko",
      conexao: { ticker: "BTC-USD" },
    });

    expect(result.operacoes).toHaveLength(0);
  });

  it("retorna operacoes vazias quando api falha", async () => {
    const { fetchCryptoQuotes } = await import("@/lib/coingecko.server");
    vi.mocked(fetchCryptoQuotes).mockRejectedValue(new Error("API error"));

    const result = await gateway.ObterDadosImportacao("coingecko", {
      origem: "coingecko",
    });

    expect(result.operacoes).toHaveLength(0);
    expect(result.metadados.error).toBeTruthy();
  });
});
