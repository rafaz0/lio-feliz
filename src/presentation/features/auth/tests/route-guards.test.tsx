import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider } from "@/presentation/providers/AuthProvider";
import { FakeAuthService } from "./fake-auth-service";
import { AuthenticatedRoute, GuestRoute } from "../components/RouteGuards";

function wrap(ui: React.ReactNode, service = new FakeAuthService()) {
  return render(<AuthProvider authService={service}>{ui}</AuthProvider>);
}

describe("RouteGuards", () => {
  it("GuestRoute renderiza filhos quando não autenticado", async () => {
    wrap(<GuestRoute>{<span>area de convidado</span>}</GuestRoute>);
    await waitFor(() => expect(screen.getByText("area de convidado")).toBeDefined());
  });

  it("GuestRoute bloqueia filhos quando autenticado", async () => {
    const service = new FakeAuthService();
    service.session = {
      user: { id: "1", email: "a@b.com", displayName: "A", avatarUrl: null },
      expiresAt: 1,
      isAuthenticated: true,
    };
    wrap(<GuestRoute>{<span>area de convidado</span>}</GuestRoute>, service);
    await waitFor(() => expect(screen.queryByText("area de convidado")).toBeNull());
  });

  it("AuthenticatedRoute renderiza filhos quando autenticado", async () => {
    const service = new FakeAuthService();
    service.session = {
      user: { id: "1", email: "a@b.com", displayName: "A", avatarUrl: null },
      expiresAt: 1,
      isAuthenticated: true,
    };
    wrap(<AuthenticatedRoute>{<span>area protegida</span>}</AuthenticatedRoute>, service);
    await waitFor(() => expect(screen.getByText("area protegida")).toBeDefined());
  });

  it("AuthenticatedRoute bloqueia filhos quando não autenticado", async () => {
    wrap(<AuthenticatedRoute>{<span>area protegida</span>}</AuthenticatedRoute>);
    await waitFor(() => expect(screen.queryByText("area protegida")).toBeNull());
  });
});
