import { describe, it, expect, vi, beforeEach } from "vitest";
import { ExchangeRateGateway } from "@/infrastructure/gateways/exchange-rate-gateway";

vi.mock("@/lib/exchange.server", () => ({
  getUsdBrlRate: vi.fn(),
}));

describe("ExchangeRateGateway", () => {
  let gateway: ExchangeRateGateway;

  beforeEach(() => {
    gateway = new ExchangeRateGateway();
    vi.clearAllMocks();
  });

  it("retorna taxa de cambio como operacao", async () => {
    const { getUsdBrlRate } = await import("@/lib/exchange.server");
    vi.mocked(getUsdBrlRate).mockResolvedValue(5.25);

    const result = await gateway.ObterDadosImportacao("exchange-rate", {
      origem: "exchange-rate",
    });

    expect(result.operacoes).toHaveLength(1);
    expect(result.operacoes[0].tipo).toBe("EXCHANGE");
    expect(result.operacoes[0].ativo).toBe("USD-BRL");
    expect(result.operacoes[0].valor).toBe(5.25);
    expect(result.metadados.rate).toBe("5.25");
  });

  it("retorna operacoes vazias quando api falha", async () => {
    const { getUsdBrlRate } = await import("@/lib/exchange.server");
    vi.mocked(getUsdBrlRate).mockRejectedValue(new Error("API error"));

    const result = await gateway.ObterDadosImportacao("exchange-rate", {
      origem: "exchange-rate",
    });

    expect(result.operacoes).toHaveLength(0);
    expect(result.metadados.error).toBeTruthy();
  });
});
