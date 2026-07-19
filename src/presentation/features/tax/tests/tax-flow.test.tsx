import { describe, it, expect } from "vitest";
import { waitFor, screen, fireEvent } from "@testing-library/react";
import { TaxPage } from "../components/TaxPage";
import { createFakeDispatcher, renderWithProviders } from "./test-utils";

describe("TaxPage integration", () => {
  it("carrega relatório e renderiza sumário + tabela", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithProviders(<TaxPage portfolioId="p1" />, dispatcher);

    expect(screen.getByTestId("tax-page")).toBeDefined();
    await waitFor(() => expect(screen.getByTestId("tax-summary")).toBeDefined());
    expect(screen.getByTestId("summary-dividendos").textContent).toContain("1.200");
    expect(screen.getAllByTestId("tax-row").length).toBe(3);
  });

  it("filtra por GANHO_CAPITAL", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithProviders(<TaxPage portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("tax-filters")).toBeDefined());
    fireEvent.click(screen.getByTestId("filter-GANHO_CAPITAL"));
    expect(screen.getAllByTestId("tax-row").length).toBe(1);
  });

  it("renderiza erro quando a query falha", async () => {
    const { ValidationError } = await import("@/application/errors");
    const dispatcher = createFakeDispatcher({
      relatorio: () => new ValidationError("VALID_ERROR", "ano invalido"),
    });
    renderWithProviders(<TaxPage portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("tax-error")).toBeDefined());
  });
});
