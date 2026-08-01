import type { OperationSide } from "@/shared/types/portfolio";
import {
  FinancialEvent,
  BuyEvent,
  SellEvent,
  DividendEvent,
  JcpEvent,
  BonusEvent,
} from "@/core/domain/portfolio";

/**
 * Estrutura mínima necessária para criar um FinancialEvent a partir de uma
 * operação. `Operation` (completa) e `HistoryOperation` (subconjunto) são
 * atribuíveis a este tipo.
 */
export interface EventSourceOperation {
  id?: string;
  ticker: string;
  side: OperationSide;
  quantity: number;
  price: number;
  fee?: number;
  irrf?: number;
  other_costs?: number;
  metadata?: Record<string, string | number | boolean> | null;
}

/**
 * Mapeador `Operation → FinancialEvent`.
 *
 * Espelha EXATAMENTE a lógica de `opsToEvents` do teste de equivalência
 * (`src/core/tests/portfolio/legacy-equivalence.test.ts`) para garantir que
 * o domínio produz os mesmos resultados numéricos que o legado.
 *
 * Regras:
 * - buy: totalCost = qty*price + fee + irrf + other_costs (fee no custo)
 * - sell: SellEvent(qty, price)
 * - dividend: JcpEvent se metadata.tipo_provento === "jcp", senão DividendEvent
 * - bonus: BonusEvent quando metadata.bonus_ratio existe; fallback BuyEvent
 */
export function operationsToFinancialEvents(ops: EventSourceOperation[]): FinancialEvent[] {
  const events: FinancialEvent[] = [];
  for (const op of ops) {
    const pid = "portfolio-1";
    const cid = op.id ?? `generated-${events.length}`;
    switch (op.side) {
      case "buy": {
        const totalCost =
          op.quantity * op.price + (op.fee ?? 0) + (op.irrf ?? 0) + (op.other_costs ?? 0);
        const effectivePrice = totalCost / op.quantity;
        events.push(new BuyEvent(pid, cid, op.ticker, op.quantity, effectivePrice));
        break;
      }
      case "sell":
        events.push(new SellEvent(pid, cid, op.ticker, op.quantity, op.price));
        break;
      case "dividend":
        if (op.metadata?.tipo_provento === "jcp") {
          events.push(new JcpEvent(pid, cid, op.ticker, op.quantity, op.price));
        } else {
          events.push(new DividendEvent(pid, cid, op.ticker, op.quantity, op.price));
        }
        break;
      case "bonus":
        if (op.metadata?.bonus_ratio && typeof op.metadata.bonus_ratio === "number") {
          events.push(
            new BonusEvent(
              pid,
              cid,
              op.ticker,
              op.quantity / op.metadata.bonus_ratio,
              op.metadata.bonus_ratio,
            ),
          );
        } else {
          events.push(new BuyEvent(pid, cid, op.ticker, op.quantity, op.price));
        }
        break;
    }
  }
  return events;
}
