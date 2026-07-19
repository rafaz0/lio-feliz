import { describe, it, expect } from "vitest";
import { waitFor, screen } from "@testing-library/react";
import { useSettingsQuery } from "../hooks/use-settings-query";
import { useUpdateSettingsMutation } from "../hooks/use-update-settings-mutation";
import { createFakeDispatcher, renderWithProviders } from "./test-utils";

function SettingsProbe() {
  const q = useSettingsQuery();
  const m = useUpdateSettingsMutation();
  return (
    <div>
      <span data-testid="s-loading">{String(q.isLoading)}</span>
      <span data-testid="s-error">{String(q.isError)}</span>
      <span data-testid="s-usuario">{q.configuracoes?.usuarioId ?? ""}</span>
      <button
        type="button"
        data-testid="s-save"
        onClick={() =>
          m.mutate({ moeda: "BRL", toleranciaRebalanceamento: 10, percentuais: { ACOES: 70 } })
        }
      >
        salvar
      </button>
      <span data-testid="s-saving">{String(m.isPending)}</span>
    </div>
  );
}

describe("hooks de configurações", () => {
  it("dispatcha ObterConfiguracoesQuery e mapeia", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithProviders(<SettingsProbe />, dispatcher);

    await waitFor(() => expect(dispatcher.queries.length).toBe(1));
    expect(dispatcher.queries[0].type).toBe("ObterConfiguracoesQuery");
    expect((dispatcher.queries[0] as { type: string; usuarioId: string }).usuarioId).toBe("u1");

    await waitFor(() => expect(screen.getByTestId("s-usuario").textContent).toBe("u1"));
  });

  it("dispatcha ConfigurarEstrategiaCommand ao salvar", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithProviders(<SettingsProbe />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("s-usuario").textContent).toBe("u1"));
    screen.getByTestId("s-save").click();

    await waitFor(() => expect(dispatcher.commands.length).toBe(1));
    const cmd = dispatcher.commands[0] as { type: string; usuarioId: string; moeda: string };
    expect(cmd.type).toBe("ConfigurarEstrategiaCommand");
    expect(cmd.usuarioId).toBe("u1");
    expect(cmd.moeda).toBe("BRL");
  });

  it("propaga erro da query", async () => {
    const { ValidationError } = await import("@/application/errors");
    const dispatcher = createFakeDispatcher({
      configuracoes: () => new ValidationError("VALID_ERROR", "sem usuario"),
    });
    renderWithProviders(<SettingsProbe />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("s-error").textContent).toBe("true"));
  });
});
