import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SyncPage } from "../components/SyncPage";
import { createFakeDispatcher, renderWithSyncProviders } from "./test-utils";
import type { SincronizacaoRealizadaDto } from "@/application/dtos/sincronizacao";

describe("sync flow", () => {
  it("renderiza o formulário e o estado vazio inicialmente", () => {
    const dispatcher = createFakeDispatcher();
    renderWithSyncProviders(<SyncPage />, dispatcher);
    expect(screen.getByTestId("sync-page")).toBeDefined();
    expect(screen.getByTestId("sync-form")).toBeDefined();
    expect(screen.getByTestId("sync-empty")).toBeDefined();
  });

  it("executa sincronização e exibe o resultado", async () => {
    const dto: SincronizacaoRealizadaDto = {
      fonte: "b3-csv",
      dataSincronizacao: new Date("2026-07-19T10:00:00"),
      totalProcessado: 8,
      totalNovo: 6,
      totalIgnorado: 2,
      erros: [],
    };
    const dispatcher = createFakeDispatcher({ sincronizarDados: () => dto });
    renderWithSyncProviders(<SyncPage />, dispatcher);

    await userEvent.click(screen.getByTestId("sync-submit"));

    expect(await screen.findByTestId("sync-result")).toBeDefined();
    expect(screen.getByTestId("sync-result-processado").textContent).toContain("8");
    expect(screen.getByTestId("sync-result-novas").textContent).toContain("6");
    expect(screen.queryByTestId("sync-empty")).toBeNull();
    expect((dispatcher.comandos[0] as { type: string }).type).toBe("SincronizarDadosCommand");
  });

  it("exibe erro quando o dispatcher falha", async () => {
    const dispatcher = createFakeDispatcher({
      sincronizarDados: () => new Error("Falha de gateway") as never,
    });
    renderWithSyncProviders(<SyncPage />, dispatcher);

    await userEvent.click(screen.getByTestId("sync-submit"));

    expect(await screen.findByRole("alert")).toBeDefined();
  });
});
