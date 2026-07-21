import { ValueObject } from "../value-object";

export class Coupon extends ValueObject<{ date: number; juros: number; amortizacao: number }> {
  private constructor(props: { date: number; juros: number; amortizacao: number }) {
    super(props);
  }

  static create(date: Date, juros: number, amortizacao: number): Coupon {
    return new Coupon({ date: new Date(date).getTime(), juros, amortizacao });
  }

  get date(): Date {
    return new Date(this.props.date);
  }

  get juros(): number {
    return this.props.juros;
  }

  get amortizacao(): number {
    return this.props.amortizacao;
  }

  get total(): number {
    return this.juros + this.amortizacao;
  }
}
