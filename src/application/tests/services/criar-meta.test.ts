import { describe, it, expect } from "vitest";
import { CriarMetaService } from "@/application/services/criar-meta-service";
import type { CriarMetaCommand } from "@/application/commands/criar-meta";
import { FakeFinancialGoalRepository } from "@/infrastructure/fakes/fake-financial-goal-repository";
import { GoalCategory } from "@/core/domain/financial-goal";
import { ApplicationError, ValidationError } from "@/application/errors/application-error";

function createService() {
  return { service: new CriarMetaService(new FakeFinancialGoalRepository()), repo: new FakeFinancialGoalRepository() };
}

function createCommand(overrides?: Partial<CriarMetaCommand>): CriarMetaCommand {
  return {
    type: "CriarMetaCommand",
    portfolioId: "portfolio-1",
    name: "Reserva de Emergencia",
    targetAmount: 100000,
    targetDate: new Date("2027-12-31"),
    category: GoalCategory.EMERGENCY,
    ...overrides,
  };
}

describe("CriarMetaService", () => {
  describe("Execute", () => {
    it("cria uma meta com sucesso e retorna MetaListDto", async () => {
      const { service } = createService();
      const command = createCommand();

      const result = await service.Execute(command);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/metas").MetaListDto;
      expect(dto.name).toBe("Reserva de Emergencia");
      expect(dto.targetAmount).toBe(100000);
      expect(dto.currentAmount).toBe(0);
      expect(dto.percentage).toBe(0);
      expect(dto.category).toBe(GoalCategory.EMERGENCY);
      expect(dto.status).toBe("ACTIVE");
    });

    it("rejeita command sem nome", async () => {
      const { service } = createService();
      const command = createCommand({ name: "" });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });

    it("rejeita command com targetAmount zero", async () => {
      const { service } = createService();
      const command = createCommand({ targetAmount: 0 });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });

    it("rejeita command sem portfolioId", async () => {
      const { service } = createService();
      const command = createCommand({ portfolioId: "" });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });

    it("salva a meta no repositorio", async () => {
      const repo = new FakeFinancialGoalRepository();
      const service = new CriarMetaService(repo);
      const command = createCommand();

      await service.Execute(command);

      const goals = await repo.findAll("portfolio-1");
      expect(goals).toHaveLength(1);
      expect(goals[0].name).toBe("Reserva de Emergencia");
    });
  });
});
