import { describe, it, expect } from "vitest";
import { waitFor, screen } from "@testing-library/react";
import { DashboardView } from "../components/DashboardView";
import { createFakeDispatcher, renderWithDashboardProviders } from "./test-utils";
import type { PatrimonioDto } from "@/application/dtos";
import type { HistoricoPatrimonialDto } from "@/application/dtos/historico";

const patrimonio: PatrimonioDto = {
  patrimonioTotal: 100000,
  patrimonioInvestido: 80000,
  saldoDisponivel: 20000,
  moeda: "BRL",
  dataReferencia: new Date("2026-07-19"),
  alocacao: [
    { classe: "Ações", valor: 60000, percentual: 60 },
    { classe: "Renda Fixa", valor: 40000, percentual: 40 },
  ],
  evolucaoMensal: 5.5,
};

const historico: HistoricoPatrimonialDto = {
  portfolioId: "p1",
  periodo: { inicio: new Date("2026-01-01"), fim: new Date("2026-07-19") },
  pontos: [
    { data: new Date("2026-01-01"), patrimonioTotal: 90000, patrimonioInvestido: 80000 },
    { data: new Date("2026-07-01"), patrimonioTotal: 100000, patrimonioInvestido: 80000 },
  ],
};

describe("DashboardView integration", () => {
  it("renderiza loading e depois o dashboard", async () => {
    const dispatcher = createFakeDispatcher({ patrimonio, historico });
    renderWithDashboardProviders(<DashboardView portfolioId="p1" />, dispatcher);

    expect(screen.getByTestId("dashboard-loading")).toBeDefined();

    await waitFor(() => expect(screen.getByTestId("dashboard-view")).toBeDefined());
    expect(screen.getByText("Patrimônio Consolidado")).toBeDefined();
    expect(screen.getByTestId("alocacao-chart")).toBeDefined();
    expect(screen.getByTestId("evolucao-chart")).toBeDefined();
  });

  it("renderiza erro quando o dispatcher falha", async () => {
    const dispatcher = createFakeDispatcher({
      patrimonio: null,
      patrimonioError: new Error("DISPATCH_ERROR") as never,
    });
    renderWithDashboardProviders(<DashboardView portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("dashboard-error")).toBeDefined());
    expect(screen.getByTestId("dashboard-retry")).toBeDefined();
  });
});
