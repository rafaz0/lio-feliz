import { describe, it, expect } from "vitest";
import { waitFor, screen, fireEvent } from "@testing-library/react";
import { HistoryPage } from "../components/HistoryPage";
import { createFakeDispatcher, renderWithHistoryProviders } from "./test-utils";

describe("HistoryPage integration", () => {
  it("carrega histórico e renderiza gráfico + sumário", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithHistoryProviders(<HistoryPage portfolioId="p1" />, dispatcher);

    expect(screen.getByTestId("history-page")).toBeDefined();
    await waitFor(() => expect(screen.getByTestId("performance-chart")).toBeDefined());
    expect(screen.getByTestId("summary-valorizacao").textContent).toBe("+20.00%");
    expect(screen.getAllByTestId("history-row").length).toBe(2);
  });

  it("filtra por tipo PATRIMONIO", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithHistoryProviders(<HistoryPage portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("performance-chart")).toBeDefined());
    fireEvent.change(screen.getByTestId("history-filter-tipo"), {
      target: { value: "PATRIMONIO" },
    });
    expect(screen.getAllByTestId("history-row").length).toBe(2);
  });

  it("renderiza erro quando a query de histórico falha", async () => {
    const { ValidationError } = await import("@/application/errors");
    const dispatcher = createFakeDispatcher({
      historico: () => new ValidationError("VALID_ERROR", "sem dados"),
    });
    renderWithHistoryProviders(<HistoryPage portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("history-error")).toBeDefined());
  });
});
