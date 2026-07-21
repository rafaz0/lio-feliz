import { describe, it, expect } from "vitest";
import type { RendaFixaDto, CronogramaPagamentosDto } from "@/application/dtos/renda-fixa";
import {
  toRendaFixaViewModel,
  toRendaFixaViewModels,
  toCronogramaViewModel,
  productTypeToLabel,
} from "../types/fixed-income.view-model";

const rendaFixaDto: RendaFixaDto = {
  id: "rf-001",
  ticker: "CDB-XPTO",
  name: "CDB Banco X 120% CDI",
  institution: "Banco X",
  productType: "CDB",
  nominalValue: 1000,
  rate: 12.0,
  rateType: "POS",
  issueDate: new Date("2024-01-01"),
  maturityDate: new Date("2025-01-01"),
  projectedValue: 1120,
  totalReturnPercent: 12.0,
  totalJuros: 120,
  totalAmortizacao: 1000,
};

const cronogramaDto: CronogramaPagamentosDto = {
  items: [
    {
      assetId: "rf-001",
      ticker: "CDB-XPTO",
      date: new Date("2025-01-01"),
      tipo: "JUROS",
      valor: 120,
    },
    {
      assetId: "rf-001",
      ticker: "CDB-XPTO",
      date: new Date("2025-01-01"),
      tipo: "AMORTIZACAO",
      valor: 1000,
    },
  ],
  totalJuros: 120,
  totalAmortizacao: 1000,
};

describe("fixed-income view-model", () => {
  describe("toRendaFixaViewModel", () => {
    it("mapeia id e ticker", () => {
      const vm = toRendaFixaViewModel(rendaFixaDto);
      expect(vm.id).toBe("rf-001");
      expect(vm.ticker).toBe("CDB-XPTO");
    });

    it("formata valores monetários", () => {
      const vm = toRendaFixaViewModel(rendaFixaDto);
      expect(vm.nominalValue).toContain("R$");
      expect(vm.projectedValue).toContain("R$");
      expect(vm.totalJuros).toContain("R$");
      expect(vm.totalAmortizacao).toContain("R$");
    });

    it("formata taxa como porcentagem", () => {
      const vm = toRendaFixaViewModel(rendaFixaDto);
      expect(vm.rate).toBe("12.00%");
    });

    it("mapeia productTypeLabel", () => {
      const vm = toRendaFixaViewModel(rendaFixaDto);
      expect(vm.productTypeLabel).toBe("CDB");
    });

    it("formata datas", () => {
      const vm = toRendaFixaViewModel(rendaFixaDto);
      expect(vm.issueDate).toContain("/");
      expect(vm.maturityDate).toContain("/");
    });

    it("mapeia totalReturnPercent numérico", () => {
      const vm = toRendaFixaViewModel(rendaFixaDto);
      expect(vm.totalReturnPercent).toBe(12.0);
    });
  });

  describe("toRendaFixaViewModels", () => {
    it("mapeia lista de DTOs", () => {
      const vms = toRendaFixaViewModels([rendaFixaDto]);
      expect(vms).toHaveLength(1);
      expect(vms[0].id).toBe("rf-001");
    });

    it("retorna array vazio para lista vazia", () => {
      expect(toRendaFixaViewModels([])).toHaveLength(0);
    });
  });

  describe("toCronogramaViewModel", () => {
    it("mapeia itens", () => {
      const vm = toCronogramaViewModel(cronogramaDto);
      expect(vm.items).toHaveLength(2);
    });

    it("formata totais", () => {
      const vm = toCronogramaViewModel(cronogramaDto);
      expect(vm.totalJuros).toContain("R$");
      expect(vm.totalAmortizacao).toContain("R$");
    });

    it("mapeia tipoLabel", () => {
      const vm = toCronogramaViewModel(cronogramaDto);
      expect(vm.items[0].tipoLabel).toBe("Juros");
      expect(vm.items[1].tipoLabel).toBe("Amortização");
    });
  });

  describe("productTypeToLabel", () => {
    it("traduz tipos conhecidos", () => {
      expect(productTypeToLabel("CDB")).toBe("CDB");
      expect(productTypeToLabel("LCI")).toBe("LCI");
      expect(productTypeToLabel("TESOURO_DIRETO")).toBe("Tesouro Direto");
      expect(productTypeToLabel("PREFIXADO")).toBe("Prefixado");
      expect(productTypeToLabel("POS_FIXADO")).toBe("Pós-fixado");
    });

    it("retorna o próprio valor para desconhecido", () => {
      expect(productTypeToLabel("UNKNOWN")).toBe("UNKNOWN");
    });
  });
});
