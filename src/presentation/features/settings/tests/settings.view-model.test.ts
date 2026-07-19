import { describe, it, expect } from "vitest";
import type { ConfiguracoesDto } from "@/application/dtos";
import {
  toSettingsViewModel,
  toStrategyViewModel,
  toGoalsViewModel,
} from "../types/settings.view-model";

const configuracoes: ConfiguracoesDto = {
  usuarioId: "u1",
  estrategia: {
    usuarioId: "u1",
    percentuais: { ACOES: 60, RENDA_FIXA: 40 },
    moeda: "BRL",
    toleranciaRebalanceamento: 5,
    dataAtualizacao: new Date("2026-01-01"),
  },
  metas: [
    {
      nome: "Reserva",
      valorAlvo: 10000,
      valorAtual: 0,
      percentualConcluido: 0,
      prazo: new Date("2026-12-31"),
    },
  ],
};

describe("settings view-model", () => {
  it("mapeia estrategia", () => {
    const vm = toStrategyViewModel(configuracoes.estrategia);
    expect(vm?.moeda).toBe("BRL");
    expect(vm?.percentuais.ACOES).toBe(60);
  });

  it("mapeia estrategia nula", () => {
    expect(toStrategyViewModel(null)).toBeNull();
  });

  it("mapeia metas", () => {
    const goals = toGoalsViewModel(configuracoes.metas);
    expect(goals.metas).toHaveLength(1);
    expect(goals.metas[0].nome).toBe("Reserva");
  });

  it("monta SettingsViewModel com notificacoes e tema padrao", () => {
    const vm = toSettingsViewModel(configuracoes);
    expect(vm.usuarioId).toBe("u1");
    expect(vm.estrategia?.toleranciaRebalanceamento).toBe(5);
    expect(vm.notificacoes.canal).toBe("EMAIL");
    expect(vm.tema).toBe("sistema");
    expect(vm.metas).toHaveLength(1);
  });
});
