import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, useTheme } from "@/presentation/providers/ThemeProvider";

function ThemeBadge() {
  const { theme } = useTheme();
  return <span>tema: {theme}</span>;
}

describe("ThemeProvider", () => {
  it("fornece o tema padrão dark", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeBadge />
      </ThemeProvider>,
    );
    expect(screen.getByText("tema: dark")).toBeDefined();
  });

  it("lança erro quando useTheme é usado fora do provider", () => {
    const consoleError = console.error;
    console.error = () => {};
    expect(() => render(<ThemeBadge />)).toThrowError(
      "useTheme deve ser usado dentro de um ThemeProvider",
    );
    console.error = consoleError;
  });
});
