import { describe, it, expect } from "vitest";
import { waitFor, screen } from "@testing-library/react";
import { useTaxCalculationQuery } from "../hooks/use-tax-calculation-query";
import { useTaxDeclarationExportMutation } from "../hooks/use-tax-declaration-export-mutation";
import { createFakeDispatcher, renderWithProviders } from "./test-utils";

function CalculationProbe({ portfolioId, ano }: { portfolioId: string; ano: number }) {
  const q = useTaxCalculationQuery(portfolioId, ano);
  return (
    <div>
      <span data-testid="tc-loading">{String(q.isLoading)}</span>
      <span data-testid="tc-error">{String(q.isError)}</span>
      <span data-testid="tc-ano">{q.declaracao?.ano ?? 0}</span>
    </div>
  );
}

function ExportProbe() {
  const m = useTaxDeclarationExportMutation();
  return (
    <div>
      <span data-testid="te-pending">{String(m.isPending)}</span>
      <button
        data-testid="te-trigger"
        onClick={() =>
          m.mutate({
            type: "ExportarDeclaracaoCommand",
            portfolioId: "p1",
            ano: 2025,
            formato: "csv",
            includes: ["operacoes", "proventos"],
          })
        }
      >
        Exportar
      </button>
      <span data-testid="te-data">{m.data?.nomeArquivo ?? ""}</span>
      <span data-testid="te-error">{m.error?.message ?? ""}</span>
    </div>
  );
}

describe("tax extended hooks", () => {
  describe("useTaxCalculationQuery", () => {
    it("dispatcha ObterDeclaracaoQuery", async () => {
      const dispatcher = createFakeDispatcher();
      renderWithProviders(<CalculationProbe portfolioId="p1" ano={2025} />, dispatcher);

      await waitFor(() => expect(dispatcher.queries.length).toBe(1));
      expect(dispatcher.queries[0].type).toBe("ObterDeclaracaoQuery");
    });

    it("propaga erro da query", async () => {
      const { NotFoundError } = await import("@/application/errors");
      const dispatcher = createFakeDispatcher({
        declaracao: () => new NotFoundError("TAX_NOT_FOUND", "nao encontrado"),
      });
      renderWithProviders(<CalculationProbe portfolioId="p1" ano={2025} />, dispatcher);

      await waitFor(() => expect(screen.getByTestId("tc-error").textContent).toBe("true"));
    });
  });

  describe("useTaxDeclarationExportMutation", () => {
    it("dispatcha ExportarDeclaracaoCommand ao clicar", async () => {
      const dispatcher = createFakeDispatcher();
      renderWithProviders(<ExportProbe />, dispatcher);

      screen.getByTestId("te-trigger").click();

      await waitFor(() => expect(dispatcher.commands.length).toBe(1));
      expect(dispatcher.commands[0].type).toBe("ExportarDeclaracaoCommand");
    });
  });
});
