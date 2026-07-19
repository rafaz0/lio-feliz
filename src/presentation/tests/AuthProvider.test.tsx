import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/presentation/providers/AuthProvider";

function AuthBadge() {
  const { isAuthenticated, isLoading } = useAuth();
  return (
    <span>
      auth: {isAuthenticated ? "sim" : "não"} / {isLoading ? "carregando" : "pronto"}
    </span>
  );
}

describe("AuthProvider", () => {
  it("fornece estado de autenticação padrão", () => {
    render(
      <AuthProvider>
        <AuthBadge />
      </AuthProvider>,
    );
    expect(screen.getByText("auth: não / pronto")).toBeDefined();
  });
});
