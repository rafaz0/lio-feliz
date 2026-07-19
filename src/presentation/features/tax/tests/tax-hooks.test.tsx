import { describe, it, expect } from "vitest";
import { waitFor, screen } from "@testing-library/react";
import { useTaxReportQuery } from "../hooks/use-tax-report-query";
import { createFakeDispatcher, renderWithProviders } from "./test-utils";

function TaxProbe({ portfolioId, ano }: { portfolioId: string; ano: number }) {
  const q = useTaxReportQuery(portfolioId, ano);
  return (
    <div>
      <span data-testid="t-loading">{String(q.isLoading)}</span>
      <span data-testid="t-error">{String(q.isError)}</span>
      <span data-testid="t-ano">{q.relatorio?.ano ?? 0}</span>
      <span data-testid="t-posicoes">{q.relatorio?.posicao31Dez.length ?? 0}</span>
    </div>
  );
}

describe("hook de relatório fiscal", () => {
  it("dispatcha GerarRelatorioFiscalQuery e mapeia", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithProviders(<TaxProbe portfolioId="p1" ano={2025} />, dispatcher);

    await waitFor(() => expect(dispatcher.queries.length).toBe(1));
    expect(dispatcher.queries[0].type).toBe("GerarRelatorioFiscalQuery");
    expect((dispatcher.queries[0] as { type: string; portfolioId: string; ano: number }).ano).toBe(
      2025,
    );

    await waitFor(() => expect(screen.getByTestId("t-ano").textContent).toBe("2025"));
    expect(screen.getByTestId("t-posicoes").textContent).toBe("2");
  });

  it("propaga erro da query", async () => {
    const { ValidationError } = await import("@/application/errors");
    const dispatcher = createFakeDispatcher({
      relatorio: () => new ValidationError("VALID_ERROR", "ano invalido"),
    });
    renderWithProviders(<TaxProbe portfolioId="p1" ano={2025} />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("t-error").textContent).toBe("true"));
  });
});
