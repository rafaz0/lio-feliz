import { describe, it, expect } from "vitest";
import type { PatrimonioDto } from "@/application/dtos";
import type { HistoricoPatrimonialDto } from "@/application/dtos/historico";
import {
  toDashboardViewModel,
  toKpiCardsViewModel,
  toAlocacaoViewModel,
  toEvolucaoViewModel,
} from "../types/dashboard.view-model";

const patrimonio: PatrimonioDto = {
  patrimonioTotal: 100000,
  patrimonioInvestido: 80000,
  saldoDisponivel: 20000,
  moeda: "BRL",
  dataReferencia: new Date("2026-07-19"),
  alocacao: [
    { classe: "Ações", valor: 60000, percentual: 60 },
    { classe: "Renda Fixa", valor: 40000, percentual: 40 },
  ],
  evolucaoMensal: 5.5,
};

const historico: HistoricoPatrimonialDto = {
  portfolioId: "p1",
  periodo: { inicio: new Date("2026-01-01"), fim: new Date("2026-07-19") },
  pontos: [
    { data: new Date("2026-01-01"), patrimonioTotal: 90000, patrimonioInvestido: 80000 },
    { data: new Date("2026-07-01"), patrimonioTotal: 100000, patrimonioInvestido: 80000 },
  ],
};

describe("dashboard view-model", () => {
  it("mapeia KPI cards", () => {
    const kpis = toKpiCardsViewModel(patrimonio);
    expect(kpis).toHaveLength(4);
    expect(kpis[0].label).toBe("Patrimônio Total");
    expect(kpis[0].value).toContain("R$");
    expect(kpis[3].label).toBe("Evolução Mensal");
    expect(kpis[3].trend).toBe("up");
  });

  it("mapeia alocação com cores", () => {
    const alocacao = toAlocacaoViewModel(patrimonio.alocacao);
    expect(alocacao).toHaveLength(2);
    expect(alocacao[0].classe).toBe("Ações");
    expect(alocacao[0].fill).toContain("chart-1");
    expect(alocacao[1].percentual).toBe(40);
  });

  it("mapeia evolução", () => {
    const evolucao = toEvolucaoViewModel(historico);
    expect(evolucao).toHaveLength(2);
    expect(evolucao[0].patrimonioTotal).toBe(90000);
    expect(typeof evolucao[0].data).toBe("string");
  });

  it("monta DashboardViewModel completo", () => {
    const vm = toDashboardViewModel(patrimonio, historico);
    expect(vm.patrimonioTotal).toContain("R$");
    expect(vm.evolucaoMensalTrend).toBe("up");
    expect(vm.kpis).toHaveLength(4);
    expect(vm.alocacao).toHaveLength(2);
    expect(vm.evolucao).toHaveLength(2);
    expect(vm.moeda).toBe("BRL");
  });

  it("trend down quando evolução negativa", () => {
    const negativo: PatrimonioDto = { ...patrimonio, evolucaoMensal: -2.1 };
    const vm = toDashboardViewModel(negativo, historico);
    expect(vm.evolucaoMensalTrend).toBe("down");
  });
});
