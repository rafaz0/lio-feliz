/**
 * Teste de integração (EWO-003, Slice 2): ObterEvolucaoCarteiraService vs legado
 * buildPortfolioHistory. Garante zero regressão numérica para os mesmos dados.
 */
import { describe, it, expect } from "vitest";
import { ObterEvolucaoCarteiraService } from "@/application/services/obter-evolucao-carteira-service";
import { buildPortfolioHistory } from "@/lib/portfolio";
import type { HistoryOperation } from "@/shared/types/portfolio";

function makeOp(
  side: HistoryOperation["side"],
  ticker: string,
  qty: number,
  price: number,
  overrides: Partial<HistoryOperation> = {},
): HistoryOperation {
  return {
    ticker,
    side,
    quantity: qty,
    price,
    fee: overrides.fee ?? 0,
    irrf: overrides.irrf ?? 0,
    other_costs: overrides.other_costs ?? 0,
    currency: overrides.currency ?? "BRL",
    traded_at: overrides.traded_at ?? new Date().toISOString(),
    created_at: overrides.created_at ?? new Date().toISOString(),
  };
}

describe("ObterEvolucaoCarteiraService (EWO-003 Slice 2)", () => {
  it("ops vazias -> []", () => {
    const s = new ObterEvolucaoCarteiraService().execute([]);
    expect(s).toEqual([]);
  });

  it("grade semanal com valor e investido", () => {
    const ops: HistoryOperation[] = [
      makeOp("buy", "PETR4", 100, 25, {
        traded_at: "2024-06-01T10:00:00Z",
        created_at: "2024-06-01T10:00:00Z",
      }),
    ];
    const s = new ObterEvolucaoCarteiraService().execute(ops, {}, {});
    const l = buildPortfolioHistory(ops, {}, {});
    expect(s).toHaveLength(l.length);
    for (let i = 0; i < s.length; i++) {
      expect(s[i].date).toBe(l[i].date);
      expect(s[i].value).toBeCloseTo(l[i].value, 1);
      expect(s[i].invested).toBeCloseTo(l[i].invested, 1);
    }
  });

  it("com precos historicos (histories)", () => {
    const ops: HistoryOperation[] = [
      makeOp("buy", "PETR4", 100, 25, {
        traded_at: "2024-06-01T10:00:00Z",
        created_at: "2024-06-01T10:00:00Z",
      }),
    ];
    const histories: Record<string, { date: string; close: number }[]> = {
      PETR4: [
        { date: "2024-06-01", close: 26 },
        { date: "2024-06-15", close: 28 },
        { date: "2024-07-01", close: 30 },
      ],
    };
    const s = new ObterEvolucaoCarteiraService().execute(ops, {}, {}, histories);
    const l = buildPortfolioHistory(ops, {}, {}, histories);
    expect(s).toHaveLength(l.length);
    for (let i = 0; i < s.length; i++) {
      expect(s[i].date).toBe(l[i].date);
      expect(s[i].value).toBeCloseTo(l[i].value, 1);
      expect(s[i].invested).toBeCloseTo(l[i].invested, 1);
    }
  });

  it("priceOverrides so aplica no ponto mais recente", () => {
    const ops: HistoryOperation[] = [
      makeOp("buy", "PETR4", 100, 25, {
        traded_at: "2024-06-01T10:00:00Z",
        created_at: "2024-06-01T10:00:00Z",
      }),
    ];
    const overrides = { PETR4: 99 };
    const s = new ObterEvolucaoCarteiraService().execute(ops, overrides, {});
    const l = buildPortfolioHistory(ops, overrides, {});
    const lastS = s[s.length - 1];
    const lastL = l[l.length - 1];
    expect(lastS.value).toBeCloseTo(lastL.value, 1);
    expect(lastS.value).toBeCloseTo(100 * 99, 0);
  });

  it("dividendos reduzem investido ao longo do tempo", () => {
    const ops: HistoryOperation[] = [
      makeOp("buy", "PETR4", 100, 20, {
        traded_at: "2024-06-01T10:00:00Z",
        created_at: "2024-06-01T10:00:00Z",
      }),
      makeOp("dividend", "PETR4", 100, 2, {
        traded_at: "2024-07-01T10:00:00Z",
        created_at: "2024-07-01T10:00:00Z",
      }),
    ];
    const s = new ObterEvolucaoCarteiraService().execute(ops, {}, {});
    const l = buildPortfolioHistory(ops, {}, {});
    expect(s).toHaveLength(l.length);
    for (let i = 0; i < s.length; i++) {
      expect(s[i].invested).toBeCloseTo(l[i].invested, 1);
    }
  });
});
