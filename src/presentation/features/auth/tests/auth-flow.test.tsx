import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "@/presentation/providers/AuthProvider";
import { FakeAuthService } from "./fake-auth-service";
import { LoginForm } from "../components/LoginForm";
import { UserMenu } from "../components/UserMenu";
import { AuthenticatedRoute, GuestRoute } from "../components/RouteGuards";

const qc = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={qc}>
      <AuthProvider authService={new FakeAuthService()}>
        <GuestRoute>
          <LoginForm />
        </GuestRoute>
        <AuthenticatedRoute>
          <UserMenu />
        </AuthenticatedRoute>
      </AuthProvider>
    </QueryClientProvider>
  );
}

describe("Fluxo de autenticação (integração)", () => {
  it("Login -> Sessão -> Guard libera UserMenu e oculta Login", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByLabelText("E-mail")).toBeDefined());
    expect(screen.queryByText("Teste")).toBeNull();

    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "a@b.com" } });
    fireEvent.change(screen.getByLabelText("Senha"), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => expect(screen.getByText("Teste")).toBeDefined());
    expect(screen.queryByLabelText("E-mail")).toBeNull();
  });

  it("Logout -> GuestRoute libera Login novamente", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByLabelText("E-mail")).toBeDefined());
    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "a@b.com" } });
    fireEvent.change(screen.getByLabelText("Senha"), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => expect(screen.getByText("Teste")).toBeDefined());
    fireEvent.click(screen.getByRole("menuitem", { name: "Sair" }));

    await waitFor(() => expect(screen.getByLabelText("E-mail")).toBeDefined());
    expect(screen.queryByText("Teste")).toBeNull();
  });
});
