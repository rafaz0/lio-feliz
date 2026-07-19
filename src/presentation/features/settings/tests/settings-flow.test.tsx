import { describe, it, expect } from "vitest";
import { waitFor, screen, fireEvent } from "@testing-library/react";
import { SettingsPage } from "../components/SettingsPage";
import { createFakeDispatcher, renderWithProviders } from "./test-utils";

describe("SettingsPage integration", () => {
  it("carrega configurações e renderiza cards", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithProviders(<SettingsPage />, dispatcher);

    expect(screen.getByTestId("settings-page")).toBeDefined();
    await waitFor(() => expect(screen.getByTestId("user-preferences-card")).toBeDefined());
    expect(screen.getByTestId("pref-usuario").textContent).toBe("u1");
    expect(screen.getByTestId("strategy-settings")).toBeDefined();
    expect(screen.getAllByTestId("goal-row").length).toBe(1);
  });

  it("salva estrategia via mutation", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithProviders(<SettingsPage />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("strategy-save")).toBeDefined());
    fireEvent.click(screen.getByTestId("strategy-save"));

    await waitFor(() => expect(dispatcher.commands.length).toBe(1));
    expect(dispatcher.commands[0].type).toBe("ConfigurarEstrategiaCommand");
  });

  it("renderiza erro quando a query falha", async () => {
    const { ValidationError } = await import("@/application/errors");
    const dispatcher = createFakeDispatcher({
      configuracoes: () => new ValidationError("VALID_ERROR", "sem usuario"),
    });
    renderWithProviders(<SettingsPage />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("settings-error")).toBeDefined());
  });
});
