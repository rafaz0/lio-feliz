import { describe, it, expect } from "vitest";
import { waitFor, screen } from "@testing-library/react";
import { useHistoricoQuery } from "../hooks/use-historico-query";
import { useRentabilidadeQuery } from "../hooks/use-rentabilidade-query";
import { createFakeDispatcher, renderWithHistoryProviders } from "./test-utils";

function HistoricoProbe({ portfolioId }: { portfolioId: string }) {
  const h = useHistoricoQuery(portfolioId);
  const r = useRentabilidadeQuery(portfolioId);
  return (
    <div>
      <span data-testid="h-loading">{String(h.isLoading)}</span>
      <span data-testid="h-error">{String(h.isError)}</span>
      <span data-testid="h-count">{h.historico?.pontos.length ?? 0}</span>
      <span data-testid="r-count">{r.rentabilidade ? 1 : 0}</span>
    </div>
  );
}

describe("hooks de histórico", () => {
  it("dispatcha ambas as queries e mapeia", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithHistoryProviders(<HistoricoProbe portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(dispatcher.queries.length).toBe(2));
    const tipos = dispatcher.queries.map((q) => q.type).sort();
    expect(tipos).toEqual(["ConsultarRentabilidadeQuery", "ObterHistoricoPatrimonialQuery"]);

    await waitFor(() => expect(screen.getByTestId("h-count").textContent).toBe("2"));
    expect(screen.getByTestId("r-count").textContent).toBe("1");
  });

  it("propaga erro do historico", async () => {
    const { ValidationError } = await import("@/application/errors");
    const dispatcher = createFakeDispatcher({
      historico: () => new ValidationError("VALID_ERROR", "sem periodo"),
    });
    renderWithHistoryProviders(<HistoricoProbe portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("h-error").textContent).toBe("true"));
  });
});
