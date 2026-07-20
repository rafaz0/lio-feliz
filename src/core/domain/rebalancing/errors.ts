import { DomainError } from "@/core/domain/errors";

export class InvalidAllocationPercentageError extends DomainError {
  constructor(classe: string, percentual: number) {
    super(
      "INVALID_ALLOCATION_PERCENTAGE",
      `Percentual de alocação inválido para ${classe}: ${percentual}. Deve estar entre 0 e 100.`,
      "INVARIANT_VIOLATION",
    );
  }
}

export class AllocationTotalMustSum100Error extends DomainError {
  constructor(soma: number) {
    super(
      "ALLOCATION_TOTAL_MUST_SUM_100",
      `A soma dos percentuais de alocação deve ser 100%, mas é ${soma}%.`,
      "INVARIANT_VIOLATION",
    );
  }
}

export class NoAllocationTargetsError extends DomainError {
  constructor() {
    super(
      "NO_ALLOCATION_TARGETS",
      "Nenhum alvo de alocação configurado. Configure uma estratégia de alocação primeiro.",
      "PRECONDITION_FAILED",
    );
  }
}

export class InvalidToleranceError extends DomainError {
  constructor(tolerance: number) {
    super(
      "INVALID_TOLERANCE",
      `Tolerância de rebalanceamento inválida: ${tolerance}. Deve estar entre 1 e 20.`,
      "INVARIANT_VIOLATION",
    );
  }
}

export class NoPositionsForRebalancingError extends DomainError {
  constructor() {
    super(
      "NO_POSITIONS_FOR_REBALANCING",
      "Nenhuma posição encontrada na carteira para calcular rebalanceamento.",
      "PRECONDITION_FAILED",
    );
  }
}
