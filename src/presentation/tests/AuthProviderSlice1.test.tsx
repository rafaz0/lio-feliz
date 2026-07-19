import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider, useAuthContext } from "@/presentation/providers/AuthProvider";
import { FakeAuthService } from "../features/auth/tests/fake-auth-service";

function AuthBadge() {
  const { isAuthenticated, isLoading } = useAuthContext();
  return (
    <span>
      auth: {isAuthenticated ? "sim" : "não"} / {isLoading ? "carregando" : "pronto"}
    </span>
  );
}

describe("AuthProvider (Slice 1 baseline)", () => {
  it("fornece estado de autenticação padrão (não autenticado) após restore", async () => {
    render(
      <AuthProvider authService={new FakeAuthService()}>
        <AuthBadge />
      </AuthProvider>,
    );
    await waitFor(() => expect(screen.getByText("auth: não / pronto")).toBeDefined());
  });
});
