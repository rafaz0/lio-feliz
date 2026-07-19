import { describe, it, expect } from "vitest";
import { waitFor, screen, fireEvent } from "@testing-library/react";
import { OperationPage } from "../components/OperationPage";
import { createFakeDispatcher, renderWithOperationsProviders } from "./test-utils";

describe("OperationPage integration", () => {
  it("registra operação e adiciona ao histórico", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithOperationsProviders(<OperationPage portfolioId="p1" />, dispatcher);

    expect(screen.getByTestId("operation-page")).toBeDefined();
    expect(screen.getByTestId("operation-empty")).toBeDefined();

    fireEvent.change(screen.getByLabelText("Ativo"), { target: { value: "PETR4" } });
    fireEvent.change(screen.getByLabelText("Quantidade"), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText("Valor"), { target: { value: "300" } });
    fireEvent.change(screen.getByLabelText("Data"), { target: { value: "2026-07-19" } });

    fireEvent.click(screen.getByTestId("operation-submit"));

    await waitFor(() => expect(dispatcher.comandos.length).toBe(1));
    await waitFor(() => expect(screen.getByTestId("operation-history")).toBeDefined());
    expect(screen.getByTestId("operation-row")).toBeDefined();
  });

  it("fluxo de filtros no histórico", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithOperationsProviders(<OperationPage portfolioId="p1" />, dispatcher);

    fireEvent.change(screen.getByLabelText("Ativo"), { target: { value: "PETR4" } });
    fireEvent.change(screen.getByLabelText("Quantidade"), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText("Valor"), { target: { value: "300" } });
    fireEvent.change(screen.getByLabelText("Data"), { target: { value: "2026-07-19" } });
    fireEvent.click(screen.getByTestId("operation-submit"));

    await waitFor(() => expect(screen.getByTestId("operation-history")).toBeDefined());

    fireEvent.click(screen.getByTestId("filter-SELL"));
    expect(screen.getByTestId("operation-table-empty")).toBeDefined();
  });
});
