import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { UserPreferencesCard } from "../components/UserPreferencesCard";
import { StrategySettings } from "../components/StrategySettings";
import { GoalsSettings } from "../components/GoalsSettings";
import { NotificationSettings } from "../components/NotificationSettings";
import { ThemeSettings } from "../components/ThemeSettings";
import { AccountSettings } from "../components/AccountSettings";
import { SettingsLoading } from "../components/SettingsLoading";
import { SettingsEmpty } from "../components/SettingsEmpty";
import { SettingsError } from "../components/SettingsError";
import { toSettingsViewModel } from "../types/settings.view-model";
import { renderWithProviders, createFakeDispatcher } from "./test-utils";
import type { ConfiguracoesDto } from "@/application/dtos";

const configuracoes: ConfiguracoesDto = {
  usuarioId: "u1",
  estrategia: {
    usuarioId: "u1",
    percentuais: { ACOES: 50, RENDA_FIXA: 50 },
    moeda: "BRL",
    toleranciaRebalanceamento: 5,
    dataAtualizacao: new Date("2026-01-01"),
  },
  metas: [
    {
      nome: "Reserva",
      valorAlvo: 10000,
      valorAtual: 0,
      percentualConcluido: 0,
      prazo: new Date("2026-12-31"),
    },
  ],
};

const settings = toSettingsViewModel(configuracoes);

describe("settings components", () => {
  it("UserPreferencesCard exibe dados", () => {
    render(<UserPreferencesCard settings={settings} />);
    expect(screen.getByTestId("user-preferences-card")).toBeDefined();
    expect(screen.getByTestId("pref-usuario").textContent).toBe("u1");
  });

  it("StrategySettings expõe formulário", () => {
    render(<StrategySettings estrategia={settings.estrategia} onSave={() => {}} />);
    expect(screen.getByTestId("strategy-settings")).toBeDefined();
    expect(screen.getByTestId("strategy-moeda")).toBeDefined();
    expect(screen.getByTestId("strategy-save")).toBeDefined();
  });

  it("GoalsSettings lista metas", () => {
    render(<GoalsSettings goals={{ metas: settings.metas }} />);
    expect(screen.getByTestId("goals-settings")).toBeDefined();
    expect(screen.getAllByTestId("goal-row").length).toBe(1);
  });

  it("NotificationSettings expõe controles", () => {
    render(<NotificationSettings notificacoes={settings.notificacoes} onChange={() => {}} />);
    expect(screen.getByTestId("notification-settings")).toBeDefined();
    expect(screen.getByTestId("notif-proventos")).toBeDefined();
    expect(screen.getByTestId("notif-canal")).toBeDefined();
  });

  it("ThemeSettings expõe toggle", () => {
    renderWithProviders(<ThemeSettings />, createFakeDispatcher());
    expect(screen.getByTestId("theme-settings")).toBeDefined();
    expect(screen.getByTestId("theme-toggle")).toBeDefined();
  });

  it("AccountSettings exibe e-mail", async () => {
    renderWithProviders(<AccountSettings />, createFakeDispatcher());
    expect(screen.getByTestId("account-settings")).toBeDefined();
    await waitFor(() =>
      expect(screen.getByTestId("account-email").textContent).toBe("user@exemplo.com"),
    );
  });

  it("SettingsLoading exibe skeletons", () => {
    render(<SettingsLoading />);
    expect(screen.getByTestId("settings-loading")).toBeDefined();
  });

  it("SettingsEmpty renderiza estado vazio", () => {
    render(<SettingsEmpty />);
    expect(screen.getByTestId("settings-empty")).toBeDefined();
  });

  it("SettingsError expõe retry acessível", () => {
    render(<SettingsError message="falhou" onRetry={() => {}} />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByTestId("settings-retry")).toBeDefined();
  });
});
