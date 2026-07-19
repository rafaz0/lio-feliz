import { describe, it, expect } from "vitest";
import { waitFor, screen } from "@testing-library/react";
import { useRebalancingQuery } from "../hooks/use-rebalancing-query";
import { createFakeDispatcher, renderWithProviders } from "./test-utils";

function RebalancingProbe({ portfolioId }: { portfolioId: string }) {
  const q = useRebalancingQuery(portfolioId);
  return (
    <div>
      <span data-testid="r-loading">{String(q.isLoading)}</span>
      <span data-testid="r-error">{String(q.isError)}</span>
      <span data-testid="r-count">{q.rebalanceamento?.diferencas.length ?? 0}</span>
      <span data-testid="r-sugestoes">{q.rebalanceamento?.sugestaoAportes.length ?? 0}</span>
    </div>
  );
}

describe("hook de rebalanceamento", () => {
  it("dispatcha CalcularRebalanceamentoQuery e mapeia", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithProviders(<RebalancingProbe portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(dispatcher.queries.length).toBe(1));
    expect(dispatcher.queries[0].type).toBe("CalcularRebalanceamentoQuery");
    expect((dispatcher.queries[0] as { type: string; portfolioId: string }).portfolioId).toBe("p1");

    await waitFor(() => expect(screen.getByTestId("r-count").textContent).toBe("2"));
    expect(screen.getByTestId("r-sugestoes").textContent).toBe("1");
  });

  it("propaga erro da query", async () => {
    const { ValidationError } = await import("@/application/errors");
    const dispatcher = createFakeDispatcher({
      rebalanceamento: () => new ValidationError("VALID_ERROR", "sem dados"),
    });
    renderWithProviders(<RebalancingProbe portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("r-error").textContent).toBe("true"));
  });
});
