import type { FinancialEvent } from "@/core/domain/portfolio";
import type { OperacaoBruta } from "./data-gateway";

export interface IImportInterpreterPort {
  InterpretarOperacao(
    operacao: OperacaoBruta,
    portfolioId: string,
    correlationId: string,
  ): FinancialEvent;
}
