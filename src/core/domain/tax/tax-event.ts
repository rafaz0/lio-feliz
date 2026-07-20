import { AggregateRoot } from "@/core/domain/aggregate-root";
import { EntityId } from "@/core/domain/entity-id";
import type { TaxOperationType, TaxCalculationMode } from "./tax-types";

export class TaxEventId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): TaxEventId {
    return new TaxEventId(value);
  }
}

export interface TaxEventData {
  readonly ticker: string;
  readonly operationType: TaxOperationType;
  readonly calculationMode: TaxCalculationMode;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly totalValue: number;
  readonly date: Date;
  readonly gain: number;
  readonly taxRate: number;
  readonly taxDue: number;
  readonly exempt: boolean;
}

export class TaxEvent extends AggregateRoot<TaxEventId> {
  public readonly ticker: string;
  public readonly operationType: TaxOperationType;
  public readonly calculationMode: TaxCalculationMode;
  public readonly quantity: number;
  public readonly unitPrice: number;
  public readonly totalValue: number;
  public readonly date: Date;
  public readonly gain: number;
  public readonly taxRate: number;
  public readonly taxDue: number;
  public readonly exempt: boolean;

  private constructor(id: TaxEventId, data: TaxEventData) {
    super(id);
    this.ticker = data.ticker;
    this.operationType = data.operationType;
    this.calculationMode = data.calculationMode;
    this.quantity = data.quantity;
    this.unitPrice = data.unitPrice;
    this.totalValue = data.totalValue;
    this.date = data.date;
    this.gain = data.gain;
    this.taxRate = data.taxRate;
    this.taxDue = data.taxDue;
    this.exempt = data.exempt;
    Object.freeze(this);
  }

  static create(id: TaxEventId, data: TaxEventData): TaxEvent {
    return new TaxEvent(id, data);
  }

  get isTaxable(): boolean {
    return !this.exempt && this.taxDue > 0;
  }

  get isLoss(): boolean {
    return this.gain < 0;
  }
}
