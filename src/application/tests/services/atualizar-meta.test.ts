import { describe, it, expect } from "vitest";
import { AtualizarMetaService } from "@/application/services/atualizar-meta-service";
import type { AtualizarMetaCommand } from "@/application/commands/atualizar-meta";
import { FakeFinancialGoalRepository } from "@/infrastructure/fakes/fake-financial-goal-repository";
import { GoalCategory, FinancialGoal, FinancialGoalId } from "@/core/domain/financial-goal";
import { ApplicationError, ValidationError, NotFoundError } from "@/application/errors/application-error";

function createRepoWithGoal(): FakeFinancialGoalRepository {
  const repo = new FakeFinancialGoalRepository();
  const id = FinancialGoalId.create("goal-001");
  const result = FinancialGoal.create(id, "Reserva", 100000, new Date("2027-12-31"), GoalCategory.EMERGENCY, "corr-1");
  if (result.isSuccess) repo.save(result.value!);
  return repo;
}

function createCommand(overrides?: Partial<AtualizarMetaCommand>): AtualizarMetaCommand {
  return {
    type: "AtualizarMetaCommand",
    goalId: "goal-001",
    portfolioId: "portfolio-1",
    name: "Reserva Atualizada",
    targetAmount: 150000,
    targetDate: new Date("2028-12-31"),
    category: GoalCategory.EMERGENCY,
    ...overrides,
  };
}

describe("AtualizarMetaService", () => {
  describe("Execute", () => {
    it("atualiza uma meta com sucesso", async () => {
      const repo = createRepoWithGoal();
      const service = new AtualizarMetaService(repo);
      const command = createCommand();

      const result = await service.Execute(command);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/metas").MetaListDto;
      expect(dto.name).toBe("Reserva Atualizada");
      expect(dto.targetAmount).toBe(150000);
    });

    it("retorna NotFoundError quando meta nao existe", async () => {
      const repo = new FakeFinancialGoalRepository();
      const service = new AtualizarMetaService(repo);
      const command = createCommand({ goalId: "nao-existe" });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(NotFoundError);
    });

    it("rejeita command sem goalId", async () => {
      const repo = new FakeFinancialGoalRepository();
      const service = new AtualizarMetaService(repo);
      const command = createCommand({ goalId: "" });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });

    it("permite atualizacao parcial apenas com name", async () => {
      const repo = createRepoWithGoal();
      const service = new AtualizarMetaService(repo);
      const command = createCommand({ name: "SoNome", targetAmount: undefined, targetDate: undefined, category: undefined });

      const result = await service.Execute(command);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/metas").MetaListDto;
      expect(dto.name).toBe("SoNome");
      expect(dto.targetAmount).toBe(100000);
    });
  });
});
