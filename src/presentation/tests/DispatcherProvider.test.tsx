import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { IDispatcher } from "@/application/dispatcher";
import { ApplicationError } from "@/application/errors";
import { DispatcherProvider } from "@/presentation/providers/DispatcherProvider";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";

function createStubDispatcher(): IDispatcher {
  return {
    DispatchCommand: async () => new ApplicationError("STUB", "stub") as never,
    DispatchQuery: async () => new ApplicationError("STUB", "stub") as never,
    RegisterCommand: () => {},
    RegisterQuery: () => {},
  };
}

function Consumer() {
  const dispatcher = useDispatcher();
  return <span>dispatcher: {dispatcher ? "ok" : "null"}</span>;
}

describe("DispatcherProvider", () => {
  it("disponibiliza o IDispatcher via contexto", () => {
    const dispatcher = createStubDispatcher();
    render(
      <DispatcherProvider dispatcher={dispatcher}>
        <Consumer />
      </DispatcherProvider>,
    );
    expect(screen.getByText("dispatcher: ok")).toBeDefined();
  });
});

describe("useDispatcher", () => {
  it("lança erro quando usado fora do DispatcherProvider", () => {
    const consoleError = console.error;
    console.error = () => {};
    expect(() => render(<Consumer />)).toThrowError(
      "useDispatcher deve ser usado dentro de um DispatcherProvider",
    );
    console.error = consoleError;
  });
});
