import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PerformanceSummary } from "../components/PerformanceSummary";
import { PerformanceChart } from "../components/PerformanceChart";
import { BenchmarkComparison } from "../components/BenchmarkComparison";
import { HistoryTable } from "../components/HistoryTable";
import { HistoryFilters } from "../components/HistoryFilters";
import { HistoryLoading } from "../components/HistoryLoading";
import { HistoryEmpty } from "../components/HistoryEmpty";
import { HistoryError } from "../components/HistoryError";
import {
  toPerformanceSummaryViewModel,
  toPerformancePoints,
  toBenchmarkViewModel,
} from "../types/history.view-model";
import type { HistoricoPatrimonialDto, RentabilidadeDto } from "@/application/dtos";

const historico: HistoricoPatrimonialDto = {
  portfolioId: "p1",
  periodo: { inicio: new Date("2026-01-01"), fim: new Date("2026-06-01") },
  pontos: [
    { data: new Date("2026-01-01"), patrimonioTotal: 1000, patrimonioInvestido: 1000 },
    { data: new Date("2026-06-01"), patrimonioTotal: 1200, patrimonioInvestido: 1000 },
  ],
};

const rent: RentabilidadeDto = {
  ativoId: "PORTFOLIO",
  periodo: { inicio: new Date("2026-01-01"), fim: new Date("2026-06-01") },
  valorizacao: 20,
  rentabilidadeTotal: 20,
  rentabilidadePeriodo: 20,
};

describe("history components", () => {
  it("PerformanceSummary exibe métricas", () => {
    render(<PerformanceSummary summary={toPerformanceSummaryViewModel(historico, rent)} />);
    expect(screen.getByTestId("performance-summary")).toBeDefined();
    expect(screen.getByTestId("summary-valorizacao").textContent).toBe("+20.00%");
  });

  it("PerformanceChart renderiza container", () => {
    render(<PerformanceChart pontos={toPerformancePoints(historico)} />);
    expect(screen.getByTestId("performance-chart")).toBeDefined();
  });

  it("BenchmarkComparison lista series", () => {
    render(<BenchmarkComparison benchmarks={toBenchmarkViewModel(rent)} />);
    expect(screen.getByTestId("benchmark-comparison")).toBeDefined();
    expect(screen.getAllByTestId("benchmark-row").length).toBe(2);
  });

  it("HistoryTable lista pontos", () => {
    render(<HistoryTable pontos={toPerformancePoints(historico)} />);
    expect(screen.getByTestId("history-table")).toBeDefined();
    expect(screen.getAllByTestId("history-row").length).toBe(2);
  });

  it("HistoryTable mostra vazio", () => {
    render(<HistoryTable pontos={[]} />);
    expect(screen.getByTestId("history-table-empty")).toBeDefined();
  });

  it("HistoryFilters expõe filtros", () => {
    render(<HistoryFilters filtros={{ termo: "", tipo: "TODOS" }} onFiltroChange={() => {}} />);
    expect(screen.getByTestId("history-filters")).toBeDefined();
    expect(screen.getByTestId("filter-TODOS")).toBeDefined();
    expect(screen.getByTestId("filter-PATRIMONIO")).toBeDefined();
    expect(screen.getByTestId("filter-INVESTIDO")).toBeDefined();
  });

  it("HistoryLoading exibe skeletons", () => {
    render(<HistoryLoading />);
    expect(screen.getByTestId("history-loading")).toBeDefined();
  });

  it("HistoryEmpty renderiza estado vazio", () => {
    render(<HistoryEmpty />);
    expect(screen.getByTestId("history-empty")).toBeDefined();
    expect(screen.getByText("Sem histórico")).toBeDefined();
  });

  it("HistoryError expõe retry acessível", () => {
    render(<HistoryError message="falhou" onRetry={() => {}} />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByTestId("history-retry")).toBeDefined();
  });
});
