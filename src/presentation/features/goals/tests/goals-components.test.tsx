import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GoalsLoading } from "../components/GoalsLoading";
import { GoalsEmpty } from "../components/GoalsEmpty";
import { GoalsError } from "../components/GoalsError";
import { GoalProgress } from "../components/GoalProgress";
import { GoalCard } from "../components/GoalCard";
import type { GoalViewModel } from "../types/goals.view-model";

const mockGoal: GoalViewModel = {
  id: "g1",
  name: "Reserva de Emergência",
  targetAmount: "R$ 120.000,00",
  currentAmount: "R$ 50.000,00",
  remainingAmount: "R$ 70.000,00",
  percentage: 41.67,
  targetDate: "01/01/2027",
  category: "EMERGENCY",
  status: "ACTIVE",
};

describe("GoalsLoading", () => {
  it("renderiza com data-testid", () => {
    render(<GoalsLoading />);
    expect(screen.getByTestId("goals-loading")).toBeDefined();
  });
});

describe("GoalsEmpty", () => {
  it("renderiza mensagem", () => {
    render(<GoalsEmpty />);
    expect(screen.getByTestId("goals-empty")).toBeDefined();
  });
});

describe("GoalsError", () => {
  it("renderiza mensagem de erro e botão retry", () => {
    const onRetry = () => {};
    render(<GoalsError message="Erro de teste" onRetry={onRetry} />);
    expect(screen.getByTestId("goals-error")).toBeDefined();
    expect(screen.getByTestId("goals-retry")).toBeDefined();
  });

  it("não renderiza botão retry quando omitido", () => {
    render(<GoalsError message="Erro" />);
    expect(screen.getByTestId("goals-error")).toBeDefined();
    expect(screen.queryByTestId("goals-retry")).toBeNull();
  });
});

describe("GoalProgress", () => {
  it("renderiza com percentage 0", () => {
    render(<GoalProgress percentage={0} />);
    expect(screen.getByTestId("goal-progress")).toBeDefined();
  });

  it("renderiza com percentage 100", () => {
    render(<GoalProgress percentage={100} />);
    expect(screen.getByTestId("goal-progress")).toBeDefined();
  });

  it("renderiza com percentage intermediário", () => {
    render(<GoalProgress percentage={50} />);
    expect(screen.getByTestId("goal-progress")).toBeDefined();
  });

  it("aceita size sm sem label", () => {
    render(<GoalProgress percentage={50} size="sm" showLabel={false} />);
    expect(screen.getByTestId("goal-progress")).toBeDefined();
  });
});

describe("GoalCard", () => {
  it("renderiza informações da meta", () => {
    render(<GoalCard goal={mockGoal} />);
    expect(screen.getByTestId("goal-card-g1")).toBeDefined();
    expect(screen.getByText("Reserva de Emergência")).toBeDefined();
    expect(screen.getByText("Ativa")).toBeDefined();
  });
});
