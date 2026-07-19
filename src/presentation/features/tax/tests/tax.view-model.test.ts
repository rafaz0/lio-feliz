import { describe, it, expect } from "vitest";
import type { RelatorioFiscalDto } from "@/application/dtos";
import {
  toTaxReportViewModel,
  toTaxSummaryViewModel,
  filterTaxEntries,
  type TaxFiltersViewModel,
} from "../types/tax.view-model";

const relatorio: RelatorioFiscalDto = {
  ano: 2025,
  posicao31Dez: [
    { ticker: "PETR4", quantidade: 100, valorTotal: 3500 },
    { ticker: "ITUB4", quantidade: 50, valorTotal: 6500 },
  ],
  dividendosAno: 1200,
  jcpAno: 300,
  ganhoCapital: [
    { ticker: "VALE3", tipo: "VENDA", valorVenda: 8000, valorCompra: 7000, ganho: 1000 },
  ],
  prejuizoCompensar: 250,
};

describe("tax view-model", () => {
  it("mapeia relatório para view model", () => {
    const vm = toTaxReportViewModel(relatorio);
    expect(vm.ano).toBe(2025);
    expect(vm.posicao31Dez).toHaveLength(2);
    expect(vm.ganhoCapital[0].ganho).toBe(1000);
  });

  it("mapeia sumário com totais", () => {
    const report = toTaxReportViewModel(relatorio);
    const summary = toTaxSummaryViewModel(report);
    expect(summary.totalDividendos).toBe(1200);
    expect(summary.totalJcp).toBe(300);
    expect(summary.totalGanhoCapital).toBe(1000);
    expect(summary.prejuizoCompensar).toBe(250);
    expect(summary.quantidadePosicoes).toBe(2);
  });

  it("filtra por POSICAO", () => {
    const report = toTaxReportViewModel(relatorio);
    const filtros: TaxFiltersViewModel = { ano: 2025, tipo: "POSICAO" };
    expect(filterTaxEntries(report, filtros)).toHaveLength(2);
  });

  it("filtra por GANHO_CAPITAL", () => {
    const report = toTaxReportViewModel(relatorio);
    const filtros: TaxFiltersViewModel = { ano: 2025, tipo: "GANHO_CAPITAL" };
    expect(filterTaxEntries(report, filtros)).toHaveLength(1);
  });

  it("filtra por PROVENTOS retorna vazio (agregado)", () => {
    const report = toTaxReportViewModel(relatorio);
    const filtros: TaxFiltersViewModel = { ano: 2025, tipo: "PROVENTOS" };
    expect(filterTaxEntries(report, filtros)).toHaveLength(0);
  });

  it("filtro TODOS une posicoes e ganho de capital", () => {
    const report = toTaxReportViewModel(relatorio);
    const filtros: TaxFiltersViewModel = { ano: 2025, tipo: "TODOS" };
    expect(filterTaxEntries(report, filtros)).toHaveLength(3);
  });
});
