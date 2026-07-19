import { describe, it, expect } from "vitest";
import type { RebalanceamentoDto } from "@/application/dtos";
import {
  toRebalancingViewModel,
  toAllocationViewModels,
  filterRebalancingDiffs,
  type RebalancingFiltersViewModel,
} from "../types/rebalancing.view-model";

const rebalanceamento: RebalanceamentoDto = {
  alocacaoAtual: [
    { classe: "RENDA_FIXA", valor: 4000, percentual: 40 },
    { classe: "ACOES", valor: 6000, percentual: 60 },
  ],
  alocacaoDesejada: [
    { classe: "RENDA_FIXA", valor: 5000, percentual: 50 },
    { classe: "ACOES", valor: 5000, percentual: 50 },
  ],
  diferencas: [
    { classe: "RENDA_FIXA", percentualAtual: 40, percentualDesejado: 50, diferenca: 10 },
    { classe: "ACOES", percentualAtual: 60, percentualDesejado: 50, diferenca: -10 },
  ],
  sugestaoAportes: [{ classe: "RENDA_FIXA", valorSugerido: 1000 }],
};

describe("rebalancing view-model", () => {
  it("mapeia alocações atuais e desejadas", () => {
    const vm = toRebalancingViewModel(rebalanceamento);
    expect(vm.alocacaoAtual).toHaveLength(2);
    expect(vm.alocacaoAtual[0].classe).toBe("RENDA_FIXA");
    expect(vm.alocacaoDesejada[1].percentual).toBe(50);
  });

  it("mapeia diferenças", () => {
    const vm = toRebalancingViewModel(rebalanceamento);
    expect(vm.diferencas[0].diferenca).toBe(10);
    expect(vm.diferencas[1].diferenca).toBe(-10);
  });

  it("mapeia sugestões de aporte", () => {
    const vm = toRebalancingViewModel(rebalanceamento);
    expect(vm.sugestoes).toHaveLength(1);
    expect(vm.sugestoes[0].valorSugerido).toBe(1000);
  });

  it("filtra diferenças em desbalance", () => {
    const diffs = toRebalancingViewModel(rebalanceamento).diferencas;
    const filtros: RebalancingFiltersViewModel = { tipo: "DESVALANCE" };
    expect(filterRebalancingDiffs(diffs, filtros)).toHaveLength(2);
  });

  it("filtra diferenças equilibradas (sem diferença)", () => {
    const diffs = toAllocationViewModels(rebalanceamento.alocacaoAtual).map((a) => ({
      classe: a.classe,
      percentualAtual: a.percentual,
      percentualDesejado: a.percentual,
      diferenca: 0,
    }));
    const filtros: RebalancingFiltersViewModel = { tipo: "EQUILIBRADO" };
    expect(filterRebalancingDiffs(diffs, filtros)).toHaveLength(2);
  });

  it("filtro TODOS retorna todas as diferenças", () => {
    const diffs = toRebalancingViewModel(rebalanceamento).diferencas;
    const filtros: RebalancingFiltersViewModel = { tipo: "TODOS" };
    expect(filterRebalancingDiffs(diffs, filtros)).toHaveLength(2);
  });
});
