import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useExportReportMutation } from "../hooks/use-export-report-mutation";
import { createFakeDispatcher, createTestQueryClient, ReportsProviders } from "./test-utils";
import type { DadosExportadosDto } from "@/application/dtos/exportacao";

function montar(dispatcher = createFakeDispatcher()) {
  const queryClient = createTestQueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ReportsProviders dispatcher={dispatcher} queryClient={queryClient}>
      {children}
    </ReportsProviders>
  );
  return renderHook(() => useExportReportMutation(), { wrapper });
}

describe("useExportReportMutation", () => {
  it("dispara ExportarDadosQuery via dispatcher", async () => {
    const dispatcher = createFakeDispatcher();
    const { result } = montar(dispatcher);

    result.current.mutate({ portfolioId: "p1", formato: "csv" });

    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(dispatcher.queries).toHaveLength(1);
    expect((dispatcher.queries[0] as { type: string }).type).toBe("ExportarDadosQuery");
  });

  it("retorna o DTO em caso de sucesso", async () => {
    const dto: DadosExportadosDto = {
      formato: "csv",
      conteudo: "ticker,nome",
      nomeArquivo: "carteira-p1.csv",
    };
    const dispatcher = createFakeDispatcher({ exportarDados: () => dto });
    const { result } = montar(dispatcher);

    result.current.mutate({ portfolioId: "p1", formato: "csv" });

    await waitFor(() => expect(result.current.data).not.toBeNull());
    expect(result.current.data?.nomeArquivo).toBe("carteira-p1.csv");
  });
});
