import { Coupon } from "./coupon";
import { AmortizationSchedule } from "./amortization-schedule";
import type { FixedIncomeType } from "./fixed-income-type";
import { InvalidScheduleConservationError } from "./errors";

export interface ScheduleInput {
  nominalValue: number;
  rate: number;
  rateType: "PRE" | "POS";
  issueDate: Date;
  maturityDate: Date;
  productType: FixedIncomeType;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Serviço de domínio que gera o cronograma de pagamentos (Price 100) de um título de renda fixa.
 * Garante o invariante I-012: Σ(amortizacao) === principal.
 */
export class FixedIncomeService {
  static generateSchedule(input: ScheduleInput): AmortizationSchedule {
    const principal = input.nominalValue;
    const issue = new Date(input.issueDate);
    const maturity = new Date(input.maturityDate);
    const totalDays = Math.max(1, Math.round((maturity.getTime() - issue.getTime()) / DAY_MS));
    const years = Math.floor(totalDays / 365);

    const coupons: Coupon[] = [];

    if (years <= 0) {
      const juros = principal * (input.rate / 100) * (totalDays / 365);
      coupons.push(Coupon.create(maturity, juros, principal));
    } else {
      const amortizacaoPorPeriodo = principal / years;
      for (let k = 1; k <= years; k++) {
        const date = new Date(issue);
        date.setFullYear(date.getFullYear() + k);
        const diasPeriodo = Math.max(1, Math.round((date.getTime() - issue.getTime()) / DAY_MS));
        const juros = principal * (input.rate / 100) * (diasPeriodo / 365);
        coupons.push(Coupon.create(date, juros, amortizacaoPorPeriodo));
      }
    }

    const schedule = AmortizationSchedule.create(coupons, principal);

    if (Math.abs(schedule.totalAmortizacao - principal) > 0.01) {
      throw new InvalidScheduleConservationError();
    }

    return schedule;
  }
}
