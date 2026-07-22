import type { ObterTaxaCambioQuery } from "@/application/queries/obter-taxa-cambio";
import type { TaxaCambioDto } from "@/application/dtos/internacional";
import type { IApplicationService } from "@/application/application-service";
import type { IForeignAssetRepository } from "@/application/ports/foreign-asset-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterTaxaCambioService
  implements IApplicationService<ObterTaxaCambioQuery, TaxaCambioDto>
{
  constructor(private readonly foreignRepo: IForeignAssetRepository) {}

  async Execute(query: ObterTaxaCambioQuery): Promise<TaxaCambioDto | ApplicationError> {
    const rate = await this.foreignRepo.findExchangeRate(query.ticker, query.currency ?? "");
    if (!rate) {
      return new NotFoundError("ExchangeRate", query.ticker);
    }

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
