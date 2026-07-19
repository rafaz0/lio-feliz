import { describe, it, expect } from "vitest";
import { waitFor, screen } from "@testing-library/react";
import { useDividendsQuery } from "../hooks/use-dividends-query";
import { createFakeDispatcher, renderWithDividendsProviders } from "./test-utils";

function Probe({ portfolioId }: { portfolioId: string }) {
  const { dividends, summary, isLoading, isError } = useDividendsQuery(portfolioId);
  return (
    <div>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="error">{String(isError)}</span>
      <span data-testid="count">{dividends.length}</span>
      <span data-testid="summary">{summary ? summary.quantidade : 0}</span>
    </div>
  );
}

describe("useDividendsQuery", () => {
  it("dispatcha ObterProventosQuery e mapeia para view models", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithDividendsProviders(<Probe portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(dispatcher.queries.length).toBe(1));
    const query = dispatcher.queries[0] as { type: string; portfolioId: string };
    expect(query.type).toBe("ObterProventosQuery");
    expect(query.portfolioId).toBe("p1");

    await waitFor(() => expect(screen.getByTestId("count").textContent).toBe("2"));
    expect(screen.getByTestId("summary").textContent).toBe("2");
    expect(screen.getByTestId("error").textContent).toBe("false");
  });

  it("propaga erro do ApplicationError", async () => {
    const { ValidationError } = await import("@/application/errors");
    const dispatcher = createFakeDispatcher({
      obterProventos: () => new ValidationError("VALID_ERROR", "portfolioId obrigatório"),
    });
    renderWithDividendsProviders(<Probe portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("error").textContent).toBe("true"));
  });
});
