import { Ticker, Quantity, Money } from "@/core/domain";
import { FinancialEvent } from "./financial-event";
import { BuyEvent } from "./buy-event";
import { SellEvent } from "./sell-event";
import { DividendEvent } from "./dividend-event";
import { JcpEvent } from "./jcp-event";
import { BonusEvent } from "./bonus-event";
import { SplitEvent } from "./split-event";
import { GroupingEvent } from "./grouping-event";
import { AmortizationEvent } from "./amortization-event";
import { AdjustmentEvent } from "./adjustment-event";
import { Position } from "./position";

interface PositionState {
  quantity: number;
  totalCost: number;
}

export class PortfolioProjector {
  project(events: FinancialEvent[]): Position[] {
    const state = new Map<string, PositionState>();

    for (const event of events) {
      this.apply(state, event);
    }

    return this.toPositions(state);
  }

  private apply(state: Map<string, PositionState>, event: FinancialEvent): void {
    if (event instanceof BuyEvent) {
      this.applyBuy(state, event);
    } else if (event instanceof SellEvent) {
      this.applySell(state, event);
    } else if (event instanceof DividendEvent) {
      this.applyDividend(state, event);
    } else if (event instanceof JcpEvent) {
      this.applyDividend(state, event);
    } else if (event instanceof BonusEvent) {
      this.applyBonus(state, event);
    } else if (event instanceof SplitEvent) {
      this.applySplit(state, event);
    } else if (event instanceof GroupingEvent) {
      this.applyGrouping(state, event);
    } else if (event instanceof AmortizationEvent) {
      this.applyAmortization(state, event);
    } else if (event instanceof AdjustmentEvent) {
      this.applyAdjustment(state, event);
    }
  }

  private getOrCreate(state: Map<string, PositionState>, assetId: string): PositionState {
    let s = state.get(assetId);
    if (!s) {
      s = { quantity: 0, totalCost: 0 };
      state.set(assetId, s);
    }
    return s;
  }

  private applyBuy(state: Map<string, PositionState>, event: BuyEvent): void {
    const s = this.getOrCreate(state, event.assetId);
    s.totalCost += event.totalCost;
    s.quantity += event.quantity;
  }

  private applySell(state: Map<string, PositionState>, event: SellEvent): void {
    const s = this.getOrCreate(state, event.assetId);
    if (s.quantity > 0) {
      if (event.quantity >= s.quantity) {
        s.totalCost = 0;
      } else {
        s.totalCost *= (s.quantity - event.quantity) / s.quantity;
      }
    }
    s.quantity -= event.quantity;
    s.totalCost = Math.round(s.totalCost * 100) / 100;
  }

  private applyDividend(state: Map<string, PositionState>, event: DividendEvent | JcpEvent): void {
    const s = this.getOrCreate(state, event.assetId);
    s.totalCost -= event.totalAmount;
    s.totalCost = Math.round(s.totalCost * 100) / 100;
  }

  private applyBonus(state: Map<string, PositionState>, event: BonusEvent): void {
    const s = this.getOrCreate(state, event.assetId);
    s.quantity += event.bonusShares;
    s.quantity = Math.round(s.quantity * 100) / 100;
  }

  private applySplit(state: Map<string, PositionState>, event: SplitEvent): void {
    const s = this.getOrCreate(state, event.assetId);
    s.quantity *= event.splitFactor;
    s.quantity = Math.round(s.quantity * 100) / 100;
  }

  private applyGrouping(state: Map<string, PositionState>, event: GroupingEvent): void {
    const s = this.getOrCreate(state, event.assetId);
    s.quantity /= event.groupingFactor;
    s.quantity = Math.round(s.quantity * 100) / 100;
  }

  private applyAmortization(state: Map<string, PositionState>, event: AmortizationEvent): void {
    const s = this.getOrCreate(state, event.assetId);
    s.totalCost -= event.totalAmount;
    s.totalCost = Math.round(s.totalCost * 100) / 100;
  }

  private applyAdjustment(state: Map<string, PositionState>, event: AdjustmentEvent): void {
    const s = this.getOrCreate(state, event.assetId);
    s.totalCost += event.amount;
    s.totalCost = Math.round(s.totalCost * 100) / 100;
  }

  private toPositions(state: Map<string, PositionState>): Position[] {
    const positions: Position[] = [];

    for (const [assetId, s] of state) {
      const ticker = Ticker.create(assetId);
      const quantity = Quantity.create(s.quantity);
      const totalCost = Money.create(s.totalCost);
      const avgCost =
        s.quantity > 0
          ? Money.create(Math.round((s.totalCost / s.quantity) * 100) / 100)
          : Money.create(0);
      positions.push(Position.create(ticker, quantity, avgCost, totalCost));
    }

    return positions;
  }
}
