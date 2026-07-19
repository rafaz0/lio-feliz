import type { OperacaoBruta } from "@/application/ports";
import type { IImportInterpreterPort } from "@/application/ports";
import type { FinancialEvent } from "@/core/domain/portfolio";
import {
  BuyEvent,
  SellEvent,
  DividendEvent,
  JcpEvent,
  BonusEvent,
  SplitEvent,
  GroupingEvent,
  AmortizationEvent,
  AdjustmentEvent,
} from "@/core/domain/portfolio";

export class ImportInterpreter implements IImportInterpreterPort {
  InterpretarOperacao(
    operacao: OperacaoBruta,
    portfolioId: string,
    correlationId: string,
  ): FinancialEvent {
    const ativo = operacao.ativo.toUpperCase();
    const tipo = operacao.tipo.toUpperCase().trim();

    switch (tipo) {
      case "BUY":
        return new BuyEvent(portfolioId, correlationId, ativo, operacao.quantidade, operacao.valor);
      case "SELL":
        return new SellEvent(portfolioId, correlationId, ativo, operacao.quantidade, operacao.valor);
      case "DIVIDEND":
        return new DividendEvent(portfolioId, correlationId, ativo, operacao.quantidade, operacao.valor);
      case "JCP":
        return new JcpEvent(portfolioId, correlationId, ativo, operacao.quantidade, operacao.valor);
      case "BONUS":
        return new BonusEvent(portfolioId, correlationId, ativo, operacao.quantidade, operacao.valor);
      case "SPLIT":
        return new SplitEvent(portfolioId, correlationId, ativo, operacao.quantidade, operacao.valor);
      case "GROUPING":
        return new GroupingEvent(portfolioId, correlationId, ativo, operacao.quantidade, operacao.valor);
      case "AMORTIZATION":
        return new AmortizationEvent(portfolioId, correlationId, ativo, operacao.quantidade, operacao.valor);
      case "ADJUSTMENT":
        return new AdjustmentEvent(
          portfolioId,
          correlationId,
          ativo,
          operacao.quantidade,
          operacao.valor,
          operacao.observacao ?? "Ajuste manual",
        );
      default:
        throw new Error(`Tipo de operacao desconhecido: ${tipo}`);
    }
  }
}
