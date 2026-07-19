import { describe, it, expect } from "vitest";
import { waitFor, screen, fireEvent } from "@testing-library/react";
import { PortfolioPage } from "../components/PortfolioPage";
import { createFakeDispatcher, renderWithPortfolioProviders } from "./test-utils";
import type { PatrimonioDto } from "@/application/dtos";
import type { PosicaoDetalhadaDto } from "@/application/dtos/posicao";

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

describe("PortfolioPage integration", () => {
  it("renderiza resumo, tabela e permite ver detalhe do ativo", async () => {
    const dispatcher = createFakeDispatcher({
      patrimonio,
      posicoes: { Ações: posicao },
    });
    renderWithPortfolioProviders(<PortfolioPage portfolioId="p1" />, dispatcher);

    expect(screen.getByTestId("portfolio-loading")).toBeDefined();
    await waitFor(() => expect(screen.getByTestId("portfolio-page")).toBeDefined());
    expect(screen.getByTestId("portfolio-summary")).toBeDefined();
    expect(screen.getByTestId("portfolio-table")).toBeDefined();

    const primeiraLinha = screen.getAllByTestId("position-row")[0];
    fireEvent.click(primeiraLinha);

    await waitFor(() => expect(screen.getByTestId("asset-details-panel")).toBeDefined());
    expect(screen.getByText("PETR4")).toBeDefined();
  });

  it("renderiza EmptyPortfolio quando não há ativos", async () => {
    const dispatcher = createFakeDispatcher({
      patrimonio: { ...patrimonio, alocacao: [] },
    });
    renderWithPortfolioProviders(<PortfolioPage portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("empty-portfolio")).toBeDefined());
  });

  it("renderiza erro quando o dispatcher falha", async () => {
    const dispatcher = createFakeDispatcher({
      patrimonio: null,
      patrimonioError: new Error("DISPATCH_ERROR") as never,
    });
    renderWithPortfolioProviders(<PortfolioPage portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("portfolio-error")).toBeDefined());
    expect(screen.getByTestId("portfolio-retry")).toBeDefined();
  });

  it("filtra ativos por classe", async () => {
    const dispatcher = createFakeDispatcher({ patrimonio });
    renderWithPortfolioProviders(<PortfolioPage portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("portfolio-page")).toBeDefined());
    const input = screen.getByTestId("portfolio-filters-input");
    fireEvent.change(input, { target: { value: "renda" } });
    expect(screen.getAllByTestId("position-row")).toHaveLength(1);
  });
});
