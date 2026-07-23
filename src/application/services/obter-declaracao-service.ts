import type { ObterDeclaracaoQuery } from "@/application/queries/obter-declaracao";
import type { DeclaracaoDto } from "@/application/dtos/declaracao";
import type { IApplicationService } from "@/application/application-service";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import type { ITaxStatementRepository } from "@/application/ports/tax-statement-repository";
import { ValidationError, NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { TaxCalculationService } from "@/core/domain/tax";
import type { RawOperation } from "@/core/domain/tax";

export class ObterDeclaracaoService implements IApplicationService<
  ObterDeclaracaoQuery,
  DeclaracaoDto
> {
  private readonly taxCalcService: TaxCalculationService;

  constructor(
    private readonly projectionRepo: IProjectionRepository,
    private readonly taxStatementRepo: ITaxStatementRepository,
  ) {
    this.taxCalcService = new TaxCalculationService();
  }

  async Execute(query: ObterDeclaracaoQuery): Promise<DeclaracaoDto | ApplicationError> {
    if (!query.portfolioId) {
      return new ValidationError("VALID_ERROR", "portfolioId é obrigatório");
    }

    if (!query.ano || query.ano < 1900) {
      return new ValidationError("VALID_ERROR", "Ano inválido");
    }

    const existing = await this.taxStatementRepo.findByAno(query.portfolioId, query.ano);
    if (existing && existing.consolidation) {
      const c = existing.consolidation;
      return {
        ano: query.ano,
        totalOperacoes: c.totalOperacoes,
        totalProventos: c.totalProventos,
        impostoDevido: c.impostoDevido,
        impostoPago: c.impostoPago,
        prejuizoCompensar: c.prejuizoCompensarSwing + c.prejuizoCompensarDayTrade,
        lotes: existing.taxLots.map((l) => ({
          ticker: l.ticker,
          quantidade: l.quantity,
          custoMedio: l.averageCost,
          valorTotal: l.totalCost,
          dataAquisicao: l.acquisitionDate.toISOString().slice(0, 10),
        })),
        impostoMensal: c.months.map((m) => ({
          mes: m.month,
          totalVendas: m.totalSells,
          totalCompras: m.totalBuys,
          ganhoLiquido: m.totalGain,
          impostoDevido: m.taxDue,
          prejuizoCompensar: Math.abs(m.totalLoss),
          operacaoDayTrade: m.dayTradeGain !== 0,
        })),
        consolidadoAnual: {
          totalOperacoes: c.totalOperacoes,
          totalVendas: c.months.reduce((s, m) => s + m.totalSells, 0),
          totalCompras: c.months.reduce((s, m) => s + m.totalBuys, 0),
          ganhoLiquido: c.totalOperacoes > 0 ? c.months.reduce((s, m) => s + m.totalGain, 0) : 0,
          impostoDevido: c.impostoDevido,
          impostoPago: c.impostoPago,
          prejuizoCompensarSwing: c.prejuizoCompensarSwing,
          prejuizoCompensarDayTrade: c.prejuizoCompensarDayTrade,
        },
      };
    }

    const posicoes = await this.projectionRepo.ObterPosicoes(query.portfolioId);
    const proventos = await this.projectionRepo.ObterProventos(query.portfolioId, {
      ano: query.ano,
    });

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
      query.ano,
      {
        swingTrade: 0,
        dayTrade: 0,
      },
    );

    if (consolidationResult.isFailure) {
      return new NotFoundError("TAX_NOT_FOUND", `Nenhuma declaração encontrada para ${query.ano}`);
    }

    const consolidation = consolidationResult.value!;
    const totalProventos = proventos.reduce((sum, p) => sum + p.valor, 0);

    return {
      ano: query.ano,
      totalOperacoes: rawOps.length,
      totalProventos,
      impostoDevido: consolidation.totalTaxDue,
      impostoPago: 0,
      prejuizoCompensar: consolidation.finalLossSwing + consolidation.finalLossDayTrade,
      lotes: [],
      impostoMensal: consolidation.monthlyResults.map((r) => ({
        mes: r.month,
        totalVendas: r.totalSell,
        totalCompras: r.totalBuy,
        ganhoLiquido: r.gain,
        impostoDevido: r.taxDue,
        prejuizoCompensar: r.accumulatedLoss,
        operacaoDayTrade: r.calculationMode === "DAY_TRADE",
      })),
      consolidadoAnual: {
        totalOperacoes: rawOps.length,
        totalVendas: consolidation.monthlyResults.reduce((s, r) => s + r.totalSell, 0),
        totalCompras: consolidation.monthlyResults.reduce((s, r) => s + r.totalBuy, 0),
        ganhoLiquido: consolidation.totalSwingGain + consolidation.totalDayTradeGain,
        impostoDevido: consolidation.totalTaxDue,
        impostoPago: 0,
        prejuizoCompensarSwing: consolidation.finalLossSwing,
        prejuizoCompensarDayTrade: consolidation.finalLossDayTrade,
      },
    };
  }
}
