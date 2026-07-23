import { AggregateRoot } from "@/core/domain/aggregate-root";
import { EntityId } from "@/core/domain/entity-id";
import type { TaxLot } from "./tax-lot";
import type { TaxEvent } from "./tax-event";

export class TaxStatementId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): TaxStatementId {
    return new TaxStatementId(value);
  }
}

export interface MonthlyTaxSummary {
  readonly month: string;
  readonly totalSells: number;
  readonly totalBuys: number;
  readonly totalGain: number;
  readonly totalLoss: number;
  readonly taxDue: number;
  readonly swingTradeGain: number;
  readonly dayTradeGain: number;
  readonly swingTradeTax: number;
  readonly dayTradeTax: number;
  readonly accumulatedLossSwing: number;
  readonly accumulatedLossDayTrade: number;
}

export interface AnnualTaxConsolidation {
  readonly ano: number;
  readonly totalOperacoes: number;
  readonly totalProventos: number;
  readonly impostoDevido: number;
  readonly impostoPago: number;
  readonly prejuizoCompensarSwing: number;
  readonly prejuizoCompensarDayTrade: number;
  readonly totalDividendos: number;
  readonly totalJcp: number;
  readonly months: MonthlyTaxSummary[];
}

export class TaxStatement extends AggregateRoot<TaxStatementId> {
  public readonly portfolioId: string;
  public readonly ano: number;
  public readonly taxEvents: TaxEvent[];
  public readonly taxLots: TaxLot[];
  public readonly consolidation: AnnualTaxConsolidation | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  private constructor(
    id: TaxStatementId,
    portfolioId: string,
    ano: number,
    taxEvents: TaxEvent[],
    taxLots: TaxLot[],
    consolidation: AnnualTaxConsolidation | null,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id);
    this.portfolioId = portfolioId;
    this.ano = ano;
    this.taxEvents = [...taxEvents];
    this.taxLots = [...taxLots];
    this.consolidation = consolidation;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    Object.freeze(this);
  }

  static create(
    id: TaxStatementId,
    portfolioId: string,
    ano: number,
    taxEvents: TaxEvent[],
    taxLots: TaxLot[],
  ): TaxStatement {
    const now = new Date();
    return new TaxStatement(id, portfolioId, ano, taxEvents, taxLots, null, now, now);
  }

  static reconstitute(
    id: TaxStatementId,
    portfolioId: string,
    ano: number,
    taxEvents: TaxEvent[],
    taxLots: TaxLot[],
    consolidation: AnnualTaxConsolidation | null,
    createdAt: Date,
    updatedAt: Date,
  ): TaxStatement {
    return new TaxStatement(
      id,
      portfolioId,
      ano,
      taxEvents,
      taxLots,
      consolidation,
      createdAt,
      updatedAt,
    );
  }

  getTotalTaxDue(): number {
    if (this.consolidation) return this.consolidation.impostoDevido;
    return this.taxEvents.reduce((sum, e) => sum + e.taxDue, 0);
  }

  getTotalGain(): number {
    return this.taxEvents.reduce((sum, e) => sum + e.gain, 0);
  }

  hasEvents(): boolean {
    return this.taxEvents.length > 0;
  }
}
