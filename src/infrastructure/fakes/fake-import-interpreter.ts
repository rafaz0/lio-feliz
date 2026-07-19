import type { FinancialEvent } from "@/core/domain/portfolio";
import type { OperacaoBruta } from "@/application/ports";
import type { IImportInterpreterPort } from "@/application/ports";

export class FakeImportInterpreter implements IImportInterpreterPort {
  private operacoesInterpretadas: Array<{
    operacao: OperacaoBruta;
    portfolioId: string;
    correlationId: string;
    resultado: FinancialEvent;
  }> = [];

  InterpretarOperacao(
    operacao: OperacaoBruta,
    portfolioId: string,
    correlationId: string,
  ): FinancialEvent {
    const resultado = this.interpretar(operacao, portfolioId, correlationId);
    this.operacoesInterpretadas.push({ operacao, portfolioId, correlationId, resultado });
    return resultado;
  }

  getOperacoesInterpretadas() {
    return this.operacoesInterpretadas;
  }

  reset(): void {
    this.operacoesInterpretadas = [];
  }

  private interpretar(
    _operacao: OperacaoBruta,
    _portfolioId: string,
    _correlationId: string,
  ): FinancialEvent {
    throw new Error("FakeImportInterpreter: interpretar nao implementado. Use spy ou mock.");
  }
}
