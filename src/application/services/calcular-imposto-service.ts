import type { CalcularImpostoCommand } from "@/application/commands/calcular-imposto";
import type { DeclaracaoDto } from "@/application/dtos/declaracao";
import type { IApplicationService } from "@/application/application-service";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { TaxCalculationService, TaxCalculationMode } from "@/core/domain/tax";
import type { RawOperation } from "@/core/domain/tax";

export class CalcularImpostoService implements IApplicationService<CalcularImpostoCommand, DeclaracaoDto> {
  private readonly taxCalcService: TaxCalculationService;

  constructor(private readonly projectionRepo: IProjectionRepository) {
    this.taxCalcService = new TaxCalculationService();
  }

  async Execute(command: CalcularImpostoCommand): Promise<DeclaracaoDto | ApplicationError> {
    if (!command.portfolioId) {
      return new ValidationError("VALID_ERROR", "portfolioId é obrigatório");
    }

    if (!command.ano || command.ano < 1900) {
      return new ValidationError("VALID_ERROR", "Ano inválido");
    }

    const posicoes = await this.projectionRepo.ObterPosicoes(command.portfolioId);
    const proventos = await this.projectionRepo.ObterProventos(command.portfolioId, { ano: command.ano });

    const rawOps: RawOperation[] = posicoes.map((p) => ({
      ticker: p.ticker,
      assetType: p.classe ?? "other",
      date: new Date(),
      side: "buy" as const,
      quantity: p.quantidade,
      price: p.valorTotal > 0 && p.quantidade > 0 ? p.valorTotal / p.quantidade : 0,
    }));

    const consolidationResult = this.taxCalcService.calculateAnnualConsolidation(
      rawOps,
      command.ano,
      { swingTrade: 0, dayTrade: 0 },
    );

    if (consolidationResult.isFailure) {
      return new ValidationError("TAX_CALC_ERROR", consolidationResult.error!.message);
    }

    const consolidation = consolidationResult.value!;

    const totalProventos = proventos.reduce((sum, p) => sum + p.valor, 0);

    const selecionados = command.modo === TaxCalculationMode.COMPLETO
      ? consolidation.monthlyResults
      : consolidation.monthlyResults.filter(
          (r) =>
            (command.modo === TaxCalculationMode.DAY_TRADE && r.calculationMode === TaxCalculationMode.DAY_TRADE) ||
            (command.modo === TaxCalculationMode.SWING_TRADE && r.calculationMode === TaxCalculationMode.SWING_TRADE),
        );

    const impostoMensal = selecionados.map((r) => ({
      mes: r.month,
      totalVendas: r.totalSell,
      totalCompras: r.totalBuy,
      ganhoLiquido: r.gain,
      impostoDevido: r.taxDue,
      prejuizoCompensar: r.accumulatedLoss,
      operacaoDayTrade: r.calculationMode === TaxCalculationMode.DAY_TRADE,
    }));

    return {
      ano: command.ano,
      totalOperacoes: rawOps.length,
      totalProventos,
      impostoDevido: consolidation.totalTaxDue,
      impostoPago: 0,
      prejuizoCompensar: consolidation.finalLossSwing + consolidation.finalLossDayTrade,
      lotes: [],
      impostoMensal,
      consolidadoAnual: {
        totalOperacoes: rawOps.length,
        totalVendas: selecionados.reduce((s, r) => s + r.totalSell, 0),
        totalCompras: selecionados.reduce((s, r) => s + r.totalBuy, 0),
        ganhoLiquido: consolidation.totalSwingGain + consolidation.totalDayTradeGain,
        impostoDevido: consolidation.totalTaxDue,
        impostoPago: 0,
        prejuizoCompensarSwing: consolidation.finalLossSwing,
        prejuizoCompensarDayTrade: consolidation.finalLossDayTrade,
      },
    };
  }
}
