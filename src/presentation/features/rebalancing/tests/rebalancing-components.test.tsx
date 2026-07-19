import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AllocationChart } from "../components/AllocationChart";
import { AllocationComparison } from "../components/AllocationComparison";
import { SuggestedContribution } from "../components/SuggestedContribution";
import { RebalancingTable } from "../components/RebalancingTable";
import { RebalancingFilters } from "../components/RebalancingFilters";
import { RebalancingLoading } from "../components/RebalancingLoading";
import { RebalancingEmpty } from "../components/RebalancingEmpty";
import { RebalancingError } from "../components/RebalancingError";
import { toRebalancingViewModel } from "../types/rebalancing.view-model";
import type { RebalanceamentoDto } from "@/application/dtos";

const rebalanceamento: RebalanceamentoDto = {
  alocacaoAtual: [
    { classe: "RENDA_FIXA", valor: 4000, percentual: 40 },
    { classe: "ACOES", valor: 6000, percentual: 60 },
  ],
  alocacaoDesejada: [
    { classe: "RENDA_FIXA", valor: 5000, percentual: 50 },
    { classe: "ACOES", valor: 5000, percentual: 50 },
  ],
  diferencas: [
    { classe: "RENDA_FIXA", percentualAtual: 40, percentualDesejado: 50, diferenca: 10 },
    { classe: "ACOES", percentualAtual: 60, percentualDesejado: 50, diferenca: -10 },
  ],
  sugestaoAportes: [{ classe: "RENDA_FIXA", valorSugerido: 1000 }],
};

const vm = toRebalancingViewModel(rebalanceamento);

describe("rebalancing components", () => {
  it("AllocationChart renderiza container", () => {
    render(<AllocationChart alocacao={vm.alocacaoAtual} />);
    expect(screen.getByTestId("allocation-chart")).toBeDefined();
  });

  it("AllocationComparison lista diferencas", () => {
    render(
      <AllocationComparison
        atual={vm.alocacaoAtual}
        desejada={vm.alocacaoDesejada}
        diferencas={vm.diferencas}
      />,
    );
    expect(screen.getByTestId("allocation-comparison")).toBeDefined();
    expect(screen.getAllByTestId("allocation-diff-row").length).toBe(2);
  });

  it("SuggestedContribution lista sugestoes", () => {
    render(<SuggestedContribution sugestoes={vm.sugestoes} />);
    expect(screen.getByTestId("suggested-contribution")).toBeDefined();
    expect(screen.getAllByTestId("suggestion-row").length).toBe(1);
  });

  it("SuggestedContribution mostra vazio", () => {
    render(<SuggestedContribution sugestoes={[]} />);
    expect(screen.getByTestId("suggested-contribution")).toBeDefined();
  });

  it("RebalancingTable lista linhas", () => {
    render(
      <RebalancingTable
        atual={vm.alocacaoAtual}
        desejada={vm.alocacaoDesejada}
        diferencas={vm.diferencas}
      />,
    );
    expect(screen.getByTestId("rebalancing-table")).toBeDefined();
    expect(screen.getAllByTestId("rebalancing-row").length).toBe(2);
  });

  it("RebalancingFilters expõe filtros", () => {
    render(<RebalancingFilters filtros={{ tipo: "TODOS" }} onChange={() => {}} />);
    expect(screen.getByTestId("rebalancing-filters")).toBeDefined();
    expect(screen.getByTestId("filter-TODOS")).toBeDefined();
    expect(screen.getByTestId("filter-DESVALANCE")).toBeDefined();
    expect(screen.getByTestId("filter-EQUILIBRADO")).toBeDefined();
  });

  it("RebalancingLoading exibe skeletons", () => {
    render(<RebalancingLoading />);
    expect(screen.getByTestId("rebalancing-loading")).toBeDefined();
  });

  it("RebalancingEmpty renderiza estado vazio", () => {
    render(<RebalancingEmpty />);
    expect(screen.getByTestId("rebalancing-empty")).toBeDefined();
  });

  it("RebalancingError expõe retry acessível", () => {
    render(<RebalancingError message="falhou" onRetry={() => {}} />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByTestId("rebalancing-retry")).toBeDefined();
  });
});
