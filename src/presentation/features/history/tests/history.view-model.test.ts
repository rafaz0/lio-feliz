import { describe, it, expect } from "vitest";
import type { HistoricoPatrimonialDto, RentabilidadeDto } from "@/application/dtos";
import {
  toPerformanceSummaryViewModel,
  toPerformancePoints,
  toBenchmarkViewModel,
  filterHistoryPoints,
} from "../types/history.view-model";

const historico: HistoricoPatrimonialDto = {
  portfolioId: "p1",
  periodo: { inicio: new Date("2026-01-01"), fim: new Date("2026-06-01") },
  pontos: [
    { data: new Date("2026-01-01"), patrimonioTotal: 1000, patrimonioInvestido: 1000 },
    { data: new Date("2026-06-01"), patrimonioTotal: 1200, patrimonioInvestido: 1000 },
  ],
};

const rent: RentabilidadeDto = {
  ativoId: "PORTFOLIO",
  periodo: { inicio: new Date("2026-01-01"), fim: new Date("2026-06-01") },
  valorizacao: 20,
  rentabilidadeTotal: 20,
  rentabilidadePeriodo: 20,
};

describe("history view-model", () => {
  it("mapeia pontos", () => {
    const pontos = toPerformancePoints(historico);
    expect(pontos).toHaveLength(2);
    expect(pontos[0].patrimonioTotal).toBe(1000);
  });

  it("monta sumário de performance", () => {
    const summary = toPerformanceSummaryViewModel(historico, rent);
    expect(summary.valorizacao).toBe("+20.00%");
    expect(summary.variacaoPatrimonio).toBe("+20.00%");
  });

  it("monta benchmarks", () => {
    const benchmarks = toBenchmarkViewModel(rent);
    expect(benchmarks.length).toBe(2);
    expect(benchmarks[0].nome).toBe("Carteira");
  });

  it("filtra por termo de data", () => {
    const pontos = toPerformancePoints(historico);
    const termo = pontos[0].data;
    expect(filterHistoryPoints(pontos, { termo, tipo: "TODOS" }).length).toBeGreaterThan(0);
    expect(filterHistoryPoints(pontos, { termo: "zzz", tipo: "TODOS" })).toHaveLength(0);
  });

  it("filtra por tipo PATRIMONIO/INVESTIDO", () => {
    const pontos = toPerformancePoints(historico);
    expect(filterHistoryPoints(pontos, { termo: "", tipo: "PATRIMONIO" })).toHaveLength(2);
    expect(filterHistoryPoints(pontos, { termo: "", tipo: "INVESTIDO" })).toHaveLength(2);
  });
});
