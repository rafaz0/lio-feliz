import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReportCard } from "../components/ReportCard";
import { ReportsList } from "../components/ReportsList";
import { ReportFilters } from "../components/ReportFilters";
import { ExportPanel } from "../components/ExportPanel";
import { ExportProgress } from "../components/ExportProgress";
import { ReportsLoading } from "../components/ReportsLoading";
import { ReportsEmpty } from "../components/ReportsEmpty";
import { ReportsError } from "../components/ReportsError";
import { toReportViewModels, REPORTS_CATALOG } from "../types/reports.view-model";
import { createFakeDispatcher, renderWithReportsProviders } from "./test-utils";

const relatorios = toReportViewModels(REPORTS_CATALOG);

describe("reports components", () => {
  it("ReportCard expõe seleção acessível", () => {
    render(<ReportCard relatorio={relatorios[0]} onSelecionar={() => {}} />);
    expect(screen.getByTestId("report-card")).toBeDefined();
    expect(screen.getByTestId("report-card-title").textContent).toBe(relatorios[0].titulo);
    expect(screen.getByTestId("report-card-select")).toBeDefined();
  });

  it("ReportsList lista relatórios", () => {
    render(<ReportsList relatorios={relatorios} onSelecionar={() => {}} />);
    expect(screen.getByTestId("reports-list")).toBeDefined();
    expect(screen.getAllByTestId("report-card").length).toBe(relatorios.length);
  });

  it("ReportsList vazia exibe mensagem", () => {
    render(<ReportsList relatorios={[]} onSelecionar={() => {}} />);
    expect(screen.getByTestId("reports-list-empty")).toBeDefined();
  });

  it("ReportFilters expõe busca acessível", () => {
    render(<ReportFilters termo="" onTermoChange={() => {}} />);
    expect(screen.getByTestId("report-filters")).toBeDefined();
    expect(screen.getByLabelText("Buscar relatório")).toBeDefined();
  });

  it("ExportPanel expõe formatos e disparo", () => {
    const dispatcher = createFakeDispatcher();
    renderWithReportsProviders(
      <ExportPanel portfolioId="p1" formatos={["json", "csv"]} relatorioSelecionado="Carteira" />,
      dispatcher,
    );
    expect(screen.getByTestId("export-formatos")).toBeDefined();
    expect(screen.getByTestId("export-formato-json")).toBeDefined();
    expect(screen.getByTestId("export-formato-csv")).toBeDefined();
    expect(screen.getByTestId("export-submit")).toBeDefined();
  });

  it("ExportProgress expõe estado de progresso", () => {
    render(<ExportProgress formato="csv" />);
    expect(screen.getByTestId("export-progress").getAttribute("aria-busy")).toBe("true");
  });

  it("ReportsLoading expõe estado de carregamento", () => {
    render(<ReportsLoading />);
    expect(screen.getByTestId("reports-loading").getAttribute("aria-busy")).toBe("true");
  });

  it("ReportsEmpty expõe reset acessível", () => {
    render(<ReportsEmpty onReset={() => {}} />);
    expect(screen.getByTestId("reports-empty")).toBeDefined();
    expect(screen.getByTestId("reports-empty-reset")).toBeDefined();
  });

  it("ReportsError expõe retry acessível", () => {
    render(<ReportsError message="falhou" onRetry={() => {}} />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByTestId("reports-retry")).toBeDefined();
  });
});
