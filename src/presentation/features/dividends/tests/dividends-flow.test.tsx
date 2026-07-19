import { describe, it, expect } from "vitest";
import { waitFor, screen, fireEvent } from "@testing-library/react";
import { DividendsPage } from "../components/DividendsPage";
import { createFakeDispatcher, renderWithDividendsProviders } from "./test-utils";

describe("DividendsPage integration", () => {
  it("carrega proventos e renderiza tabela + sumário", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithDividendsProviders(<DividendsPage portfolioId="p1" />, dispatcher);

    expect(screen.getByTestId("dividends-page")).toBeDefined();
    await waitFor(() => expect(screen.getByTestId("dividends-table")).toBeDefined());
    expect(screen.getAllByTestId("dividend-row").length).toBeGreaterThan(0);
    expect(screen.getByTestId("summary-quantidade").textContent).toBe("2");
  });

  it("filtra por tipo DIVIDENDO", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithDividendsProviders(<DividendsPage portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("dividends-table")).toBeDefined());

    fireEvent.change(screen.getByTestId("dividend-filter-tipo"), {
      target: { value: "DIVIDENDO" },
    });

    await waitFor(() => expect(screen.getAllByTestId("dividend-row")).toHaveLength(1));
  });

  it("abre detalhes ao selecionar linha", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithDividendsProviders(<DividendsPage portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("dividends-table")).toBeDefined());
    fireEvent.click(screen.getAllByTestId("dividend-row")[0]);
    expect(screen.getByTestId("dividend-details")).toBeDefined();
  });

  it("renderiza erro quando a query falha", async () => {
    const { ValidationError } = await import("@/application/errors");
    const dispatcher = createFakeDispatcher({
      obterProventos: () => new ValidationError("VALID_ERROR", "sem dados"),
    });
    renderWithDividendsProviders(<DividendsPage portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("dividends-error")).toBeDefined());
  });
});
