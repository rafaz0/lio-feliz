import { describe, it, expect } from "vitest";
import { RegistrarContribuicaoService } from "@/application/services/registrar-contribuicao-service";
import type { RegistrarContribuicaoCommand } from "@/application/commands/registrar-contribuicao";
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

function createCommand(overrides?: Partial<RegistrarContribuicaoCommand>): RegistrarContribuicaoCommand {
  return {
    type: "RegistrarContribuicaoCommand",
    goalId: "goal-001",
    portfolioId: "portfolio-1",
    amount: 5000,
    date: new Date("2026-07-01"),
    ...overrides,
  };
}

describe("RegistrarContribuicaoService", () => {
  describe("Execute", () => {
    it("registra contribuicao com sucesso", async () => {
      const repo = createRepoWithGoal();
      const service = new RegistrarContribuicaoService(repo);
      const command = createCommand();

      const result = await service.Execute(command);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/metas").MetaProgressoDetalhadoDto;
      expect(dto.name).toBe("Reserva");
      expect(dto.contributions).toBe(1);
      expect(dto.currentAmount).toBe(5000);
    });

    it("retorna NotFoundError quando meta nao existe", async () => {
      const repo = new FakeFinancialGoalRepository();
      const service = new RegistrarContribuicaoService(repo);
      const command = createCommand({ goalId: "nao-existe" });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(NotFoundError);
    });

    it("rejeita amount zero", async () => {
      const repo = createRepoWithGoal();
      const service = new RegistrarContribuicaoService(repo);
      const command = createCommand({ amount: 0 });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });

    it("rejeita command sem goalId", async () => {
      const repo = new FakeFinancialGoalRepository();
      const service = new RegistrarContribuicaoService(repo);
      const command = createCommand({ goalId: "" });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });

    it("acumula multiplas contribuicoes", async () => {
      const repo = createRepoWithGoal();
      const service = new RegistrarContribuicaoService(repo);

      await service.Execute(createCommand({ amount: 3000 }));
      const result = await service.Execute(createCommand({ amount: 2000 }));

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/metas").MetaProgressoDetalhadoDto;
      expect(dto.contributions).toBe(2);
      expect(dto.currentAmount).toBe(5000);
    });
  });
});
