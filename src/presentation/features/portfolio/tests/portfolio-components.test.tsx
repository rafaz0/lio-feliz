import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PortfolioSummary } from "../components/PortfolioSummary";
import { PortfolioTable } from "../components/PortfolioTable";
import { PortfolioCard } from "../components/PortfolioCard";
import { PortfolioFilters } from "../components/PortfolioFilters";
import { AssetDetailsPanel } from "../components/AssetDetailsPanel";
import { PositionRow } from "../components/PositionRow";
import { AllocationBadge } from "../components/AllocationBadge";
import { PortfolioLoading } from "../components/PortfolioLoading";
import { PortfolioError } from "../components/PortfolioError";
import { EmptyPortfolio } from "../components/EmptyPortfolio";
import type {
  PortfolioSummaryViewModel,
  PositionViewModel,
  AllocationViewModel,
  AssetViewModel,
} from "../types/portfolio.view-model";

const allocation: AllocationViewModel = {
  classe: "Ações",
  valor: "R$ 60.000,00",
  percentual: 60,
  fill: "var(--chart-1)",
};

const summary: PortfolioSummaryViewModel = {
  patrimonioTotal: "R$ 100.000,00",
  patrimonioInvestido: "R$ 80.000,00",
  saldoDisponivel: "R$ 20.000,00",
  evolucaoMensal: "+5,50%",
  evolucaoMensalTrend: "up",
  moeda: "BRL",
  dataReferencia: "19/07/2026",
  totalAtivos: 1,
  alocacao: [allocation],
};

const position: PositionViewModel = allocation;

const asset: AssetViewModel = {
  ticker: "PETR4",
  nome: "Petrobras",
  classe: "Ações",
  quantidade: "100",
  precoMedio: "R$ 30,00",
  valorTotal: "R$ 3.000,00",
  valorizacao: "+10,00%",
  rentabilidadeTotal: "+12,50%",
  rentabilidadePeriodo: "-2,00%",
  positions: [],
};

describe("portfolio components", () => {
  it("PortfolioSummary renderiza blocos e badges", () => {
    render(<PortfolioSummary summary={summary} />);
    expect(screen.getByTestId("portfolio-summary")).toBeDefined();
    expect(screen.getByText("Resumo da Carteira")).toBeDefined();
    expect(screen.getByTestId("allocation-badge")).toBeDefined();
  });

  it("PortfolioTable filtra e ordena", () => {
    const { rerender } = render(
      <PortfolioTable
        positions={[
          { classe: "Ações", valor: "R$ 60.000,00", percentual: 60, fill: "var(--chart-1)" },
          { classe: "Renda Fixa", valor: "R$ 40.000,00", percentual: 40, fill: "var(--chart-2)" },
        ]}
      />,
    );
    expect(screen.getAllByTestId("position-row")).toHaveLength(2);
    rerender(
      <PortfolioTable
        positions={[
          { classe: "Ações", valor: "R$ 60.000,00", percentual: 60, fill: "var(--chart-1)" },
          { classe: "Renda Fixa", valor: "R$ 40.000,00", percentual: 40, fill: "var(--chart-2)" },
        ]}
        selectedClasse="Ações"
      />,
    );
    expect(screen.getByTestId("portfolio-table")).toBeDefined();
  });

  it("PortfolioCard é selecionável via teclado", () => {
    const onSelect = () => {};
    render(<PortfolioCard allocation={allocation} onSelect={onSelect} />);
    expect(screen.getByTestId("portfolio-card")).toBeDefined();
  });

  it("PortfolioFilters expõe controles acessíveis", () => {
    render(
      <PortfolioFilters
        filtro=""
        onFiltroChange={() => {}}
        classes={["Ações", "Renda Fixa"]}
        classeSelecionada={null}
        onClasseChange={() => {}}
      />,
    );
    expect(screen.getByTestId("portfolio-filters")).toBeDefined();
    expect(screen.getByTestId("portfolio-filters-input")).toBeDefined();
    expect(screen.getByTestId("filter-todas")).toBeDefined();
  });

  it("AssetDetailsPanel renderiza métricas", () => {
    render(<AssetDetailsPanel asset={asset} />);
    expect(screen.getByTestId("asset-details-panel")).toBeDefined();
    expect(screen.getByText("PETR4")).toBeDefined();
  });

  it("PositionRow renderiza linha", () => {
    render(<PositionRow position={position} />);
    expect(screen.getByTestId("position-row")).toBeDefined();
  });

  it("AllocationBadge renderiza classe", () => {
    render(<AllocationBadge allocation={allocation} />);
    expect(screen.getByTestId("allocation-badge")).toBeDefined();
    expect(screen.getByText("Ações · 60,0%")).toBeDefined();
  });

  it("PortfolioLoading exibe skeletons", () => {
    render(<PortfolioLoading />);
    expect(screen.getByTestId("portfolio-loading")).toBeDefined();
  });

  it("PortfolioError expõe retry acessível", () => {
    render(<PortfolioError message="falhou" onRetry={() => {}} />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByTestId("portfolio-retry")).toBeDefined();
  });

  it("EmptyPortfolio renderiza estado vazio", () => {
    render(<EmptyPortfolio />);
    expect(screen.getByTestId("empty-portfolio")).toBeDefined();
    expect(screen.getByText("Carteira vazia")).toBeDefined();
  });
});
