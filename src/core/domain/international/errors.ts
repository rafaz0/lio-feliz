import { DomainError } from "../errors";

export class InvalidExchangeRateError extends DomainError {
  constructor(message = "Taxa de câmbio deve ser maior que zero") {
    super("INVALID_EXCHANGE_RATE", message);
  }
}

export class ExchangeRateNotFoundError extends DomainError {
  constructor(ticker: string, currency: string) {
    super("EXCHANGE_RATE_NOT_FOUND", `Taxa de câmbio não encontrada para ${ticker} ${currency}`);
  }
}

export class InvalidCurrencyPairError extends DomainError {
  constructor(from: string, to: string) {
    super("INVALID_CURRENCY_PAIR", `Paridade de moeda inválida: ${from} para ${to}`);
  }
}
