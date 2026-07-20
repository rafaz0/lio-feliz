import { describe, it, expect } from "vitest";
import { waitFor, screen } from "@testing-library/react";
import { useGoalsQuery } from "../hooks/use-goals-query";
import { useCreateGoalMutation } from "../hooks/use-create-goal-mutation";
import { useUpdateGoalMutation } from "../hooks/use-update-goal-mutation";
import { createFakeDispatcher, renderWithGoalsProviders } from "./test-utils";

function GoalsProbe({ portfolioId }: { portfolioId: string }) {
  const { goals, summary, isLoading, isError } = useGoalsQuery(portfolioId);
  return (
    <div>
      <span data-testid="goals-loading">{String(isLoading)}</span>
      <span data-testid="goals-error">{String(isError)}</span>
      <span data-testid="goals-count">{goals.length}</span>
      <span data-testid="goals-summary-total">{summary.total}</span>
      <span data-testid="goals-summary-active">{summary.active}</span>
    </div>
  );
}

function CreateProbe({ portfolioId }: { portfolioId: string }) {
  const { mutate, isPending, isSuccess, data } = useCreateGoalMutation();
  return (
    <div>
      <span data-testid="create-pending">{String(isPending)}</span>
      <span data-testid="create-success">{String(isSuccess)}</span>
      <span data-testid="create-data">{data?.name ?? ""}</span>
      <button
        data-testid="create-trigger"
        onClick={() =>
          mutate({
            portfolioId,
            name: "Nova Meta",
            targetAmount: 50000,
            targetDate: new Date("2028-06-01"),
            category: "EDUCATION",
          })
        }
      >
        Criar
      </button>
    </div>
  );
}

function UpdateProbe() {
  const { mutate, isPending, isSuccess, data } = useUpdateGoalMutation();
  return (
    <div>
      <span data-testid="update-pending">{String(isPending)}</span>
      <span data-testid="update-success">{String(isSuccess)}</span>
      <span data-testid="update-data">{data?.name ?? ""}</span>
      <button
        data-testid="update-trigger"
        onClick={() =>
          mutate({
            goalId: "g1",
            portfolioId: "p1",
            name: "Meta Atualizada",
          })
        }
      >
        Atualizar
      </button>
    </div>
  );
}

describe("goals hooks", () => {
  describe("useGoalsQuery", () => {
    it("dispatcha ObterMetasQuery e retorna metas", async () => {
      const dispatcher = createFakeDispatcher();
      renderWithGoalsProviders(<GoalsProbe portfolioId="p1" />, dispatcher);

      await waitFor(() => expect(dispatcher.queries.length).toBe(1));
      expect((dispatcher.queries[0] as any).type).toBe("ObterMetasQuery");
      expect((dispatcher.queries[0] as any).portfolioId).toBe("p1");

      await waitFor(() => expect(screen.getByTestId("goals-count").textContent).toBe("3"));
      expect(screen.getByTestId("goals-summary-total").textContent).toBe("3");
    });

    it("propaga erro", async () => {
      const { ValidationError } = await import("@/application/errors");
      const dispatcher = createFakeDispatcher({
        metas: () => new ValidationError("VALID_ERROR", "erro"),
      });
      renderWithGoalsProviders(<GoalsProbe portfolioId="p1" />, dispatcher);

      await waitFor(() => expect(screen.getByTestId("goals-error").textContent).toBe("true"));
    });
  });

  describe("useCreateGoalMutation", () => {
    it("dispatcha CriarMetaCommand e retorna meta criada", async () => {
      const dispatcher = createFakeDispatcher();
      renderWithGoalsProviders(<CreateProbe portfolioId="p1" />, dispatcher);

      screen.getByTestId("create-trigger").click();

      await waitFor(() => expect(dispatcher.commands.length).toBe(1));
      expect((dispatcher.commands[0] as any).type).toBe("CriarMetaCommand");
      await waitFor(() =>
        expect(screen.getByTestId("create-data").textContent).toBe("Nova Meta"),
      );
    });
  });

  describe("useUpdateGoalMutation", () => {
    it("dispatcha AtualizarMetaCommand", async () => {
      const dispatcher = createFakeDispatcher();
      renderWithGoalsProviders(<UpdateProbe />, dispatcher);

      screen.getByTestId("update-trigger").click();

      await waitFor(() => expect(dispatcher.commands.length).toBe(1));
      expect((dispatcher.commands[0] as any).type).toBe("AtualizarMetaCommand");
    });
  });
});
