import { describe, it, expect, vi, beforeEach } from "vitest";
import { YahooFinanceGateway } from "@/infrastructure/gateways/yahoo-finance-gateway";

vi.mock("@/lib/yahoo.server", () => ({
  fetchYahooFundamentals: vi.fn(),
  fetchYahooHistory: vi.fn(),
  fetchYahooDividends: vi.fn(),
  fetchYahooQuotes: vi.fn(),
}));

describe("YahooFinanceGateway", () => {
  let gateway: YahooFinanceGateway;

  beforeEach(() => {
    gateway = new YahooFinanceGateway();
    vi.clearAllMocks();
  });

  it("retorna dividendos quando origem=yahoo-dividends", async () => {
    const { fetchYahooDividends } = await import("@/lib/yahoo.server");
    vi.mocked(fetchYahooDividends).mockResolvedValue([
      { paidAt: "2026-01-15", amount: 2.5 },
      { paidAt: "2026-02-15", amount: 2.5 },
    ]);

    const result = await gateway.ObterDadosImportacao("yahoo-dividends", {
      origem: "yahoo-dividends",
      conexao: { ticker: "PETR4" },
    });

    expect(result.operacoes).toHaveLength(2);
    expect(result.operacoes[0].tipo).toBe("DIVIDEND");
    expect(result.operacoes[0].ativo).toBe("PETR4");
    expect(result.operacoes[0].valor).toBe(2.5);
    expect(result.metadados.provider).toBe("yahoo");
  });

  it("retorna historico quando origem=yahoo-history", async () => {
    const { fetchYahooHistory } = await import("@/lib/yahoo.server");
    vi.mocked(fetchYahooHistory).mockResolvedValue([{ date: "2026-01-15", close: 25.5 }]);

    const result = await gateway.ObterDadosImportacao("yahoo-history", {
      origem: "yahoo-history",
      conexao: { ticker: "PETR4" },
    });

    expect(result.operacoes).toHaveLength(1);
    expect(result.operacoes[0].tipo).toBe("PRICE");
    expect(result.operacoes[0].valor).toBe(25.5);
  });

  it("retorna cotacoes quando origem=yahoo-quotes", async () => {
    const { fetchYahooQuotes } = await import("@/lib/yahoo.server");
    vi.mocked(fetchYahooQuotes).mockResolvedValue({ PETR4: { price: 28.5, changePct: 1.2 } });

    const result = await gateway.ObterDadosImportacao("yahoo-quotes", {
      origem: "yahoo-quotes",
      conexao: { ticker: "PETR4" },
    });

    expect(result.operacoes).toHaveLength(1);
    expect(result.operacoes[0].tipo).toBe("QUOTE");
  });

  it("retorna fundamentals para origem generica yahoo", async () => {
    const { fetchYahooFundamentals } = await import("@/lib/yahoo.server");
    vi.mocked(fetchYahooFundamentals).mockResolvedValue({
      price: 28.5,
      changePct: 0.5,
      name: "Petrobras",
      sector: "Energy",
      marketCap: 500000,
      pl: 8.5,
      pvp: 1.2,
      lpa: 3.5,
      vpa: 20,
      dy: 6.5,
      roe: 15,
      roic: 12,
      margemLiquida: 10,
      divLiquidaEbitda: 0.5,
      evEbitda: 5,
      payout: 40,
      psr: 1.0,
      dividendCagr: 5,
      description: "",
    });

    const result = await gateway.ObterDadosImportacao("yahoo", {
      origem: "yahoo",
      conexao: { ticker: "PETR4" },
    });

    expect(result.metadados.price).toBe("28.5");
    expect(result.metadados.name).toBe("Petrobras");
    expect(result.operacoes).toHaveLength(0);
  });

  it("retorna operacoes vazias quando api falha", async () => {
    const { fetchYahooFundamentals } = await import("@/lib/yahoo.server");
    vi.mocked(fetchYahooFundamentals).mockRejectedValue(new Error("API error"));

    const result = await gateway.ObterDadosImportacao("yahoo", {
      origem: "yahoo",
      conexao: { ticker: "PETR4" },
    });

    expect(result.operacoes).toHaveLength(0);
    expect(result.metadados.error).toBeTruthy();
  });
});
