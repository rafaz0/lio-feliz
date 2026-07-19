import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DividendsSummary } from "../components/DividendsSummary";
import { DividendsTable } from "../components/DividendsTable";
import { DividendCard } from "../components/DividendCard";
import { DividendFilters } from "../components/DividendFilters";
import { DividendDetails } from "../components/DividendDetails";
import { DividendsLoading } from "../components/DividendsLoading";
import { DividendsEmpty } from "../components/DividendsEmpty";
import { DividendsError } from "../components/DividendsError";
import { toDividendViewModel, toDividendsSummaryViewModel } from "../types/dividends.view-model";
import type { ProventoDto } from "@/application/dtos/proventos";

const dto: ProventoDto = {
  ativoId: "PETR4",
  ticker: "PETR4",
  tipo: "DIVIDENDO",
  valor: 150,
  dataPagamento: new Date("2026-03-20"),
  dataBase: new Date("2026-03-01"),
};

const vm = toDividendViewModel(dto);
const summary = toDividendsSummaryViewModel({
  proventos: [dto, { ...dto, ativoId: "ITUB4", ticker: "ITUB4", tipo: "JCP", valor: 80 }],
  totalPeriodo: 230,
  totalAcumulado: 230,
});

describe("dividends components", () => {
  it("DividendsSummary exibe totais", () => {
    render(<DividendsSummary summary={summary} />);
    expect(screen.getByTestId("dividends-summary")).toBeDefined();
    expect(screen.getByTestId("summary-quantidade").textContent).toBe("2");
  });

  it("DividendsTable lista proventos", () => {
    render(<DividendsTable dividends={[vm]} onSelect={() => {}} />);
    expect(screen.getByTestId("dividends-table")).toBeDefined();
    expect(screen.getByTestId("dividend-row")).toBeDefined();
  });

  it("DividendsTable mostra vazio quando sem proventos", () => {
    render(<DividendsTable dividends={[]} />);
    expect(screen.getByTestId("dividends-table-empty")).toBeDefined();
  });

  it("DividendCard expõe ticker e valor", () => {
    render(<DividendCard dividend={vm} onSelect={() => {}} />);
    expect(screen.getByTestId("dividend-card").textContent).toContain("PETR4");
  });

  it("DividendFilters expõe filtros acessíveis", () => {
    render(
      <DividendFilters filtros={{ termo: "", tipo: "TODOS", ano: "" }} onFiltroChange={() => {}} />,
    );
    expect(screen.getByTestId("dividend-filters")).toBeDefined();
    expect(screen.getByTestId("filter-TODOS")).toBeDefined();
    expect(screen.getByTestId("filter-DIVIDENDO")).toBeDefined();
    expect(screen.getByTestId("filter-JCP")).toBeDefined();
  });

  it("DividendDetails renderiza quando há selecionado", () => {
    render(<DividendDetails dividend={vm} onClose={() => {}} />);
    expect(screen.getByTestId("dividend-details")).toBeDefined();
    expect(screen.getByTestId("dividend-details-close")).toBeDefined();
  });

  it("DividendDetails não renderiza quando nulo", () => {
    const { container } = render(<DividendDetails dividend={null} />);
    expect(container.querySelector('[data-testid="dividend-details"]')).toBeNull();
  });

  it("DividendsLoading exibe skeletons", () => {
    render(<DividendsLoading />);
    expect(screen.getByTestId("dividends-loading")).toBeDefined();
  });

  it("DividendsEmpty renderiza estado vazio", () => {
    render(<DividendsEmpty />);
    expect(screen.getByTestId("dividends-empty")).toBeDefined();
    expect(screen.getByText("Nenhum provento")).toBeDefined();
  });

  it("DividendsError expõe retry acessível", () => {
    render(<DividendsError message="falhou" onRetry={() => {}} />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByTestId("dividends-retry")).toBeDefined();
  });
});
