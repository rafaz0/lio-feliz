import { describe, it, expect } from "vitest";
import {
  toReportViewModel,
  toReportViewModels,
  toExportResultViewModel,
  REPORTS_CATALOG,
} from "../types/reports.view-model";
import type { DadosExportadosDto } from "@/application/dtos/exportacao";

const dto: DadosExportadosDto = {
  formato: "csv",
  conteudo: "ticker,nome",
  nomeArquivo: "carteira-p1.csv",
};

describe("reports view-model", () => {
  it("mapeia catálogo de relatórios", () => {
    const vms = toReportViewModels(REPORTS_CATALOG);
    expect(vms.length).toBeGreaterThan(0);
    expect(vms[0].id).toBe(REPORTS_CATALOG[0].id);
  });

  it("mapeia item individual", () => {
    const vm = toReportViewModel(REPORTS_CATALOG[0]);
    expect(vm.titulo).toBe(REPORTS_CATALOG[0].titulo);
    expect(vm.formatos).toEqual(REPORTS_CATALOG[0].formatos);
  });

  it("mapeia resultado de exportação", () => {
    const vm = toExportResultViewModel(dto);
    expect(vm.nomeArquivo).toBe("carteira-p1.csv");
    expect(vm.tamanho).toBe(dto.conteudo.length);
  });
});
