import type { ObterCronogramaPagamentosQuery } from "@/application/queries/obter-cronograma-pagamentos";
import type { CronogramaPagamentosDto, CronogramaItemDto } from "@/application/dtos/renda-fixa";
import type { IApplicationService } from "@/application/application-service";
import type { IFixedIncomeRepository } from "@/application/ports/fixed-income-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterCronogramaPagamentosService
  implements IApplicationService<ObterCronogramaPagamentosQuery, CronogramaPagamentosDto>
{
  constructor(private readonly repo: IFixedIncomeRepository) {}

  async Execute(
    query: ObterCronogramaPagamentosQuery,
  ): Promise<CronogramaPagamentosDto | ApplicationError> {
    if (!query.portfolioId) {
      return new ValidationError("VALID_ERROR", "portfolioId é obrigatório");
    }

    const assets = await this.repo.findAll(query.portfolioId);
    const now = new Date();

    const items: CronogramaItemDto[] = [];
    for (const asset of assets) {
      for (const coupon of asset.coupons) {
        if (query.apenasFuturos && coupon.date.getTime() < now.getTime()) continue;

        if (coupon.juros > 0) {
          items.push({
            assetId: asset.id.value,
            ticker: asset.ticker.getValue(),
            date: coupon.date,
            tipo: "JUROS",
            valor: coupon.juros,
          });
        }
        if (coupon.amortizacao > 0) {
          items.push({
            assetId: asset.id.value,
            ticker: asset.ticker.getValue(),
            date: coupon.date,
            tipo: "AMORTIZACAO",
            valor: coupon.amortizacao,
          });
        }
      }
    }

    items.sort((a, b) => a.date.getTime() - b.date.getTime());

    return {
      items,
      totalJuros: items.filter((i) => i.tipo === "JUROS").reduce((acc, i) => acc + i.valor, 0),
      totalAmortizacao: items
        .filter((i) => i.tipo === "AMORTIZACAO")
        .reduce((acc, i) => acc + i.valor, 0),
    };
  }
}
