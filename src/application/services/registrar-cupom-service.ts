import type { RegistrarCupomCommand } from "@/application/commands/registrar-cupom";
import type { RendaFixaDto } from "@/application/dtos/renda-fixa";
import type { IApplicationService } from "@/application/application-service";
import type { IFixedIncomeRepository } from "@/application/ports/fixed-income-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { Ticker } from "@/core/domain/value-objects/ticker";
import { FixedIncomeAsset } from "@/core/domain/fixed-income";
import { FixedIncomeId } from "@/core/domain/fixed-income";
import { convertDomainError } from "@/application/error-converter";

export class RegistrarCupomService
  implements IApplicationService<RegistrarCupomCommand, RendaFixaDto>
{
  constructor(private readonly repo: IFixedIncomeRepository) {}

  async Execute(command: RegistrarCupomCommand): Promise<RendaFixaDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    const assetId = FixedIncomeId.create(`rf-${command.portfolioId}-${Date.now()}`);
    const result = FixedIncomeAsset.create({
      id: assetId,
      ticker: Ticker.create(command.ticker),
      name: command.name,
      institution: command.institution,
      productType: command.productType,
      nominalValue: command.nominalValue,
      rate: command.rate,
      rateType: command.rateType,
      issueDate: command.issueDate,
      maturityDate: command.maturityDate,
    });

    if (result.isFailure) {
      return convertDomainError(result.error!).error;
    }

    await this.repo.save(result.value!);

    return this.toDto(result.value!);
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

  private validar(command: RegistrarCupomCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};

    if (!command.portfolioId) errors.portfolioId = ["Campo obrigatório"];
    if (!command.ticker || command.ticker.trim().length === 0) errors.ticker = ["Ticket é obrigatório"];
    if (!command.name || command.name.trim().length === 0) errors.name = ["Nome é obrigatório"];
    if (!command.institution || command.institution.trim().length === 0)
      errors.institution = ["Instituição é obrigatória"];
    if (!command.nominalValue || command.nominalValue <= 0)
      errors.nominalValue = ["Deve ser maior que zero"];
    if (command.rate < 0) errors.rate = ["Não pode ser negativa"];
    if (!command.issueDate) errors.issueDate = ["Data de emissão é obrigatória"];
    if (!command.maturityDate) errors.maturityDate = ["Data de vencimento é obrigatória"];

    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada inválidos", errors)
      : null;
  }
}
