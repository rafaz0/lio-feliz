import { describe, it, expect } from "vitest";
import { waitFor } from "@testing-library/react";
import { usePatrimonioQuery } from "../hooks/use-patrimonio-query";
import { useHistoricoQuery } from "../hooks/use-historico-query";
import { useDashboardQuery } from "../hooks/use-dashboard-query";
import { createFakeDispatcher, renderWithDashboardProviders } from "./test-utils";
import type { PatrimonioDto } from "@/application/dtos";
import type { HistoricoPatrimonialDto } from "@/application/dtos/historico";

const patrimonio: PatrimonioDto = {
  patrimonioTotal: 100000,
  patrimonioInvestido: 80000,
  saldoDisponivel: 20000,
  moeda: "BRL",
  dataReferencia: new Date("2026-07-19"),
  alocacao: [{ classe: "Ações", valor: 60000, percentual: 60 }],
  evolucaoMensal: 5.5,
};

const historico: HistoricoPatrimonialDto = {
  portfolioId: "p1",
  periodo: { inicio: new Date("2026-01-01"), fim: new Date("2026-07-19") },
  pontos: [{ data: new Date("2026-07-01"), patrimonioTotal: 100000, patrimonioInvestido: 80000 }],
};

function PatrimonioProbe({ portfolioId }: { portfolioId: string }) {
  const { data, isLoading } = usePatrimonioQuery(portfolioId);
  return (
    <div>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="total">{data?.patrimonioTotal ?? "none"}</span>
    </div>
  );
}

function HistoricoProbe({ portfolioId }: { portfolioId: string }) {
  const { data } = useHistoricoQuery(portfolioId, {
    inicio: new Date("2026-01-01"),
    fim: new Date("2026-07-19"),
  });
  return <span data-testid="pontos">{data?.pontos.length ?? "none"}</span>;
}

function DashboardProbe({ portfolioId }: { portfolioId: string }) {
  const { viewModel } = useDashboardQuery(portfolioId);
  return <span data-testid="vm">{viewModel ? "ok" : "null"}</span>;
}

describe("dashboard hooks", () => {
  it("usePatrimonioQuery consome o dispatcher", async () => {
    const dispatcher = createFakeDispatcher({ patrimonio });
    renderWithDashboardProviders(<PatrimonioProbe portfolioId="p1" />, dispatcher);
    await waitFor(() => expect(dispatcher.patrimonioCalls).toBeGreaterThan(0));
    await waitFor(() =>
      expect(document.querySelector("[data-testid=total]")?.textContent).toBe("100000"),
    );
  });

  it("useHistoricoQuery consome o dispatcher", async () => {
    const dispatcher = createFakeDispatcher({ historico });
    renderWithDashboardProviders(<HistoricoProbe portfolioId="p1" />, dispatcher);
    await waitFor(() => expect(dispatcher.historicoCalls).toBeGreaterThan(0));
    await waitFor(() =>
      expect(document.querySelector("[data-testid=pontos]")?.textContent).toBe("1"),
    );
  });

  it("useDashboardQuery combina patrimonio e historico", async () => {
    const dispatcher = createFakeDispatcher({ patrimonio, historico });
    renderWithDashboardProviders(<DashboardProbe portfolioId="p1" />, dispatcher);
    await waitFor(() => expect(document.querySelector("[data-testid=vm]")?.textContent).toBe("ok"));
  });

  it("não dispara query quando portfolioId vazio", () => {
    const dispatcher = createFakeDispatcher({ patrimonio });
    renderWithDashboardProviders(<PatrimonioProbe portfolioId="" />, dispatcher);
    expect(dispatcher.patrimonioCalls).toBe(0);
  });
});
