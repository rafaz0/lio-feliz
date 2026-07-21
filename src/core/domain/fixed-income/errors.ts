import { DomainError } from "../errors";

export class InvalidFixedIncomeRateError extends DomainError {
  constructor(message = "Taxa do título de renda fixa deve ser >= 0") {
    super("INVALID_FIXED_INCOME_RATE", message);
  }
}

export class InvalidFixedIncomeNominalError extends DomainError {
  constructor(message = "Valor nominal do título de renda fixa deve ser > 0") {
    super("INVALID_FIXED_INCOME_NOMINAL", message);
  }
}

export class InvalidFixedIncomeDatesError extends DomainError {
  constructor(message = "A data de vencimento deve ser posterior à data de emissão") {
    super("INVALID_FIXED_INCOME_DATES", message);
  }
}

export class InvalidScheduleConservationError extends DomainError {
  constructor(message = "O cronograma viola a conservação do principal (I-012)") {
    super("INVALID_SCHEDULE_CONSERVATION", message);
  }
}

export class InvalidFixedIncomeTypeError extends DomainError {
  constructor(type: string) {
    super("INVALID_FIXED_INCOME_TYPE", `Tipo de renda fixa inválido: ${type}`);
  }
}
