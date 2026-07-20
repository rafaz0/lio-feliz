import type { TaxOperationType } from "./tax-types";

export interface TaxLotProps {
  readonly ticker: string;
  readonly quantity: number;
  readonly averageCost: number;
  readonly totalCost: number;
  readonly acquisitionDate: Date;
  readonly operationType: TaxOperationType;
}

export class TaxLot {
  public readonly ticker: string;
  public readonly quantity: number;
  public readonly averageCost: number;
  public readonly totalCost: number;
  public readonly acquisitionDate: Date;
  public readonly operationType: TaxOperationType;

  private constructor(props: TaxLotProps) {
    this.ticker = props.ticker;
    this.quantity = props.quantity;
    this.averageCost = props.averageCost;
    this.totalCost = props.totalCost;
    this.acquisitionDate = props.acquisitionDate;
    this.operationType = props.operationType;
    Object.freeze(this);
  }

  static create(props: TaxLotProps): TaxLot {
    if (props.quantity < 0) {
      throw new Error(`TaxLot: quantidade negativa (${props.quantity}) para ${props.ticker}`);
    }
    if (props.averageCost < 0) {
      throw new Error(`TaxLot: custo médio negativo (${props.averageCost}) para ${props.ticker}`);
    }
    return new TaxLot(props);
  }

  get isPositive(): boolean {
    return this.quantity > 0 && this.totalCost > 0;
  }

  withUpdatedQuantity(newQuantity: number, newAverageCost: number): TaxLot {
    return TaxLot.create({
      ...this,
      quantity: newQuantity,
      averageCost: newAverageCost,
      totalCost: Math.round(newQuantity * newAverageCost * 100) / 100,
    });
  }

  equals(other: TaxLot): boolean {
    return (
      this.ticker === other.ticker &&
      this.quantity === other.quantity &&
      this.averageCost === other.averageCost &&
      this.totalCost === other.totalCost
    );
  }
}
