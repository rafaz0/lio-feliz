import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "@/presentation/providers/AuthProvider";
import { FakeAuthService } from "./fake-auth-service";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { UserMenu } from "../components/UserMenu";

const qc = new QueryClient();

function wrap(ui: React.ReactNode, service = new FakeAuthService()) {
  return render(
    <QueryClientProvider client={qc}>
      <AuthProvider authService={service}>{ui}</AuthProvider>
    </QueryClientProvider>,
  );
}

describe("LoginForm", () => {
  it("renderiza campos com labels e acessibilidade", () => {
    wrap(<LoginForm />);
    expect(screen.getByLabelText("E-mail")).toBeDefined();
    expect(screen.getByLabelText("Senha")).toBeDefined();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeDefined();
  });

  it("faz login com credenciais válidas", async () => {
    const service = new FakeAuthService();
    wrap(<LoginForm />, service);
    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "a@b.com" } });
    fireEvent.change(screen.getByLabelText("Senha"), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));
    await waitFor(() => expect(service.signInCalls.length).toBe(1));
  });

  it("exibe erro em credenciais inválidas", async () => {
    const service = new FakeAuthService();
    wrap(<LoginForm />, service);
    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "fail@test.com" } });
    fireEvent.change(screen.getByLabelText("Senha"), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));
    await waitFor(() => expect(screen.getByRole("alert")).toBeDefined());
  });
});

describe("RegisterForm", () => {
  it("cadastra novo usuário", async () => {
    const service = new FakeAuthService();
    wrap(<RegisterForm />, service);
    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "novo@x.com" } });
    fireEvent.change(screen.getByLabelText("Senha"), { target: { value: "123456" } });
    fireEvent.click(screen.getByRole("button", { name: "Criar conta" }));
    await waitFor(() => expect(service.signUpCalls.length).toBe(1));
  });
});

describe("ForgotPasswordForm", () => {
  it("envia recuperação e mostra status", async () => {
    const service = new FakeAuthService();
    wrap(<ForgotPasswordForm />, service);
    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "a@b.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar link de recuperação" }));
    await waitFor(() => expect(screen.getByRole("status")).toBeDefined());
    expect(service.recoveryCalls.length).toBe(1);
  });
});

describe("UserMenu", () => {
  it("renderiza menu quando autenticado e faz logout", async () => {
    const service = new FakeAuthService();
    service.session = {
      user: { id: "1", email: "u@x.com", displayName: "Usuario", avatarUrl: null },
      expiresAt: 1,
      isAuthenticated: true,
    };
    wrap(<UserMenu />, service);
    await waitFor(() => expect(screen.getByText("Usuario")).toBeDefined());
    fireEvent.click(screen.getByRole("menuitem", { name: "Sair" }));
    await waitFor(() => expect(service.signOutCalls).toBe(1));
  });

  it("não renderiza quando não autenticado", async () => {
    wrap(<UserMenu />);
    await waitFor(() => expect(screen.queryByText("Usuario")).toBeNull());
  });
});
