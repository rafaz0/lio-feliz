import type { ObterRendaFixaQuery } from "@/application/queries/obter-renda-fixa";
import type { RendaFixaDto } from "@/application/dtos/renda-fixa";
import type { IApplicationService } from "@/application/application-service";
import type { IFixedIncomeRepository } from "@/application/ports/fixed-income-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import type { FixedIncomeAsset } from "@/core/domain/fixed-income";

export class ObterRendaFixaService implements IApplicationService<
  ObterRendaFixaQuery,
  RendaFixaDto[]
> {
  constructor(private readonly repo: IFixedIncomeRepository) {}

  async Execute(query: ObterRendaFixaQuery): Promise<RendaFixaDto[] | ApplicationError> {
    if (!query.portfolioId) {
      return new ValidationError("VALID_ERROR", "portfolioId é obrigatório");
    }

    const assets = await this.repo.findAll(query.portfolioId);
    return assets.map((asset) => this.toDto(asset));
  }

  private toDto(asset: FixedIncomeAsset): RendaFixaDto {
    return {
      id: asset.id.value,
      ticker: asset.ticker.getValue(),
      name: asset.name,
      institution: asset.institution,
      productType: asset.productType,
      nominalValue: asset.nominalValue,
      rate: asset.rate,
      rateType: asset.rateType,
      issueDate: asset.issueDate,
      maturityDate: asset.maturityDate,
      projectedValue: asset.projectedValue,
      totalReturnPercent: asset.totalReturnPercent,
      totalJuros: asset.schedule.totalJuros,
      totalAmortizacao: asset.schedule.totalAmortizacao,
    };
  }
}
