import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonLoading } from "../components/ComparisonLoading";
import { ComparisonEmpty } from "../components/ComparisonEmpty";
import { ComparisonError } from "../components/ComparisonError";

describe("ComparisonLoading", () => {
  it("renderiza com data-testid", () => {
    render(<ComparisonLoading />);
    expect(screen.getByTestId("comparison-loading")).toBeDefined();
  });
});

describe("ComparisonEmpty", () => {
  it("renderiza mensagem", () => {
    render(<ComparisonEmpty />);
    expect(screen.getByTestId("comparison-empty")).toBeDefined();
  });
});

describe("ComparisonError", () => {
  it("renderiza mensagem de erro e botao retry", () => {
    const onRetry = () => {};
    render(<ComparisonError message="Erro" onRetry={onRetry} />);
    expect(screen.getByTestId("comparison-error")).toBeDefined();
    expect(screen.getByTestId("comparison-retry")).toBeDefined();
  });

  it("nao renderiza botao retry quando omitido", () => {
    render(<ComparisonError message="Erro" />);
    expect(screen.getByTestId("comparison-error")).toBeDefined();
    expect(screen.queryByTestId("comparison-retry")).toBeNull();
  });
});
