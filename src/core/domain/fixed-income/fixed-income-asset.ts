import { Ticker } from "../value-objects/ticker";
import { Result } from "../result";
import type { DomainError } from "../errors";
import { Coupon } from "./coupon";
import type { AmortizationSchedule } from "./amortization-schedule";
import type { FixedIncomeType } from "./fixed-income-type";
import { FixedIncomeService } from "./fixed-income-service";
import { FixedIncomeId } from "./fixed-income-id";
import {
  InvalidFixedIncomeDatesError,
  InvalidFixedIncomeNominalError,
  InvalidFixedIncomeRateError,
} from "./errors";

export interface FixedIncomeAssetProps {
  id: FixedIncomeId;
  ticker: Ticker;
  name: string;
  institution: string;
  productType: FixedIncomeType;
  nominalValue: number;
  rate: number;
  rateType: "PRE" | "POS";
  issueDate: Date;
  maturityDate: Date;
  schedule: AmortizationSchedule;
}

export class FixedIncomeAsset {
  readonly id: FixedIncomeId;
  readonly ticker: Ticker;
  readonly name: string;
  readonly institution: string;
  readonly productType: FixedIncomeType;
  readonly nominalValue: number;
  readonly rate: number;
  readonly rateType: "PRE" | "POS";
  readonly issueDate: Date;
  readonly maturityDate: Date;
  readonly schedule: AmortizationSchedule;

  private constructor(props: FixedIncomeAssetProps) {
    this.id = props.id;
    this.ticker = props.ticker;
    this.name = props.name;
    this.institution = props.institution;
    this.productType = props.productType;
    this.nominalValue = props.nominalValue;
    this.rate = props.rate;
    this.rateType = props.rateType;
    this.issueDate = props.issueDate;
    this.maturityDate = props.maturityDate;
    this.schedule = props.schedule;
  }

  static create(
    props: Omit<FixedIncomeAssetProps, "schedule">,
  ): Result<FixedIncomeAsset, DomainError> {
    if (props.rate < 0) {
      return Result.fail(new InvalidFixedIncomeRateError());
    }
    if (props.nominalValue <= 0) {
      return Result.fail(new InvalidFixedIncomeNominalError());
    }
    if (props.maturityDate.getTime() <= props.issueDate.getTime()) {
      return Result.fail(new InvalidFixedIncomeDatesError());
    }

    let schedule: AmortizationSchedule;
    try {
      schedule = FixedIncomeService.generateSchedule({
        nominalValue: props.nominalValue,
        rate: props.rate,
        rateType: props.rateType,
        issueDate: props.issueDate,
        maturityDate: props.maturityDate,
        productType: props.productType,
      });
    } catch (err) {
      return Result.fail(err as DomainError);
    }

    return Result.ok(
      new FixedIncomeAsset({
        ...props,
        issueDate: new Date(props.issueDate),
        maturityDate: new Date(props.maturityDate),
        schedule,
      }),
    );
  }

  get projectedValue(): number {
    return this.schedule.projectedValue;
  }

  get totalReturnPercent(): number {
    return this.nominalValue > 0 ? (this.schedule.totalJuros / this.nominalValue) * 100 : 0;
  }

  get coupons(): readonly Coupon[] {
    return this.schedule.coupons;
  }
}
