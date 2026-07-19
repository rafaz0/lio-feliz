import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useSyncMutation } from "../hooks/use-sync-mutation";
import { createFakeDispatcher, createTestQueryClient, SyncProviders } from "./test-utils";
import type { SincronizacaoRealizadaDto } from "@/application/dtos/sincronizacao";

function montar(dispatcher = createFakeDispatcher()) {
  const queryClient = createTestQueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SyncProviders dispatcher={dispatcher} queryClient={queryClient}>
      {children}
    </SyncProviders>
  );
  return renderHook(() => useSyncMutation(), { wrapper });
}

describe("useSyncMutation", () => {
  it("dispara SincronizarDadosCommand via dispatcher", async () => {
    const dispatcher = createFakeDispatcher();
    const { result } = montar(dispatcher);

    result.current.mutate({ usuarioId: "u1", fonte: "b3-csv" });

    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(dispatcher.comandos).toHaveLength(1);
    expect((dispatcher.comandos[0] as { type: string }).type).toBe("SincronizarDadosCommand");
  });

  it("retorna o DTO em caso de sucesso", async () => {
    const dto: SincronizacaoRealizadaDto = {
      fonte: "b3-csv",
      dataSincronizacao: new Date(),
      totalProcessado: 5,
      totalNovo: 5,
      totalIgnorado: 0,
      erros: [],
    };
    const dispatcher = createFakeDispatcher({
      sincronizarDados: () => dto,
    });
    const { result } = montar(dispatcher);

    result.current.mutate({ usuarioId: "u1", fonte: "b3-csv" });

    await waitFor(() => expect(result.current.data).not.toBeNull());
    expect(result.current.data?.totalNovo).toBe(5);
  });
});
