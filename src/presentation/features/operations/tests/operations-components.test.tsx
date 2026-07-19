import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OperationForm } from "../components/OperationForm";
import { createFakeDispatcher, renderWithOperationsProviders } from "./test-utils";
import { OperationTable } from "../components/OperationTable";
import { OperationFilters } from "../components/OperationFilters";
import { OperationHistory } from "../components/OperationHistory";
import { OperationLoading } from "../components/OperationLoading";
import { OperationEmpty } from "../components/OperationEmpty";
import { OperationError } from "../components/OperationError";
import type { OperationViewModel } from "../types/operations.view-model";
import { toOperationViewModel } from "../types/operations.view-model";
import type { OperacaoRegistradaDto } from "@/application/dtos/operacao";

const dto: OperacaoRegistradaDto = {
  operacaoId: "op-1",
  tipo: "BUY",
  ativoId: "PETR4",
  quantidade: 100,
  valor: 3000,
  data: new Date("2026-07-19"),
  status: "CONFIRMED",
};

const vm: OperationViewModel = toOperationViewModel(dto);

describe("operations components", () => {
  it("OperationForm expõe campos acessíveis", () => {
    const dispatcher = createFakeDispatcher();
    renderWithOperationsProviders(
      <OperationForm portfolioId="p1" onSuccess={() => {}} />,
      dispatcher,
    );
    expect(screen.getByTestId("operation-form")).toBeDefined();
    expect(screen.getByLabelText("Ativo")).toBeDefined();
    expect(screen.getByTestId("operation-submit")).toBeDefined();
  });

  it("OperationTable lista operações", () => {
    render(<OperationTable operations={[vm]} />);
    expect(screen.getByTestId("operation-table")).toBeDefined();
    expect(screen.getByTestId("operation-row")).toBeDefined();
  });

  it("OperationTable mostra vazio quando sem operações", () => {
    render(<OperationTable operations={[]} />);
    expect(screen.getByTestId("operation-table-empty")).toBeDefined();
  });

  it("OperationFilters expõe filtros", () => {
    render(<OperationFilters filtros={{ termo: "", tipo: "TODOS" }} onFiltroChange={() => {}} />);
    expect(screen.getByTestId("operation-filters")).toBeDefined();
    expect(screen.getByTestId("filter-TODOS")).toBeDefined();
    expect(screen.getByTestId("filter-BUY")).toBeDefined();
  });

  it("OperationHistory renderiza filtros e tabela", () => {
    render(<OperationHistory operations={[vm]} />);
    expect(screen.getByTestId("operation-history")).toBeDefined();
    expect(screen.getByTestId("operation-table")).toBeDefined();
  });

  it("OperationLoading exibe skeletons", () => {
    render(<OperationLoading />);
    expect(screen.getByTestId("operation-loading")).toBeDefined();
  });

  it("OperationEmpty renderiza estado vazio", () => {
    render(<OperationEmpty />);
    expect(screen.getByTestId("operation-empty")).toBeDefined();
    expect(screen.getByText("Nenhuma operação")).toBeDefined();
  });

  it("OperationError expõe retry acessível", () => {
    render(<OperationError message="falhou" onRetry={() => {}} />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByTestId("operation-retry")).toBeDefined();
  });
});
