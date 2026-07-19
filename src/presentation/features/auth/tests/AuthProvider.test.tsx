import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider } from "@/presentation/providers/AuthProvider";
import { FakeAuthService } from "./fake-auth-service";

function renderWithAuth(ui: React.ReactNode, service = new FakeAuthService()) {
  return render(<AuthProvider authService={service}>{ui}</AuthProvider>);
}

import { useAuthContext } from "@/presentation/providers/AuthProvider";

function Probe() {
  const { isAuthenticated, user, login, logout, isLoading } = useAuthContext();
  return (
    <div>
      <span>loading: {String(isLoading)}</span>
      <span>auth: {String(isAuthenticated)}</span>
      <span>user: {user?.email ?? "none"}</span>
      <button onClick={() => login({ email: "a@b.com", password: "123" })}>login</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}

describe("AuthProvider", () => {
  it("restaura sessão não autenticada no mount", async () => {
    const service = new FakeAuthService();
    renderWithAuth(<Probe />, service);
    await waitFor(() => expect(screen.getByText("loading: false")).toBeDefined());
    expect(screen.getByText("auth: false")).toBeDefined();
    expect(screen.getByText("user: none")).toBeDefined();
  });

  it("login autentica e define usuário", async () => {
    const service = new FakeAuthService();
    renderWithAuth(<Probe />, service);
    fireEvent.click(screen.getByText("login"));
    await waitFor(() => expect(screen.getByText("auth: true")).toBeDefined());
    expect(screen.getByText("user: a@b.com")).toBeDefined();
    expect(service.signInCalls.length).toBe(1);
  });

  it("logout limpa a sessão", async () => {
    const service = new FakeAuthService();
    renderWithAuth(<Probe />, service);
    fireEvent.click(screen.getByText("login"));
    await waitFor(() => expect(screen.getByText("auth: true")).toBeDefined());
    fireEvent.click(screen.getByText("logout"));
    await waitFor(() => expect(screen.getByText("auth: false")).toBeDefined());
    expect(service.signOutCalls).toBe(1);
  });

  it("lança erro fora do AuthProvider", () => {
    const consoleError = console.error;
    console.error = () => {};
    expect(() => render(<Probe />)).toThrowError(
      "useAuth deve ser usado dentro de um AuthProvider",
    );
    console.error = consoleError;
  });
});
