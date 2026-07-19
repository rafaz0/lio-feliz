import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { KpiCard } from "../components/KpiCard";
import { PatrimonioConsolidado } from "../components/PatrimonioConsolidado";
import { AlocacaoChart } from "../components/AlocacaoChart";
import { EvolucaoChart } from "../components/EvolucaoChart";
import { DashboardLoading } from "../components/DashboardLoading";
import { DashboardError } from "../components/DashboardError";
import type {
  DashboardViewModel,
  KpiCardViewModel,
  AlocacaoItemViewModel,
  EvolucaoPontoViewModel,
} from "../types/dashboard.view-model";

const kpi: KpiCardViewModel = {
  label: "Patrimônio Total",
  value: "R$ 100.000,00",
  hint: "Soma de todos os ativos",
  trend: "neutral",
};

const alocacao: AlocacaoItemViewModel[] = [
  { classe: "Ações", valor: "R$ 60.000,00", percentual: 60, fill: "var(--chart-1)" },
  { classe: "Renda Fixa", valor: "R$ 40.000,00", percentual: 40, fill: "var(--chart-2)" },
];

const evolucao: EvolucaoPontoViewModel[] = [
  { data: "jan/26", patrimonioTotal: 90000, patrimonioInvestido: 80000 },
  { data: "jul/26", patrimonioTotal: 100000, patrimonioInvestido: 80000 },
];

const viewModel: DashboardViewModel = {
  patrimonioTotal: "R$ 100.000,00",
  patrimonioInvestido: "R$ 80.000,00",
  saldoDisponivel: "R$ 20.000,00",
  evolucaoMensal: "+5,50%",
  evolucaoMensalTrend: "up",
  moeda: "BRL",
  dataReferencia: "19/07/2026",
  kpis: [kpi],
  alocacao,
  evolucao,
};

describe("dashboard components", () => {
  it("KpiCard renderiza label e valor", () => {
    render(<KpiCard kpi={kpi} />);
    expect(screen.getByText("Patrimônio Total")).toBeDefined();
    expect(screen.getByText("R$ 100.000,00")).toBeDefined();
  });

  it("PatrimonioConsolidado renderiza blocos", () => {
    render(<PatrimonioConsolidado viewModel={viewModel} />);
    expect(screen.getByTestId("patrimonio-consolidado")).toBeDefined();
    expect(screen.getByText("Patrimônio Consolidado")).toBeDefined();
  });

  it("AlocacaoChart lista classes", () => {
    render(<AlocacaoChart alocacao={alocacao} />);
    expect(screen.getByTestId("alocacao-chart")).toBeDefined();
    expect(screen.getByText("Ações")).toBeDefined();
    expect(screen.getByText("Renda Fixa")).toBeDefined();
  });

  it("AlocacaoChart mostra estado vazio", () => {
    render(<AlocacaoChart alocacao={[]} />);
    expect(screen.getByText("Sem dados de alocação.")).toBeDefined();
  });

  it("EvolucaoChart renderiza container do gráfico", () => {
    const { container } = render(<EvolucaoChart evolucao={evolucao} />);
    expect(screen.getByTestId("evolucao-chart")).toBeDefined();
    expect(container.querySelector("[data-chart]")).not.toBeNull();
  });

  it("EvolucaoChart mostra estado vazio", () => {
    render(<EvolucaoChart evolucao={[]} />);
    expect(screen.getByText("Sem dados de evolução.")).toBeDefined();
  });

  it("DashboardLoading exibe skeletons", () => {
    render(<DashboardLoading />);
    expect(screen.getByTestId("dashboard-loading")).toBeDefined();
  });

  it("DashboardError expõe retry acessível", () => {
    const onRetry = () => {};
    render(<DashboardError message="falhou" onRetry={onRetry} />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByTestId("dashboard-retry")).toBeDefined();
  });
});
