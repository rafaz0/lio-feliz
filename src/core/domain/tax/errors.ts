import { DomainError } from "@/core/domain/errors";

export class InvalidTaxPeriodError extends DomainError {
  constructor(ano: number) {
    super("INVALID_TAX_PERIOD", `Período fiscal inválido: ${ano}`, "INVARIANT_VIOLATION");
  }
}

export class EmptyOperationsError extends DomainError {
  constructor() {
    super(
      "EMPTY_OPERATIONS",
      "Nenhuma operação encontrada para o período fiscal informado",
      "INVARIANT_VIOLATION",
    );
  }
}

export class InconsistentTaxLotError extends DomainError {
  constructor(ticker: string) {
    super(
      "INCONSISTENT_TAX_LOT",
      `Lote fiscal inconsistente para o ativo ${ticker}: quantidade negativa ou custo médio inválido`,
      "INVARIANT_VIOLATION",
    );
  }
}

export class ExportFailedError extends DomainError {
  constructor(formato: string, motivo: string) {
    super(
      "EXPORT_FAILED",
      `Falha ao exportar declaração no formato ${formato}: ${motivo}`,
      "OPERATION_FAILED",
    );
  }
}
