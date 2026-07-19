import { describe, it, expect } from "vitest";
import type { OperacaoRegistradaDto } from "@/application/dtos/operacao";
import {
  toOperationViewModel,
  toOperationViewModels,
  filterOperations,
  tipoToLabel,
} from "../types/operations.view-model";

const dto: OperacaoRegistradaDto = {
  operacaoId: "op-1",
  tipo: "BUY",
  ativoId: "PETR4",
  quantidade: 100,
  valor: 3000,
  data: new Date("2026-07-19"),
  status: "CONFIRMED",
};

describe("operations view-model", () => {
  it("mapeia operacao para view model", () => {
    const vm = toOperationViewModel(dto);
    expect(vm.id).toBe("op-1");
    expect(vm.tipoLabel).toBe("Compra");
    expect(vm.ativoId).toBe("PETR4");
    expect(vm.valor).toContain("R$");
    expect(vm.data).toContain("/");
  });

  it("mapeia lista", () => {
    expect(toOperationViewModels([dto, dto])).toHaveLength(2);
  });

  it("tipoToLabel traduz tipos", () => {
    expect(tipoToLabel("SELL")).toBe("Venda");
    expect(tipoToLabel("DIVIDEND")).toBe("Dividendo");
    expect(tipoToLabel("JCP")).toBe("JCP");
    expect(tipoToLabel("X")).toBe("X");
  });

  it("filtra por tipo", () => {
    const vms = toOperationViewModels([dto, { ...dto, operacaoId: "op-2", tipo: "SELL" }]);
    expect(filterOperations(vms, { termo: "", tipo: "BUY" })).toHaveLength(1);
    expect(filterOperations(vms, { termo: "", tipo: "TODOS" })).toHaveLength(2);
  });

  it("filtra por termo (ativo)", () => {
    const vms = toOperationViewModels([dto]);
    expect(filterOperations(vms, { termo: "petr", tipo: "TODOS" })).toHaveLength(1);
    expect(filterOperations(vms, { termo: "VALE", tipo: "TODOS" })).toHaveLength(0);
  });
});
