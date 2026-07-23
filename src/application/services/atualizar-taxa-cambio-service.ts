import type { AtualizarTaxaCambioCommand } from "@/application/commands/atualizar-taxa-cambio";
import type { TaxaCambioDto } from "@/application/dtos/internacional";
import type { IApplicationService } from "@/application/application-service";
import type { IForeignAssetRepository } from "@/application/ports/foreign-asset-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { ExchangeRate, CurrencyPair } from "@/core/domain/international";

export class AtualizarTaxaCambioService implements IApplicationService<
  AtualizarTaxaCambioCommand,
  TaxaCambioDto
> {
  constructor(private readonly foreignRepo: IForeignAssetRepository) {}

  async Execute(command: AtualizarTaxaCambioCommand): Promise<TaxaCambioDto | ApplicationError> {
    if (!command.rate || command.rate <= 0) {
      return new ValidationError("VALID_ERROR", "Taxa de cambio deve ser maior que zero");
    }

    const pair = CurrencyPair.create(
      command.fromCurrency as import("@/core/domain/international").CurrencyCode,
      command.toCurrency as import("@/core/domain/international").CurrencyCode,
    );

    const rate = ExchangeRate.create(
      command.ticker,
      command.currency,
      pair,
      command.rate,
      command.source,
      new Date(),
    );

    await this.foreignRepo.saveExchangeRate(rate);

    return {
      ticker: rate.ticker,
      currency: rate.currency,
      fromCurrency: rate.pair.from,
      toCurrency: rate.pair.to,
      rate: rate.rate,
      source: rate.source,
      lastUpdated: rate.lastUpdated.toISOString(),
      isFresh: rate.isFresh,
    };
  }
}
