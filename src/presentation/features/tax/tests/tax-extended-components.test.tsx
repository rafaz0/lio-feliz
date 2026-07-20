import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TaxCalculationDetail } from "../components/TaxCalculationDetail";
import { TaxDeductionPanel } from "../components/TaxDeductionPanel";
import { TaxLotTable } from "../components/TaxLotTable";
import { TaxSummaryExtended } from "../components/TaxSummaryExtended";
import type { ImpostoMensalDto, LoteFiscalDto } from "@/presentation/shared/types/application-layer";

const impostosMensais: ImpostoMensalDto[] = [
  { mes: "2025-01", totalVendas: 10000, totalCompras: 8000, ganhoLiquido: 2000, impostoDevido: 300, prejuizoCompensar: 0, operacaoDayTrade: false },
  { mes: "2025-02", totalVendas: 5000, totalCompras: 6000, ganhoLiquido: -1000, impostoDevido: 0, prejuizoCompensar: 1000, operacaoDayTrade: false },
  { mes: "2025-03", totalVendas: 15000, totalCompras: 10000, ganhoLiquido: 5000, impostoDevido: 750, prejuizoCompensar: 0, operacaoDayTrade: true },
];

const lotesFiscais: LoteFiscalDto[] = [
  { ticker: "PETR4", quantidade: 100, custoMedio: 28.50, valorTotal: 2850, dataAquisicao: "2025-01-15" },
  { ticker: "ITUB4", quantidade: 50, custoMedio: 32.00, valorTotal: 1600, dataAquisicao: "2025-02-10" },
];

describe("tax extended components", () => {
  describe("TaxCalculationDetail", () => {
    it("exibe tabela com resultados mensais", () => {
      render(<TaxCalculationDetail items={impostosMensais} />);
      expect(screen.getByTestId("tax-calculation-detail")).toBeDefined();
      expect(screen.getByTestId("tax-calculation-table")).toBeDefined();
      expect(screen.getAllByTestId("tax-calculation-row").length).toBe(3);
    });

    it("exibe empty quando não há itens", () => {
      render(<TaxCalculationDetail items={[]} />);
      expect(screen.getByTestId("tax-calculation-detail-empty")).toBeDefined();
    });

    it("exibe badge day-trade para operações day-trade", () => {
      render(<TaxCalculationDetail items={impostosMensais} />);
      const badges = screen.getAllByText("Day-Trade");
      expect(badges.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("TaxDeductionPanel", () => {
    it("exibe valores de compensação", () => {
      render(
        <TaxDeductionPanel
          prejuizoCompensarSwing={500}
          prejuizoCompensarDayTrade={200}
          impostoDevido={1000}
          impostoPago={300}
        />,
      );
      expect(screen.getByTestId("tax-deduction-panel")).toBeDefined();
    });

    it("calcula saldo a pagar corretamente", () => {
      render(
        <TaxDeductionPanel
          prejuizoCompensarSwing={500}
          prejuizoCompensarDayTrade={200}
          impostoDevido={1000}
          impostoPago={700}
        />,
      );
      expect(screen.getByText("R$ 300,00")).toBeDefined();
    });

    it("mostra R$ 0 quando imposto já foi totalmente pago", () => {
      render(
        <TaxDeductionPanel
          prejuizoCompensarSwing={0}
          prejuizoCompensarDayTrade={0}
          impostoDevido={500}
          impostoPago={500}
        />,
      );
      expect(screen.getAllByText("R$ 0,00").length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("TaxLotTable", () => {
    it("exibe tabela de lotes fiscais", () => {
      render(<TaxLotTable lotes={lotesFiscais} />);
      expect(screen.getByTestId("tax-lot-table")).toBeDefined();
      expect(screen.getAllByTestId("tax-lot-row").length).toBe(2);
    });

    it("exibe empty quando não há lotes", () => {
      render(<TaxLotTable lotes={[]} />);
      expect(screen.getByTestId("tax-lot-table-empty")).toBeDefined();
    });

    it("formata data corretamente", () => {
      render(<TaxLotTable lotes={lotesFiscais} />);
      expect(screen.getByText("15/01/2025")).toBeDefined();
    });
  });

  describe("TaxSummaryExtended", () => {
    it("exibe consolidado anual", () => {
      render(
        <TaxSummaryExtended
          totalOperacoes={150}
          totalVendas={150000}
          totalCompras={120000}
          ganhoLiquido={30000}
          impostoDevido={4500}
          impostoPago={3000}
          prejuizoCompensarSwing={500}
          prejuizoCompensarDayTrade={200}
        />,
      );
      expect(screen.getByTestId("tax-summary-extended")).toBeDefined();
      expect(screen.getByText("150")).toBeDefined();
    });

    it("exibe saldo a pagar positivo", () => {
      render(
        <TaxSummaryExtended
          totalOperacoes={10}
          totalVendas={50000}
          totalCompras={40000}
          ganhoLiquido={10000}
          impostoDevido={1500}
          impostoPago={500}
          prejuizoCompensarSwing={0}
          prejuizoCompensarDayTrade={0}
        />,
      );
      expect(screen.getByText("R$ 1.000,00")).toBeDefined();
    });
  });
});
