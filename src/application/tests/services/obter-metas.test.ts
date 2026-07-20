import { describe, it, expect } from "vitest";
import { ObterMetasService } from "@/application/services/obter-metas-service";
import type { ObterMetasQuery } from "@/application/queries/obter-metas";
import { FakeFinancialGoalRepository } from "@/infrastructure/fakes/fake-financial-goal-repository";
import { GoalCategory, GoalStatus, FinancialGoal, FinancialGoalId } from "@/core/domain/financial-goal";
import { ApplicationError, ValidationError } from "@/application/errors/application-error";

function createRepoWithGoals(): FakeFinancialGoalRepository {
  const repo = new FakeFinancialGoalRepository();

  const g1 = FinancialGoal.create(
    FinancialGoalId.create("g1"), "Reserva", 100000, new Date("2027-12-31"), GoalCategory.EMERGENCY, "corr-1",
  );
  const g2 = FinancialGoal.create(
    FinancialGoalId.create("g2"), "Aposentadoria", 1000000, new Date("2040-12-31"), GoalCategory.RETIREMENT, "corr-2",
  );

  if (g1.isSuccess) repo.save(g1.value!);
  if (g2.isSuccess) repo.save(g2.value!);

  return repo;
}

function createQuery(overrides?: Partial<ObterMetasQuery>): ObterMetasQuery {
  return {
    type: "ObterMetasQuery",
    portfolioId: "portfolio-1",
    ...overrides,
  };
}

describe("ObterMetasService", () => {
  describe("Execute", () => {
    it("retorna todas as metas", async () => {
      const repo = createRepoWithGoals();
      const service = new ObterMetasService(repo);

      const result = await service.Execute(createQuery());

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/metas").MetaListDto[];
      expect(dto).toHaveLength(2);
    });

    it("retorna lista vazia quando nao ha metas", async () => {
      const repo = new FakeFinancialGoalRepository();
      const service = new ObterMetasService(repo);

      const result = await service.Execute(createQuery());

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/metas").MetaListDto[];
      expect(dto).toHaveLength(0);
    });

    it("filtra por categoria", async () => {
      const repo = createRepoWithGoals();
      const service = new ObterMetasService(repo);

      const result = await service.Execute(createQuery({ category: GoalCategory.EMERGENCY }));

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/metas").MetaListDto[];
      expect(dto).toHaveLength(1);
      expect(dto[0].category).toBe(GoalCategory.EMERGENCY);
    });

    it("filtra por status", async () => {
      const repo = createRepoWithGoals();
      const service = new ObterMetasService(repo);

      const result = await service.Execute(createQuery({ status: GoalStatus.ACTIVE }));

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/metas").MetaListDto[];
      expect(dto).toHaveLength(2);
    });

    it("rejeita query sem portfolioId", async () => {
      const repo = new FakeFinancialGoalRepository();
      const service = new ObterMetasService(repo);

      const result = await service.Execute(createQuery({ portfolioId: "" }));

      expect(result).toBeInstanceOf(ValidationError);
    });
  });
});
