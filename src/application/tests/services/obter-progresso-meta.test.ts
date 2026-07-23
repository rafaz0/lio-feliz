import { describe, it, expect } from "vitest";
import { ObterProgressoMetaService } from "@/application/services/obter-progresso-meta-service";
import type { ObterProgressoMetaQuery } from "@/application/queries/obter-progresso-meta";
import { FakeFinancialGoalRepository } from "@/infrastructure/fakes/fake-financial-goal-repository";
import { GoalCategory, FinancialGoal, FinancialGoalId } from "@/core/domain/financial-goal";
import {
  ApplicationError,
  ValidationError,
  NotFoundError,
} from "@/application/errors/application-error";

function createRepoWithGoal(): FakeFinancialGoalRepository {
  const repo = new FakeFinancialGoalRepository();
  const id = FinancialGoalId.create("goal-001");
  const result = FinancialGoal.create(
    id,
    "Reserva",
    100000,
    new Date("2027-12-31"),
    GoalCategory.EMERGENCY,
    "corr-1",
  );
  if (result.isSuccess) {
    const goal = result.value!;
    const contributed = goal.contribute(5000, new Date("2026-07-01"), "corr-2");
    if (contributed.isSuccess) repo.save(contributed.value!);
  }
  return repo;
}

function createQuery(overrides?: Partial<ObterProgressoMetaQuery>): ObterProgressoMetaQuery {
  return {
    type: "ObterProgressoMetaQuery",
    goalId: "goal-001",
    portfolioId: "portfolio-1",
    ...overrides,
  };
}

describe("ObterProgressoMetaService", () => {
  describe("Execute", () => {
    it("retorna progresso detalhado da meta", async () => {
      const repo = createRepoWithGoal();
      const service = new ObterProgressoMetaService(repo);

      const result = await service.Execute(createQuery());

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/metas").MetaProgressoDetalhadoDto;
      expect(dto.name).toBe("Reserva");
      expect(dto.currentAmount).toBe(5000);
      expect(dto.targetAmount).toBe(100000);
      expect(dto.contributions).toBe(1);
      expect(dto.percentage).toBe(5);
    });

    it("retorna NotFoundError quando meta nao existe", async () => {
      const repo = new FakeFinancialGoalRepository();
      const service = new ObterProgressoMetaService(repo);

      const result = await service.Execute(createQuery({ goalId: "nao-existe" }));

      expect(result).toBeInstanceOf(NotFoundError);
    });

    it("rejeita query sem goalId", async () => {
      const repo = new FakeFinancialGoalRepository();
      const service = new ObterProgressoMetaService(repo);

      const result = await service.Execute(createQuery({ goalId: "" }));

      expect(result).toBeInstanceOf(ValidationError);
    });
  });
});
