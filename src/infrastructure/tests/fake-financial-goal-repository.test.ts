import { describe, it, expect, beforeEach } from "vitest";
import { FakeFinancialGoalRepository } from "@/infrastructure/fakes/fake-financial-goal-repository";
import {
  GoalCategory,
  GoalStatus,
  FinancialGoal,
  FinancialGoalId,
} from "@/core/domain/financial-goal";

describe("FakeFinancialGoalRepository", () => {
  let repo: FakeFinancialGoalRepository;

  beforeEach(() => {
    repo = new FakeFinancialGoalRepository();
  });

  describe("save and findById", () => {
    it("salva e recupera uma meta", async () => {
      const id = FinancialGoalId.create("g1");
      const result = FinancialGoal.create(
        id,
        "Teste",
        50000,
        new Date("2027-12-31"),
        GoalCategory.EDUCATION,
        "corr-1",
      );
      expect(result.isSuccess).toBe(true);
      await repo.save(result.value!);

      const found = await repo.findById("g1");
      expect(found).not.toBeNull();
      expect(found!.name).toBe("Teste");
      expect(found!.targetAmount).toBe(50000);
    });

    it("retorna null para meta inexistente", async () => {
      const found = await repo.findById("nao-existe");
      expect(found).toBeNull();
    });
  });

  describe("findAll", () => {
    it("retorna todas as metas", async () => {
      const g1 = FinancialGoal.create(
        FinancialGoalId.create("g1"),
        "G1",
        1000,
        new Date("2027-01-01"),
        GoalCategory.OTHER,
        "corr-1",
      ).value!;
      const g2 = FinancialGoal.create(
        FinancialGoalId.create("g2"),
        "G2",
        2000,
        new Date("2028-01-01"),
        GoalCategory.TRAVEL,
        "corr-2",
      ).value!;
      await repo.save(g1);
      await repo.save(g2);

      const all = await repo.findAll("p1");
      expect(all).toHaveLength(2);
    });
  });

  describe("findByCategory", () => {
    it("filtra por categoria", async () => {
      const g1 = FinancialGoal.create(
        FinancialGoalId.create("g1"),
        "G1",
        1000,
        new Date("2027-01-01"),
        GoalCategory.EMERGENCY,
        "corr-1",
      ).value!;
      const g2 = FinancialGoal.create(
        FinancialGoalId.create("g2"),
        "G2",
        2000,
        new Date("2028-01-01"),
        GoalCategory.RETIREMENT,
        "corr-2",
      ).value!;
      await repo.save(g1);
      await repo.save(g2);

      const emergencies = await repo.findByCategory("p1", GoalCategory.EMERGENCY);
      expect(emergencies).toHaveLength(1);
      expect(emergencies[0].id.value).toBe("g1");
    });
  });

  describe("findByStatus", () => {
    it("filtra por status", async () => {
      const g1 = FinancialGoal.create(
        FinancialGoalId.create("g1"),
        "G1",
        1000,
        new Date("2027-01-01"),
        GoalCategory.OTHER,
        "corr-1",
      ).value!;
      await repo.save(g1);

      const active = await repo.findByStatus("p1", GoalStatus.ACTIVE);
      expect(active).toHaveLength(1);
    });
  });

  describe("delete", () => {
    it("remove uma meta", async () => {
      const g1 = FinancialGoal.create(
        FinancialGoalId.create("g1"),
        "G1",
        1000,
        new Date("2027-01-01"),
        GoalCategory.OTHER,
        "corr-1",
      ).value!;
      await repo.save(g1);
      await repo.delete("g1");

      const found = await repo.findById("g1");
      expect(found).toBeNull();
    });
  });

  describe("reset", () => {
    it("limpa todas as metas", async () => {
      const g1 = FinancialGoal.create(
        FinancialGoalId.create("g1"),
        "G1",
        1000,
        new Date("2027-01-01"),
        GoalCategory.OTHER,
        "corr-1",
      ).value!;
      await repo.save(g1);
      repo.reset();

      const all = await repo.findAll("p1");
      expect(all).toHaveLength(0);
    });
  });
});
