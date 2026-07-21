import { describe, it, expect } from "vitest";
import { toImportJobViewModel, toImportJobViewModels } from "../types/import-export.view-model";
import type { ImportJobDto } from "@/application/dtos/importacao";

const mockDto: ImportJobDto = {
  id: "import-001",
  fileName: "operacoes.csv",
  fileSize: 2048,
  format: "CSV",
  source: "LOCAL",
  status: "COMPLETED",
  totalRecords: 10,
  processedRecords: 10,
  errorRecords: 0,
  createdAt: "2026-07-19T10:00:00Z",
  completedAt: "2026-07-19T10:01:00Z",
};

describe("ImportJobViewModel", () => {
it("mapeia dto para view model com progresso 100%", () => {
    const vm = toImportJobViewModel(mockDto);
    expect(vm.id).toBe("import-001");
    expect(vm.fileName).toBe("operacoes.csv");
    expect(vm.fileSize).toBe("2 KB");
    expect(vm.format).toBe("CSV");
    expect(vm.source).toBe("LOCAL");
    expect(vm.progressPercent).toBe(100);
  });

  it("calcula progresso parcial corretamente", () => {
    const dto: ImportJobDto = { ...mockDto, totalRecords: 20, processedRecords: 5, status: "PROCESSING" };
    const vm = toImportJobViewModel(dto);
    expect(vm.progressPercent).toBe(25);
  });

  it("retorna 0% quando totalRecords é zero", () => {
    const dto: ImportJobDto = { ...mockDto, totalRecords: 0, processedRecords: 0 };
    const vm = toImportJobViewModel(dto);
    expect(vm.progressPercent).toBe(0);
  });

  it("formata 0 bytes corretamente", () => {
    const dto: ImportJobDto = { ...mockDto, fileSize: 0 };
    const vm = toImportJobViewModel(dto);
    expect(vm.fileSize).toBe("0 B");
  });

  it("converte lista de dtos para view models", () => {
    const vms = toImportJobViewModels([mockDto, { ...mockDto, id: "import-002" }]);
    expect(vms).toHaveLength(2);
    expect(vms[0].id).toBe("import-001");
    expect(vms[1].id).toBe("import-002");
  });

  it("renderiza data formatada", () => {
    const vm = toImportJobViewModel(mockDto);
    expect(vm.createdAt).toBe("2026-07-19T10:00:00Z");
    expect(vm.completedAt).toBe("2026-07-19T10:01:00Z");
  });

  it("lida com completedAt ausente", () => {
    const dto: ImportJobDto = { ...mockDto, completedAt: undefined };
    const vm = toImportJobViewModel(dto);
    expect(vm.completedAt).toBeUndefined();
  });
});
