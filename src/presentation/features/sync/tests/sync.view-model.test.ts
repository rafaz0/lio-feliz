import { describe, it, expect } from "vitest";
import {
  toSyncResultViewModel,
  toSyncErrorViewModel,
  fonteToLabel,
} from "../types/sync.view-model";
import type {
  SincronizacaoRealizadaDto,
  SincronizacaoErroDto,
} from "@/application/dtos/sincronizacao";

const erroDto: SincronizacaoErroDto = {
  fonte: "b3-csv",
  linha: 3,
  tipo: "DOMAIN_ERROR",
  mensagem: "Ativo inválido",
};

const dto: SincronizacaoRealizadaDto = {
  fonte: "b3-csv",
  dataSincronizacao: new Date("2026-07-19T10:00:00"),
  totalProcessado: 10,
  totalNovo: 7,
  totalIgnorado: 3,
  erros: [erroDto],
};

describe("sync view-model", () => {
  it("mapeia erro de sincronização", () => {
    const vm = toSyncErrorViewModel(erroDto);
    expect(vm.linha).toBe(3);
    expect(vm.tipo).toBe("DOMAIN_ERROR");
    expect(vm.mensagem).toBe("Ativo inválido");
  });

  it("mapeia resultado sem erros", () => {
    const vm = toSyncResultViewModel({ ...dto, erros: [] });
    expect(vm.fonte).toBe("b3-csv");
    expect(vm.totalProcessado).toBe(10);
    expect(vm.totalNovo).toBe(7);
    expect(vm.totalIgnorado).toBe(3);
    expect(vm.temErros).toBe(false);
    expect(vm.dataSincronizacao).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  });

  it("mapeia resultado com erros", () => {
    const vm = toSyncResultViewModel(dto);
    expect(vm.temErros).toBe(true);
    expect(vm.erros).toHaveLength(1);
  });

  it("converte fonte para label", () => {
    expect(fonteToLabel("b3-csv")).toBe("B3 (CSV)");
    expect(fonteToLabel("desconhecida")).toBe("desconhecida");
  });
});
