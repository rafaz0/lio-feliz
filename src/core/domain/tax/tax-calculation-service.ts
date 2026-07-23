import { Result } from "@/core/domain/result";
import type { DomainError } from "@/core/domain/domain-event";
import { TaxLot } from "./tax-lot";
import { TaxEvent, TaxEventId } from "./tax-event";
import { TAX_RATE_TABLE, TaxCalculationMode, TaxOperationType } from "./tax-types";
import { EmptyOperationsError, InconsistentTaxLotError } from "./errors";

export interface RawOperation {
  readonly ticker: string;
  readonly assetType: string;
  readonly date: Date;
  readonly side: "buy" | "sell" | "dividend" | "bonus";
  readonly quantity: number;
  readonly price: number;
}

export interface WeightedAverageCost {
  readonly ticker: string;
  readonly quantity: number;
  readonly averageCost: number;
  readonly totalCost: number;
}

export interface MonthlyCalculationResult {
  readonly month: string;
  readonly ticker: string;
  readonly calculationMode: TaxCalculationMode;
  readonly totalBuy: number;
  readonly totalSell: number;
  readonly gain: number;
  readonly taxRate: number;
  readonly taxDue: number;
  readonly exempt: boolean;
  readonly accumulatedLoss: number;
}

export class TaxCalculationService {
  calculateWeightedAverageCost(
    operations: RawOperation[],
    ticker: string,
    upToDate: Date,
  ): WeightedAverageCost {
    const tickerOps = operations
      .filter((o) => o.ticker === ticker && o.date.getTime() <= upToDate.getTime())
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    let quantity = 0;
    let averageCost = 0;

    for (const op of tickerOps) {
      if (op.side === "buy") {
        const newQuantity = quantity + op.quantity;
        averageCost =
          newQuantity > 0
            ? Math.round(((averageCost * quantity + op.price * op.quantity) / newQuantity) * 100) /
              100
            : 0;
        quantity = newQuantity;
      } else if (op.side === "sell") {
        const sellQty = Math.min(op.quantity, quantity);
        quantity -= sellQty;
        if (quantity <= 0) {
          quantity = 0;
          averageCost = 0;
        }
      } else if (op.side === "bonus") {
        quantity += op.quantity;
        averageCost =
          quantity > 0
            ? Math.round(((averageCost * (quantity - op.quantity)) / quantity) * 100) / 100
            : 0;
      }
    }

    return {
      ticker,
      quantity,
      averageCost,
      totalCost: Math.round(quantity * averageCost * 100) / 100,
    };
  }

  calculateMonthSummary(
    operations: RawOperation[],
    month: string,
    taxLots: TaxLot[],
  ): MonthlyCalculationResult[] {
    const monthOps = operations.filter((o) => {
      const yyyyMm = `${o.date.getFullYear()}-${String(o.date.getMonth() + 1).padStart(2, "0")}`;
      return yyyyMm === month;
    });

    if (monthOps.length === 0) return [];

    const tickers = [...new Set(monthOps.map((o) => o.ticker))];
    const results: MonthlyCalculationResult[] = [];

    for (const ticker of tickers) {
      const tickerOps = monthOps.filter((o) => o.ticker === ticker);
      const assetType = tickerOps[0]?.assetType ?? "other";
      const rateEntry =
        TAX_RATE_TABLE.find((r) => r.assetType === assetType) ??
        TAX_RATE_TABLE.find((r) => r.assetType === "other")!;

      const totalBuy = tickerOps
        .filter((o) => o.side === "buy")
        .reduce((s, o) => s + o.quantity * o.price, 0);

      const totalSell = tickerOps
        .filter((o) => o.side === "sell")
        .reduce((s, o) => s + o.quantity * o.price, 0);

      const sellOps = tickerOps.filter((o) => o.side === "sell");
      const sellDates = [...new Set(sellOps.map((o) => o.date.toDateString()))];
      const isDayTrade =
        sellDates.length > 0 &&
        monthOps
          .filter((o) => o.ticker === ticker && o.side === "sell")
          .some((s, _i, arr) =>
            arr.some((a) => a.date.getTime() === s.date.getTime() && a.side === "buy"),
          );

      const calculationMode = isDayTrade
        ? TaxCalculationMode.DAY_TRADE
        : TaxCalculationMode.SWING_TRADE;

      let gain = 0;
      for (const sellOp of sellOps) {
        const wac = this.calculateWeightedAverageCost(operations, ticker, sellOp.date);
        const sellGain = Math.round((sellOp.price - wac.averageCost) * sellOp.quantity * 100) / 100;
        gain += sellGain;
      }

      const isExempt =
        rateEntry.exemptionAmount > 0 &&
        totalSell <= rateEntry.exemptionAmount &&
        calculationMode === TaxCalculationMode.SWING_TRADE;
      const effectiveRate = isDayTrade ? rateEntry.dayTradeRate : rateEntry.swingTradeRate;

      const taxDue = isExempt || gain <= 0 ? 0 : Math.round(gain * effectiveRate * 100) / 100;

      const taxLot = taxLots.find((l) => l.ticker === ticker);
      const accumulatedLoss = taxLot && gain < 0 ? Math.abs(gain) : 0;

      results.push({
        month,
        ticker,
        calculationMode,
        totalBuy,
        totalSell,
        gain,
        taxRate: effectiveRate,
        taxDue,
        exempt: isExempt,
        accumulatedLoss,
      });
    }

    return results;
  }

  calculateAnnualConsolidation(
    operations: RawOperation[],
    ano: number,
    existingLosses: { swingTrade: number; dayTrade: number },
  ): Result<
    {
      monthlyResults: MonthlyCalculationResult[];
      totalSwingGain: number;
      totalDayTradeGain: number;
      totalTaxDue: number;
      finalLossSwing: number;
      finalLossDayTrade: number;
    },
    DomainError
  > {
    if (!ano || ano < 1900 || ano > 2100) {
      return Result.fail(new EmptyOperationsError());
    }

    if (operations.length === 0) {
      return Result.fail(new EmptyOperationsError());
    }

    const months = new Set<string>();
    for (const op of operations) {
      const yyyyMm = `${op.date.getFullYear()}-${String(op.date.getMonth() + 1).padStart(2, "0")}`;
      months.add(yyyyMm);
    }

    const allLots: TaxLot[] = [];
    for (const ticker of [...new Set(operations.map((o) => o.ticker))]) {
      const wac = this.calculateWeightedAverageCost(operations, ticker, new Date(ano + 1, 0, 1));
      try {
        allLots.push(
          TaxLot.create({
            ticker,
            quantity: wac.quantity,
            averageCost: wac.averageCost,
            totalCost: wac.totalCost,
            acquisitionDate: new Date(ano, 0, 1),
            operationType: "BUY" as TaxOperationType,
          }),
        );
      } catch {
        return Result.fail(new InconsistentTaxLotError(ticker));
      }
    }

    const monthlyResults: MonthlyCalculationResult[] = [];
    let swingLossRemaining = existingLosses.swingTrade;
    let dayTradeLossRemaining = existingLosses.dayTrade;
    let totalSwingGain = 0;
    let totalDayTradeGain = 0;
    let totalTaxDue = 0;

    const sortedMonths = [...months].sort();
    for (const month of sortedMonths) {
      const results = this.calculateMonthSummary(operations, month, allLots);
      for (const r of results) {
        monthlyResults.push(r);

        if (r.calculationMode === TaxCalculationMode.DAY_TRADE) {
          if (r.gain > 0) {
            const offset = Math.min(r.gain, dayTradeLossRemaining);
            const taxable = r.gain - offset;
            totalDayTradeGain += taxable;
            dayTradeLossRemaining -= offset;
            const tax = Math.round(taxable * r.taxRate * 100) / 100;
            totalTaxDue += tax;
          } else {
            dayTradeLossRemaining += Math.abs(r.gain);
          }
        } else {
          if (r.gain > 0) {
            const offset = Math.min(r.gain, swingLossRemaining);
            const taxable = r.gain - offset;
            totalSwingGain += taxable;
            swingLossRemaining -= offset;
            const tax = r.exempt ? 0 : Math.round(taxable * r.taxRate * 100) / 100;
            totalTaxDue += tax;
          } else {
            swingLossRemaining += Math.abs(r.gain);
          }
        }
      }
    }

    return Result.ok({
      monthlyResults,
      totalSwingGain,
      totalDayTradeGain,
      totalTaxDue,
      finalLossSwing: Math.round(swingLossRemaining * 100) / 100,
      finalLossDayTrade: Math.round(dayTradeLossRemaining * 100) / 100,
    });
  }

  generateTaxEvents(
    monthlyResults: MonthlyCalculationResult[],
    operations: RawOperation[],
  ): TaxEvent[] {
    const events: TaxEvent[] = [];
    for (const mr of monthlyResults) {
      const relatedOps = operations.filter(
        (o) =>
          o.ticker === mr.ticker &&
          `${o.date.getFullYear()}-${String(o.date.getMonth() + 1).padStart(2, "0")}` === mr.month,
      );

      for (const op of relatedOps) {
        if (op.side === "sell") {
          const event = TaxEvent.create(
            TaxEventId.create(`${mr.month}-${op.ticker}-${op.date.getTime()}`),
            {
              ticker: mr.ticker,
              operationType: TaxOperationType.SELL,
              calculationMode: mr.calculationMode,
              quantity: op.quantity,
              unitPrice: op.price,
              totalValue: op.quantity * op.price,
              date: op.date,
              gain: mr.gain,
              taxRate: mr.taxRate,
              taxDue: mr.taxDue,
              exempt: mr.exempt,
            },
          );
          events.push(event);
        }
      }
    }
    return events;
  }
}
