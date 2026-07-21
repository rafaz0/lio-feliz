import { ValueObject } from "../value-object";
import type { Coupon } from "./coupon";

export class AmortizationSchedule extends ValueObject<{ principal: number }> {
  private constructor(
    readonly coupons: readonly Coupon[],
    principal: number,
  ) {
    super({ principal });
  }

  static create(coupons: readonly Coupon[], principal: number): AmortizationSchedule {
    const ordered = [...coupons].sort((a, b) => a.date.getTime() - b.date.getTime());
    return new AmortizationSchedule(ordered, principal);
  }

  get principal(): number {
    return this.props.principal;
  }

  get totalJuros(): number {
    return this.coupons.reduce((acc, c) => acc + c.juros, 0);
  }

  get totalAmortizacao(): number {
    return this.coupons.reduce((acc, c) => acc + c.amortizacao, 0);
  }

  get projectedValue(): number {
    return this.principal + this.totalJuros;
  }
}
