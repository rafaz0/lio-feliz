import { describe, it, expect } from "vitest";
import { waitFor, screen, fireEvent } from "@testing-library/react";
import { RebalancingPage } from "../components/RebalancingPage";
import { createFakeDispatcher, renderWithProviders } from "./test-utils";

describe("RebalancingPage integration", () => {
  it("carrega rebalanceamento e renderiza gráfico + comparativo", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithProviders(<RebalancingPage portfolioId="p1" />, dispatcher);

    expect(screen.getByTestId("rebalancing-page")).toBeDefined();
    await waitFor(() => expect(screen.getByTestId("allocation-chart")).toBeDefined());
    expect(screen.getAllByTestId("rebalancing-row").length).toBe(2);
    expect(screen.getByTestId("suggested-contribution")).toBeDefined();
  });

  it("filtra por DESVALANCE mantém diferenças", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithProviders(<RebalancingPage portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("rebalancing-filters")).toBeDefined());
    fireEvent.click(screen.getByTestId("filter-DESVALANCE"));
    expect(screen.getAllByTestId("rebalancing-row").length).toBe(2);
  });

  it("renderiza erro quando a query falha", async () => {
    const { ValidationError } = await import("@/application/errors");
    const dispatcher = createFakeDispatcher({
      rebalanceamento: () => new ValidationError("VALID_ERROR", "sem dados"),
    });
    renderWithProviders(<RebalancingPage portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("rebalancing-error")).toBeDefined());
  });
});
