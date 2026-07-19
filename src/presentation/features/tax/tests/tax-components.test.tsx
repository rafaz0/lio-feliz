import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TaxSummary } from "../components/TaxSummary";
import { TaxReportCard } from "../components/TaxReportCard";
import { TaxYearSelector } from "../components/TaxYearSelector";
import { TaxFilters } from "../components/TaxFilters";
import { TaxTable } from "../components/TaxTable";
import { TaxExportPanel } from "../components/TaxExportPanel";
import { TaxLoading } from "../components/TaxLoading";
import { TaxEmpty } from "../components/TaxEmpty";
import { TaxError } from "../components/TaxError";
import { toTaxReportViewModel, toTaxSummaryViewModel } from "../types/tax.view-model";
import type { RelatorioFiscalDto } from "@/application/dtos";

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

const report = toTaxReportViewModel(relatorio);
const summary = toTaxSummaryViewModel(report);

describe("tax components", () => {
  it("TaxSummary exibe agregados", () => {
    render(<TaxSummary summary={summary} />);
    expect(screen.getByTestId("tax-summary")).toBeDefined();
    expect(screen.getByTestId("summary-dividendos").textContent).toContain("1.200");
    expect(screen.getByTestId("summary-jcp").textContent).toContain("300");
  });

  it("TaxReportCard exibe resumo", () => {
    render(<TaxReportCard report={report} />);
    expect(screen.getByTestId("tax-report-card")).toBeDefined();
    expect(screen.getByTestId("report-posicoes").textContent).toBe("2");
  });

  it("TaxYearSelector expõe seletor", () => {
    render(<TaxYearSelector ano={2025} anos={[2025, 2024, 2023]} onChange={() => {}} />);
    expect(screen.getByTestId("tax-year-selector")).toBeDefined();
    expect(screen.getByTestId("tax-ano-select")).toBeDefined();
  });

  it("TaxFilters expõe filtros", () => {
    render(<TaxFilters filtros={{ ano: 2025, tipo: "TODOS" }} onChange={() => {}} />);
    expect(screen.getByTestId("tax-filters")).toBeDefined();
    expect(screen.getByTestId("filter-TODOS")).toBeDefined();
    expect(screen.getByTestId("filter-POSICAO")).toBeDefined();
    expect(screen.getByTestId("filter-PROVENTOS")).toBeDefined();
    expect(screen.getByTestId("filter-GANHO_CAPITAL")).toBeDefined();
  });

  it("TaxTable lista entradas", () => {
    render(<TaxTable entries={[...report.posicao31Dez, ...report.ganhoCapital]} />);
    expect(screen.getByTestId("tax-table")).toBeDefined();
    expect(screen.getAllByTestId("tax-row").length).toBe(3);
  });

  it("TaxTable mostra vazio", () => {
    render(<TaxTable entries={[]} />);
    expect(screen.getByTestId("tax-table")).toBeDefined();
  });

  it("TaxExportPanel expõe exportação", () => {
    render(<TaxExportPanel ano={2025} onExport={() => {}} />);
    expect(screen.getByTestId("tax-export-panel")).toBeDefined();
    expect(screen.getByTestId("tax-export-button")).toBeDefined();
  });

  it("TaxLoading exibe skeletons", () => {
    render(<TaxLoading />);
    expect(screen.getByTestId("tax-loading")).toBeDefined();
  });

  it("TaxEmpty renderiza estado vazio", () => {
    render(<TaxEmpty />);
    expect(screen.getByTestId("tax-empty")).toBeDefined();
  });

  it("TaxError expõe retry acessível", () => {
    render(<TaxError message="falhou" onRetry={() => {}} />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByTestId("tax-retry")).toBeDefined();
  });
});
