import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "@/presentation/providers/AuthProvider";
import { FakeAuthService } from "./fake-auth-service";
import { useAuth } from "../hooks/use-auth";
import { useLoginMutation } from "../hooks/use-login-mutation";
import { useLogoutMutation } from "../hooks/use-logout-mutation";
import { useCurrentUserQuery } from "../hooks/use-current-user-query";
import { toUserViewModel, toSessionViewModel } from "../types/auth.view-model";
import type { AuthSession } from "@/presentation/shared/types/auth";

const qc = new QueryClient();

function wrap(ui: React.ReactNode, service = new FakeAuthService()) {
  return render(
    <QueryClientProvider client={qc}>
      <AuthProvider authService={service}>{ui}</AuthProvider>
    </QueryClientProvider>,
  );
}

function LoginProbe() {
  const login = useLoginMutation();
  return (
    <button onClick={() => login.mutate({ email: "x@y.com", password: "1" })}>do-login</button>
  );
}

function LogoutProbe() {
  const logout = useLogoutMutation();
  return <button onClick={() => logout.mutate()}>do-logout</button>;
}

function UserProbe() {
  const { data } = useCurrentUserQuery();
  return <span>email: {data?.email ?? "null"}</span>;
}

describe("auth hooks", () => {
  it("useLoginMutation autentica via context", async () => {
    const service = new FakeAuthService();
    wrap(<LoginProbe />, service);
    fireEvent.click(screen.getByText("do-login"));
    await waitFor(() => expect(service.signInCalls.length).toBe(1));
  });

  it("useLogoutMutation desconecta", async () => {
    const service = new FakeAuthService();
    wrap(<LogoutProbe />, service);
    fireEvent.click(screen.getByText("do-logout"));
    await waitFor(() => expect(service.signOutCalls).toBe(1));
  });

  it("useCurrentUserQuery retorna usuário quando autenticado", async () => {
    const service = new FakeAuthService();
    service.session = {
      user: { id: "u1", email: "u1@x.com", displayName: "U", avatarUrl: null },
      expiresAt: 1,
      isAuthenticated: true,
    };
    wrap(<UserProbe />, service);
    await waitFor(() => expect(screen.getByText("email: u1@x.com")).toBeDefined());
  });
});

describe("auth view models", () => {
  it("toUserViewModel mapeia nulo", () => {
    expect(toUserViewModel(null)).toBeNull();
  });

  it("toUserViewModel gera iniciais", () => {
    const vm = toUserViewModel({
      id: "1",
      email: "joao@x.com",
      displayName: "João Silva",
      avatarUrl: null,
    });
    expect(vm?.initials).toBe("JS");
  });

  it("toSessionViewModel reflete estado", () => {
    const session: AuthSession = {
      user: { id: "1", email: "a@b.com", displayName: "A", avatarUrl: null },
      expiresAt: 100,
      isAuthenticated: true,
    };
    const vm = toSessionViewModel(session, false);
    expect(vm.isAuthenticated).toBe(true);
    expect(vm.user?.displayName).toBe("A");
  });
});
