import { describe, it, expect } from "vitest";
import { waitFor, screen, fireEvent } from "@testing-library/react";
import { GoalsPage } from "../components/GoalsPage";
import { createFakeDispatcher, renderWithGoalsProviders } from "./test-utils";

describe("GoalsPage flow", () => {
  it("renderiza loading inicialmente e depois as metas", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithGoalsProviders(<GoalsPage portfolioId="p1" />, dispatcher);

    expect(screen.getByTestId("goals-loading")).toBeDefined();

    await waitFor(() => expect(screen.getByTestId("goals-page")).toBeDefined());
  });

  it("renderiza erro quando a query falha", async () => {
    const { ValidationError } = await import("@/application/errors");
    const dispatcher = createFakeDispatcher({
      metas: () => new ValidationError("VALID_ERROR", "erro de teste"),
    });
    renderWithGoalsProviders(<GoalsPage portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("goals-error")).toBeDefined());
    expect(screen.getByTestId("goals-retry")).toBeDefined();
  });

  it("renderiza tabela com metas após carregamento", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithGoalsProviders(<GoalsPage portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("goals-page")).toBeDefined());
    await waitFor(() => expect(screen.getByTestId("goals-summary")).toBeDefined());
    await waitFor(() => expect(screen.getByTestId("goals-filters")).toBeDefined());
  });

  it("alterna formulário ao clicar em Nova meta", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithGoalsProviders(<GoalsPage portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("goals-page")).toBeDefined());

    screen.getByTestId("goals-toggle-form").click();
    await waitFor(() => expect(screen.getByTestId("goal-form")).toBeDefined());

    screen.getByTestId("goals-toggle-form").click();
    await waitFor(() => expect(screen.queryByTestId("goal-form")).toBeNull());
  });

  it("abre formulário, submete e fecha após criar", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithGoalsProviders(<GoalsPage portfolioId="p1" />, dispatcher);

    await waitFor(() => expect(screen.getByTestId("goals-page")).toBeDefined());

    screen.getByTestId("goals-toggle-form").click();
    await waitFor(() => expect(screen.getByTestId("goal-form")).toBeDefined());

    const nameInput = screen.getByTestId("goal-form-name");
    const targetInput = screen.getByTestId("goal-form-target");
    const dateInput = screen.getByTestId("goal-form-date");
    const submitBtn = screen.getByTestId("goal-form-submit");

    fireEvent.change(nameInput, { target: { value: "Nova Meta Teste" } });
    fireEvent.change(targetInput, { target: { value: "10000" } });
    fireEvent.change(dateInput, { target: { value: "2028-01-01" } });

    submitBtn.click();

    await waitFor(() => {
      expect(dispatcher.commands.length).toBe(1);
      expect((dispatcher.commands[0] as any).type).toBe("CriarMetaCommand");
    });
  });
});
