import { describe, it, expect } from "vitest";
import { waitFor } from "@testing-library/react";
import { useRegisterOperationMutation } from "../hooks/use-register-operation-mutation";
import { createFakeDispatcher, renderWithOperationsProviders } from "./test-utils";
import type { OperacaoRegistradaDto } from "@/application/dtos/operacao";

function MutationProbe() {
  const mutation = useRegisterOperationMutation();
  return (
    <button
      data-testid="do-register"
      onClick={() =>
        mutation.mutate({
          portfolioId: "p1",
          tipo: "BUY",
          ativoId: "PETR4",
          quantidade: 10,
          valor: 300,
          data: new Date(),
        })
      }
    >
      registrar
    </button>
  );
}

describe("useRegisterOperationMutation", () => {
  it("dispatcha RegistrarOperacaoCommand via dispatcher", async () => {
    const dispatcher = createFakeDispatcher();
    const { container } = renderWithOperationsProviders(<MutationProbe />, dispatcher);
    const btn = container.querySelector('[data-testid="do-register"]') as HTMLButtonElement;
    btn.click();

    await waitFor(() => expect(dispatcher.comandos.length).toBe(1));
    const cmd = dispatcher.comandos[0] as { type: string; tipo: string; ativoId: string };
    expect(cmd.type).toBe("RegistrarOperacaoCommand");
    expect(cmd.tipo).toBe("BUY");
    expect(cmd.ativoId).toBe("PETR4");
  });

  it("propaga erro de ApplicationError", async () => {
    const dispatcher = createFakeDispatcher({
      registrarOperacao: () => {
        const err = new Error("VALID_ERROR") as unknown as OperacaoRegistradaDto;
        return err;
      },
    });
    const { container } = renderWithOperationsProviders(<MutationProbe />, dispatcher);
    const btn = container.querySelector('[data-testid="do-register"]') as HTMLButtonElement;
    btn.click();

    await waitFor(() => expect(dispatcher.comandos.length).toBe(1));
  });
});
