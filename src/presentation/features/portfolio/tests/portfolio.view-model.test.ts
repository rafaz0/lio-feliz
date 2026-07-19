import { describe, it, expect } from "vitest";
import type { PatrimonioDto } from "@/application/dtos";
import type { PosicaoDetalhadaDto } from "@/application/dtos/posicao";
import {
  toPortfolioSummaryViewModel,
  toAssetViewModel,
  toPortfolioPositionsViewModel,
} from "../types/portfolio.view-model";

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

describe("portfolio view-model", () => {
  it("mapeia resumo da carteira", () => {
    const vm = toPortfolioSummaryViewModel(patrimonio);
    expect(vm.patrimonioTotal).toContain("R$");
    expect(vm.evolucaoMensalTrend).toBe("up");
    expect(vm.totalAtivos).toBe(2);
    expect(vm.alocacao).toHaveLength(2);
    expect(vm.alocacao[0].classe).toBe("Ações");
  });

  it("mapeia posições (allocation -> positions)", () => {
    const positions = toPortfolioPositionsViewModel(patrimonio);
    expect(positions).toHaveLength(2);
    expect(positions[0].percentual).toBe(60);
  });

  it("mapeia detalhe de ativo", () => {
    const posicao: PosicaoDetalhadaDto = {
      ticker: "PETR4",
      nome: "Petrobras",
      classe: "Ações",
      quantidade: 100,
      precoMedio: 30,
      valorTotal: 3000,
      rentabilidade: {
        ativoId: "petr4",
        periodo: { inicio: new Date(0), fim: new Date() },
        valorizacao: 10,
        rentabilidadeTotal: 12.5,
        rentabilidadePeriodo: -2,
      },
    };
    const vm = toAssetViewModel(posicao);
    expect(vm.ticker).toBe("PETR4");
    expect(vm.valorizacao).toBe("+10,00%");
    expect(vm.rentabilidadeTotal).toBe("+12,50%");
    expect(vm.rentabilidadePeriodo).toBe("-2,00%");
  });

  it("trend down no resumo quando evolução negativa", () => {
    const negativo: PatrimonioDto = { ...patrimonio, evolucaoMensal: -1.2 };
    const vm = toPortfolioSummaryViewModel(negativo);
    expect(vm.evolucaoMensalTrend).toBe("down");
  });
});
