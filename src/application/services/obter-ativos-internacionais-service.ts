import type { ObterAtivosInternacionaisQuery } from "@/application/queries/obter-ativos-internacionais";
import type { AtivosInternacionaisDto } from "@/application/dtos/internacional";
import type { IApplicationService } from "@/application/application-service";
import type { IForeignAssetRepository } from "@/application/ports/foreign-asset-repository";
import type { ApplicationError } from "@/application/errors/application-error";
import { CurrencyConversionService } from "@/core/domain/international";

export class ObterAtivosInternacionaisService implements IApplicationService<
  ObterAtivosInternacionaisQuery,
  AtivosInternacionaisDto
> {
  private readonly conversionService = new CurrencyConversionService();

  constructor(private readonly foreignRepo: IForeignAssetRepository) {}

  async Execute(
    query: ObterAtivosInternacionaisQuery,
  ): Promise<AtivosInternacionaisDto | ApplicationError> {
    const assets = await this.foreignRepo.findAssetsByPortfolio(query.portfolioId);

    const ativos = await Promise.all(
      assets.map(async (asset) => {
        const latestRate = await this.foreignRepo.findLatestExchangeRate(asset.ticker);
        const valorOriginal = 0;
        const valorBRL = latestRate
          ? this.conversionService.convert(valorOriginal, asset.currency, latestRate)
          : null;

        return {
          ticker: asset.ticker,
          name: asset.name,
          exchange: asset.exchange,
          currency: asset.currency,
          assetType: asset.assetType,
          valorOriginal,
          valorBRL: valorBRL?.toAmount ?? 0,
          taxaCambio: latestRate?.rate ?? 0,
        };
      }),
    );

    return { ativos };
  }
}
