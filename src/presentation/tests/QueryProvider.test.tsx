import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryProvider } from "@/presentation/providers/QueryProvider";

describe("QueryProvider", () => {
  it("renderiza filhos dentro do QueryClientProvider", () => {
    render(
      <QueryProvider>
        <div>Conteúdo de teste</div>
      </QueryProvider>,
    );
    expect(screen.getByText("Conteúdo de teste")).toBeDefined();
  });
});
