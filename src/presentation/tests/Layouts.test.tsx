import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppLayout } from "@/presentation/shared/components/layout/AppLayout";

describe("AppLayout", () => {
  it("renderiza filhos no conteúdo principal", () => {
    render(
      <AppLayout>
        <div>Conteúdo principal</div>
      </AppLayout>,
    );
    expect(screen.getByText("Conteúdo principal")).toBeDefined();
  });

  it("renderiza sidebar e header quando fornecidos", () => {
    render(
      <AppLayout sidebar={<nav>Menu</nav>} header={<header>Topo</header>}>
        <div>Corpo</div>
      </AppLayout>,
    );
    expect(screen.getByText("Menu")).toBeDefined();
    expect(screen.getByText("Topo")).toBeDefined();
    expect(screen.getByText("Corpo")).toBeDefined();
  });
});

import { AuthLayout } from "@/presentation/shared/components/layout/AuthLayout";

describe("AuthLayout", () => {
  it("renderiza título, descrição e filhos", () => {
    render(
      <AuthLayout title="Entrar" description="Acesse sua conta">
        <form>Formulário</form>
      </AuthLayout>,
    );
    expect(screen.getByText("Entrar")).toBeDefined();
    expect(screen.getByText("Acesse sua conta")).toBeDefined();
    expect(screen.getByText("Formulário")).toBeDefined();
  });
});
