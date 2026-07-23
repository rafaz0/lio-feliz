import type { ITaxStatementRepository } from "@/application/ports/tax-statement-repository";
import type { TaxStatement } from "@/core/domain/tax/tax-statement";
import type { TaxEvent } from "@/core/domain/tax/tax-event";

export class InMemoryTaxStatementRepository implements ITaxStatementRepository {
  private statements: Map<string, TaxStatement> = new Map();
  private events: TaxEvent[] = [];

  async save(statement: TaxStatement): Promise<void> {
    const key = `${statement.portfolioId}-${statement.ano}`;
    this.statements.set(key, statement);
  }

  async findByAno(portfolioId: string, ano: number): Promise<TaxStatement | null> {
    const key = `${portfolioId}-${ano}`;
    return this.statements.get(key) ?? null;
  }

  async findByAtivo(
    portfolioId: string,
    ticker: string,
    ano: number,
  ): Promise<TaxStatement | null> {
    const key = `${portfolioId}-${ano}`;
    const statement = this.statements.get(key);
    if (!statement) return null;

    const filteredEvents = statement.taxEvents.filter((e) => e.ticker === ticker);
    if (filteredEvents.length === 0) return null;

    return statement;
  }

  async findAll(portfolioId: string): Promise<TaxStatement[]> {
    return Array.from(this.statements.values()).filter((s) => s.portfolioId === portfolioId);
  }

  async saveTaxEvents(events: TaxEvent[]): Promise<void> {
    this.events.push(...events);
  }

  reset(): void {
    this.statements.clear();
    this.events = [];
  }
}
