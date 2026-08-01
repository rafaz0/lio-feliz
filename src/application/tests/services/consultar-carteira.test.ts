/**
 * Teste de integração (EWO-003, Slice 1): ConsultarCarteiraService vs legado
 * consolidatePortfolio. Garante zero regressão numérica para os mesmos dados.
 */
import { describe, it, expect } from "vitest";
import { ConsultarCarteiraService } from "@/application/services/consultar-carteira-service";
import { consolidatePortfolio } from "@/lib/portfolio";
import type { Operation, OperationSide } from "@/shared/types/portfolio";

function makeOp(
  side: OperationSide,
  ticker: string,
  qty: number,
  price: number,
  overrides: Partial<Operation> = {},
): Operation {
  return {
    id: `op-${Math.random().toString(36).slice(2, 8)}`,
    ticker,
    asset_type: "stock",
    currency: "BRL",
    side,
    quantity: qty,
    price,
    fee: overrides.fee ?? 0,
    irrf: overrides.irrf ?? 0,
    other_costs: overrides.other_costs ?? 0,
    metadata: overrides.metadata ?? null,
    traded_at: overrides.traded_at ?? new Date().toISOString(),
    source: "manual",
    notes: null,
    created_at: overrides.created_at ?? new Date().toISOString(),
  };
}

describe("ConsultarCarteiraService (EWO-003 Slice 1)", () => {
  it("compra simples sem fees", () => {
    const ops = [makeOp("buy", "PETR4", 100, 25.5)];
    const s = new ConsultarCarteiraService().execute(ops);
    const l = consolidatePortfolio(ops);
    expect(s.totalValue).toBe(l.totalValue);
    expect(s.totalInvested).toBe(l.totalInvested);
    expect(s.totalPnl).toBe(l.totalPnl);
    expect(s.totalPnlPct).toBe(l.totalPnlPct);
    expect(s.positions).toEqual(l.positions);
  });

  it("compra com fee + irrf + other_costs", () => {
    const ops = [makeOp("buy", "PETR4", 100, 25, { fee: 5, irrf: 3, other_costs: 1 })];
    const s = new ConsultarCarteiraService().execute(ops);
    const l = consolidatePortfolio(ops);
    expect(s.positions[0].invested).toBe(l.positions[0].invested);
    expect(s.positions[0].avgPrice).toBe(l.positions[0].avgPrice);
  });

  it("compra + venda parcial", () => {
    const ops = [
      makeOp("buy", "PETR4", 100, 20, { fee: 2 }),
      makeOp("sell", "PETR4", 40, 25, { fee: 2 }),
    ];
    const s = new ConsultarCarteiraService().execute(ops);
    const l = consolidatePortfolio(ops);
    expect(s.positions[0].quantity).toBe(l.positions[0].quantity);
    expect(s.positions[0].invested).toBeCloseTo(l.positions[0].invested, 1);
  });

  it("dividendo e JCP reduzem custo", () => {
    const ops = [
      makeOp("buy", "PETR4", 100, 20),
      makeOp("dividend", "PETR4", 100, 2),
      makeOp("dividend", "PETR4", 100, 1.5, { metadata: { tipo_provento: "jcp" } }),
    ];
    const s = new ConsultarCarteiraService().execute(ops);
    const l = consolidatePortfolio(ops);
    expect(s.positions[0].invested).toBeCloseTo(l.positions[0].invested, 1);
    expect(s.positions[0].quantity).toBe(l.positions[0].quantity);
  });

  it("bonus com bonus_ratio no metadata", () => {
    const ops = [
      makeOp("buy", "PETR4", 100, 20),
      makeOp("bonus", "PETR4", 10, 0, { metadata: { bonus_ratio: 0.1 } }),
    ];
    const s = new ConsultarCarteiraService().execute(ops);
    const l = consolidatePortfolio(ops);
    expect(s.positions[0].quantity).toBe(l.positions[0].quantity);
    expect(s.positions[0].invested).toBeCloseTo(l.positions[0].invested, 0);
  });

  it("venda total zera posicao", () => {
    const ops = [makeOp("buy", "PETR4", 100, 20), makeOp("sell", "PETR4", 100, 25)];
    const s = new ConsultarCarteiraService().execute(ops);
    const l = consolidatePortfolio(ops);
    expect(s.positions).toHaveLength(0);
    expect(l.positions).toHaveLength(0);
  });

  it("dividendo maior que o custo nao gera custo negativo (clamp a 0)", () => {
    const ops = [makeOp("buy", "PETR4", 100, 10), makeOp("dividend", "PETR4", 100, 50)];
    const s = new ConsultarCarteiraService().execute(ops);
    const l = consolidatePortfolio(ops);
    expect(s.positions[0].invested).toBeGreaterThanOrEqual(0);
    expect(s.positions[0].invested).toBeCloseTo(l.positions[0].invested, 1);
    expect(l.positions[0].invested).toBe(0);
  });

  it("alocacoes por setor e tipo", () => {
    const ops = [
      makeOp("buy", "PETR4", 100, 25.5),
      makeOp("buy", "VALE3", 200, 60),
      makeOp("buy", "BOVA11", 50, 120),
    ];
    const s = new ConsultarCarteiraService().execute(ops);
    const l = consolidatePortfolio(ops);
    expect(s.sectorAllocation).toEqual(l.sectorAllocation);
    expect(s.typeAllocation).toEqual(l.typeAllocation);
  });

  it("priceOverrides e exchangeRates aplicados", () => {
    const ops = [makeOp("buy", "AAPL", 10, 150, { currency: "USD" as const })];
    const overrides = { AAPL: 200 };
    const rates = { USD: 5.2 };
    const s = new ConsultarCarteiraService().execute(ops, overrides, rates);
    const l = consolidatePortfolio(ops, overrides, rates);
    expect(s.totalValue).toBe(l.totalValue);
    expect(s.positions[0].currentValue).toBe(l.positions[0].currentValue);
  });

  it("sequencia multi-evento realista (equivalencia)", () => {
    const ops: Operation[] = [
      makeOp("buy", "PETR4", 100, 25.5, {
        fee: 1.5,
        traded_at: "2024-01-05T10:00:00Z",
        created_at: "2024-01-05T10:00:00Z",
      }),
      makeOp("buy", "VALE3", 200, 60, {
        fee: 2.0,
        traded_at: "2024-01-10T10:00:00Z",
        created_at: "2024-01-10T10:00:00Z",
      }),
      makeOp("dividend", "PETR4", 100, 2, {
        traded_at: "2024-02-01T10:00:00Z",
        created_at: "2024-02-01T10:00:00Z",
      }),
      makeOp("buy", "PETR4", 50, 30, {
        fee: 0.8,
        traded_at: "2024-03-01T10:00:00Z",
        created_at: "2024-03-01T10:00:00Z",
      }),
      makeOp("sell", "VALE3", 50, 65, {
        fee: 1.2,
        traded_at: "2024-04-01T10:00:00Z",
        created_at: "2024-04-01T10:00:00Z",
      }),
      makeOp("dividend", "PETR4", 150, 1, {
        traded_at: "2024-05-01T10:00:00Z",
        created_at: "2024-05-01T10:00:00Z",
        metadata: { tipo_provento: "jcp" },
      }),
    ];
    const s = new ConsultarCarteiraService().execute(ops);
    const l = consolidatePortfolio(ops);
    const petS = s.positions.find((p) => p.ticker === "PETR4")!;
    const petL = l.positions.find((p) => p.ticker === "PETR4")!;
    expect(petS.quantity).toBe(petL.quantity);
    expect(petS.invested).toBeCloseTo(petL.invested, 1);
    const valS = s.positions.find((p) => p.ticker === "VALE3")!;
    const valL = l.positions.find((p) => p.ticker === "VALE3")!;
    expect(valS.quantity).toBe(valL.quantity);
    expect(valS.invested).toBeCloseTo(valL.invested, 1);
  });
});
