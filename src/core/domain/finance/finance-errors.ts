import { DomainError } from "@/core/domain";

export class AccountNotFoundError extends DomainError {
  constructor(accountId: string) {
    super("ACCOUNT_NOT_FOUND", `Conta bancária '${accountId}' não encontrada`);
  }
}

export class InsufficientBalanceError extends DomainError {
  constructor(available: number, requested: number) {
    super(
      "INSUFFICIENT_BALANCE",
      `Saldo insuficiente: R$ ${available.toFixed(2)} disponível, R$ ${requested.toFixed(2)} solicitado`,
    );
  }
}

export class InvalidTransactionError extends DomainError {
  constructor(message: string) {
    super("INVALID_TRANSACTION", message);
  }
}
