import { describe, it, expect } from "vitest";
import type { ProventoDto } from "@/application/dtos/proventos";
import {
  toDividendViewModel,
  toDividendViewModels,
  toDividendsSummaryViewModel,
  filterDividends,
  tipoToLabel,
} from "../types/dividends.view-model";

const dto: ProventoDto = {
  ativoId: "PETR4",
  ticker: "PETR4",
  tipo: "DIVIDENDO",
  valor: 150,
  dataPagamento: new Date("2026-03-20"),
  dataBase: new Date("2026-03-01"),
};

describe("dividends view-model", () => {
  it("mapeia provento para view model", () => {
    const vm = toDividendViewModel(dto);
    expect(vm.id).toContain("PETR4");
    expect(vm.tipoLabel).toBe("Dividendo");
    expect(vm.valor).toContain("R$");
    expect(vm.dataPagamento).toContain("/");
    expect(vm.dataBase).toContain("/");
  });

  it("mapeia lista e sumario", () => {
    const lista = toDividendViewModels({
      proventos: [dto, { ...dto, ativoId: "ITUB4", ticker: "ITUB4", tipo: "JCP", valor: 80 }],
      totalPeriodo: 230,
      totalAcumulado: 230,
    });
    expect(lista).toHaveLength(2);
    const summary = toDividendsSummaryViewModel({
      proventos: [dto, { ...dto, valor: 80 }],
      totalPeriodo: 230,
      totalAcumulado: 230,
    });
    expect(summary.totalPeriodo).toContain("R$");
    expect(summary.quantidade).toBe(2);
  });

  it("tipoToLabel traduz tipos", () => {
    expect(tipoToLabel("DIVIDENDO")).toBe("Dividendo");
    expect(tipoToLabel("JCP")).toBe("JCP");
    expect(tipoToLabel("X")).toBe("X");
  });

  it("filtra por tipo", () => {
    const vms = toDividendViewModels({
      proventos: [dto, { ...dto, ativoId: "ITUB4", ticker: "ITUB4", tipo: "JCP" }],
      totalPeriodo: 0,
      totalAcumulado: 0,
    });
    expect(filterDividends(vms, { termo: "", tipo: "DIVIDENDO", ano: "" })).toHaveLength(1);
    expect(filterDividends(vms, { termo: "", tipo: "TODOS", ano: "" })).toHaveLength(2);
  });

  it("filtra por termo (ticker)", () => {
    const vms = toDividendViewModels({
      proventos: [dto],
      totalPeriodo: 0,
      totalAcumulado: 0,
    });
    expect(filterDividends(vms, { termo: "petr", tipo: "TODOS", ano: "" })).toHaveLength(1);
    expect(filterDividends(vms, { termo: "ITUB", tipo: "TODOS", ano: "" })).toHaveLength(0);
  });
});
