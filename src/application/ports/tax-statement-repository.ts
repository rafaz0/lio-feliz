import type { TaxStatement } from "@/core/domain/tax/tax-statement";
import type { TaxEvent } from "@/core/domain/tax/tax-event";

export interface ITaxStatementRepository {
  save(statement: TaxStatement): Promise<void>;
  findByAno(portfolioId: string, ano: number): Promise<TaxStatement | null>;
  findByAtivo(portfolioId: string, ticker: string, ano: number): Promise<TaxStatement | null>;
  findAll(portfolioId: string): Promise<TaxStatement[]>;
  saveTaxEvents(events: TaxEvent[]): Promise<void>;
}
