import { DomainError } from "../errors";

export class ComparisonSetNotFoundError extends DomainError {
  constructor(setId: string) {
    super("COMPARISON_SET_NOT_FOUND", `Conjunto de comparacao "${setId}" nao encontrado`);
  }
}

export class InsufficientDataError extends DomainError {
  constructor(assetTicker: string) {
    super("INSUFFICIENT_DATA", `Dados insuficientes para o ativo "${assetTicker}"`);
  }
}

export class InvalidScopeError extends DomainError {
  constructor(scope: string) {
    super("INVALID_SCOPE", `Escopo de comparacao invalido: "${scope}"`);
  }
}

export class ScorecardNotFoundError extends DomainError {
  constructor(scorecardId: string) {
    super("SCORECARD_NOT_FOUND", `Scorecard "${scorecardId}" nao encontrado`);
  }
}

export class MinimumEntriesError extends DomainError {
  constructor() {
    super("MINIMUM_ENTRIES", "Conjunto de comparacao deve ter no minimo 2 ativos");
  }
}
