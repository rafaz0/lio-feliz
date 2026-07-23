import { describe, it, expect } from "vitest";
import type { MetaListDto } from "@/application/dtos/metas";
import {
  toGoalViewModel,
  toGoalViewModels,
  toGoalsSummaryViewModel,
  filterGoals,
  statusToLabel,
  categoryToLabel,
} from "../types/goals.view-model";

const dto: MetaListDto = {
  id: "g1",
  name: "Reserva de Emergência",
  targetAmount: 120000,
  currentAmount: 50000,
  percentage: 41.67,
  targetDate: new Date("2027-01-01"),
  category: "EMERGENCY",
  status: "ACTIVE",
};

describe("goals view-model", () => {
  describe("toGoalViewModel", () => {
    it("mapeia id e name", () => {
      const vm = toGoalViewModel(dto);
      expect(vm.id).toBe("g1");
      expect(vm.name).toBe("Reserva de Emergência");
    });

    it("formata valores monetários", () => {
      const vm = toGoalViewModel(dto);
      expect(vm.targetAmount).toContain("R$");
      expect(vm.currentAmount).toContain("R$");
      expect(vm.remainingAmount).toContain("R$");
    });

    it("mapeia percentage numérico", () => {
      const vm = toGoalViewModel(dto);
      expect(vm.percentage).toBe(41.67);
    });

    it("formata data", () => {
      const vm = toGoalViewModel(dto);
      expect(vm.targetDate).toBe("01/01/2027");
    });

    it("mapeia categoria e status", () => {
      const vm = toGoalViewModel(dto);
      expect(vm.category).toBe("EMERGENCY");
      expect(vm.status).toBe("ACTIVE");
    });
  });

  describe("toGoalViewModels", () => {
    it("mapeia lista de DTOs", () => {
      const vms = toGoalViewModels([dto]);
      expect(vms).toHaveLength(1);
      expect(vms[0].id).toBe("g1");
    });

    it("retorna array vazio para lista vazia", () => {
      expect(toGoalViewModels([])).toHaveLength(0);
    });
  });

  describe("toGoalsSummaryViewModel", () => {
    it("calcula total, ativas e concluídas", () => {
      const goals = toGoalViewModels([
        dto,
        { ...dto, id: "g2", status: "COMPLETED", percentage: 100 },
        { ...dto, id: "g3", status: "ACTIVE" },
      ]);
      const summary = toGoalsSummaryViewModel(goals);
      expect(summary.total).toBe(3);
      expect(summary.active).toBe(2);
      expect(summary.completed).toBe(1);
    });

    it("calcula overallPercentage", () => {
      const goals = toGoalViewModels([
        { ...dto, currentAmount: 25000, targetAmount: 100000 },
        { ...dto, id: "g2", currentAmount: 75000, targetAmount: 100000 },
      ]);
      const summary = toGoalsSummaryViewModel(goals);
      expect(summary.overallPercentage).toBe(50);
    });
  });

  describe("filterGoals", () => {
    const goals = toGoalViewModels([
      { ...dto, id: "g1", name: "Emergência", status: "ACTIVE", category: "EMERGENCY" },
      { ...dto, id: "g2", name: "Viagem", status: "ACTIVE", category: "TRAVEL" },
      { ...dto, id: "g3", name: "Aposentadoria", status: "PAUSED", category: "RETIREMENT" },
    ]);

    it("filtra por termo", () => {
      expect(
        filterGoals(goals, { termo: "viagem", status: "TODOS", category: "TODAS" }),
      ).toHaveLength(1);
    });

    it("filtra por status", () => {
      expect(filterGoals(goals, { termo: "", status: "ACTIVE", category: "TODAS" })).toHaveLength(
        2,
      );
    });

    it("filtra por categoria", () => {
      expect(
        filterGoals(goals, { termo: "", status: "TODOS", category: "EMERGENCY" }),
      ).toHaveLength(1);
    });

    it("retorna todos sem filtros", () => {
      expect(filterGoals(goals, { termo: "", status: "TODOS", category: "TODAS" })).toHaveLength(3);
    });
  });

  describe("statusToLabel", () => {
    it("traduz status", () => {
      expect(statusToLabel("ACTIVE")).toBe("Ativa");
      expect(statusToLabel("PAUSED")).toBe("Pausada");
      expect(statusToLabel("COMPLETED")).toBe("Concluída");
      expect(statusToLabel("CANCELLED")).toBe("Cancelada");
    });

    it("retorna o próprio valor para desconhecido", () => {
      expect(statusToLabel("UNKNOWN")).toBe("UNKNOWN");
    });
  });

  describe("categoryToLabel", () => {
    it("traduz categorias", () => {
      expect(categoryToLabel("EMERGENCY")).toBe("Emergência");
      expect(categoryToLabel("RETIREMENT")).toBe("Aposentadoria");
      expect(categoryToLabel("EDUCATION")).toBe("Educação");
    });
  });
});
