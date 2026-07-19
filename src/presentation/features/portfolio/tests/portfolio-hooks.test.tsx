import { describe, it, expect } from "vitest";
import { waitFor } from "@testing-library/react";
import { usePortfolioQuery } from "../hooks/use-portfolio-query";
import { usePortfolioSummaryQuery } from "../hooks/use-portfolio-summary-query";
import { useAssetDetailsQuery } from "../hooks/use-asset-details-query";
import { createFakeDispatcher, renderWithPortfolioProviders } from "./test-utils";
import type { PatrimonioDto } from "@/application/dtos";
import type { PosicaoDetalhadaDto } from "@/application/dtos/posicao";

const patrimonio: PatrimonioDto = {
  patrimonioTotal: 100000,
  patrimonioInvestido: 80000,
  saldoDisponivel: 20000,
  moeda: "BRL",
  dataReferencia: new Date("2026-07-19"),
  alocacao: [{ classe: "Ações", valor: 60000, percentual: 60 }],
  evolucaoMensal: 5.5,
};

const posicao: PosicaoDetalhadaDto = {
  ticker: "PETR4",
  nome: "Petrobras",
  classe: "Ações",
  quantidade: 100,
  precoMedio: 30,
  valorTotal: 3000,
  rentabilidade: {
    ativoId: "petr4",
    periodo: { inicio: new Date(0), fim: new Date() },
    valorizacao: 10,
    rentabilidadeTotal: 12,
    rentabilidadePeriodo: -2,
  },
};

function PortfolioProbe({ portfolioId }: { portfolioId: string }) {
  const { summary, positions } = usePortfolioQuery(portfolioId);
  return (
    <div>
      <span data-testid="total">{summary?.patrimonioTotal ?? "none"}</span>
      <span data-testid="posicoes">{positions.length}</span>
    </div>
  );
}

function SummaryProbe({ portfolioId }: { portfolioId: string }) {
  const { summary } = usePortfolioSummaryQuery(portfolioId);
  return <span data-testid="summary">{summary?.patrimonioTotal ?? "none"}</span>;
}

function AssetProbe({ portfolioId, ativoId }: { portfolioId: string; ativoId: string }) {
  const { asset } = useAssetDetailsQuery(portfolioId, ativoId);
  return <span data-testid="asset">{asset?.ticker ?? "none"}</span>;
}

describe("portfolio hooks", () => {
  it("usePortfolioQuery consome ObterPatrimonioQuery", async () => {
    const dispatcher = createFakeDispatcher({ patrimonio });
    renderWithPortfolioProviders(<PortfolioProbe portfolioId="p1" />, dispatcher);
    await waitFor(() => expect(dispatcher.patrimonioCalls).toBeGreaterThan(0));
    await waitFor(() =>
      expect(document.querySelector("[data-testid=total]")?.textContent).toContain("R$"),
    );
    expect(document.querySelector("[data-testid=posicoes]")?.textContent).toBe("1");
  });

  it("usePortfolioSummaryQuery consome ObterPatrimonioQuery", async () => {
    const dispatcher = createFakeDispatcher({ patrimonio });
    renderWithPortfolioProviders(<SummaryProbe portfolioId="p1" />, dispatcher);
    await waitFor(() =>
      expect(document.querySelector("[data-testid=summary]")?.textContent).toContain("R$"),
    );
  });

  it("useAssetDetailsQuery consome ConsultarPosicaoQuery", async () => {
    const dispatcher = createFakeDispatcher({ posicoes: { petr4: posicao } });
    renderWithPortfolioProviders(<AssetProbe portfolioId="p1" ativoId="petr4" />, dispatcher);
    await waitFor(() => expect(dispatcher.posicaoCalls).toBeGreaterThan(0));
    await waitFor(() =>
      expect(document.querySelector("[data-testid=asset]")?.textContent).toBe("PETR4"),
    );
  });

  it("não dispara query com portfolioId vazio", () => {
    const dispatcher = createFakeDispatcher({ patrimonio });
    renderWithPortfolioProviders(<PortfolioProbe portfolioId="" />, dispatcher);
    expect(dispatcher.patrimonioCalls).toBe(0);
  });
});
