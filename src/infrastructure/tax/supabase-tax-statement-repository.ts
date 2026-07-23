import type { ITaxStatementRepository } from "@/application/ports/tax-statement-repository";
import type { TaxStatement, TaxStatementId } from "@/core/domain/tax/tax-statement";
import type { TaxEvent } from "@/core/domain/tax/tax-event";
import type { TaxLot } from "@/core/domain/tax/tax-lot";
import type { AnnualTaxConsolidation, MonthlyTaxSummary } from "@/core/domain/tax/tax-statement";

interface DeclaracaoRow {
  id: string;
  portfolio_id: string;
  ano: number;
  lotes: unknown;
  eventos: unknown;
  consolidado: unknown;
  created_at: string;
  updated_at: string;
}

export class SupabaseTaxStatementRepository implements ITaxStatementRepository {
  constructor(
    private readonly supabase: {
      from: (table: string) => {
        insert: (data: unknown) => { select: () => Promise<{ data: unknown }> };
        upsert: (data: unknown) => { select: () => Promise<{ data: unknown }> };
        select: () => { eq: (col: string, val: unknown) => Promise<{ data: unknown[] | null }> };
        update: (data: unknown) => {
          eq: (col: string, val: unknown) => Promise<{ data: unknown | null }>;
        };
        delete: () => { eq: (col: string, val: unknown) => Promise<{ data: unknown | null }> };
      };
    },
  ) {}

  async save(statement: TaxStatement): Promise<void> {
    const payload = {
      id: statement.id.value,
      portfolio_id: statement.portfolioId,
      ano: statement.ano,
      lotes: JSON.stringify(statement.taxLots),
      eventos: JSON.stringify(statement.taxEvents),
      consolidado: statement.consolidation ? JSON.stringify(statement.consolidation) : null,
    };

    await this.supabase.from("declaracoes_fiscais").upsert(payload).select();
  }

  async findByAno(portfolioId: string, ano: number): Promise<TaxStatement | null> {
    const result = await this.supabase
      .from("declaracoes_fiscais")
      .select()
      .eq("portfolio_id", portfolioId);

    const rows = (result.data ?? []) as DeclaracaoRow[];
    const row = rows.find((r) => r.ano === ano);

    if (!row) return null;

    return this.rowToStatement(row);
  }

  async findByAtivo(
    portfolioId: string,
    _ticker: string,
    ano: number,
  ): Promise<TaxStatement | null> {
    return this.findByAno(portfolioId, ano);
  }

  async findAll(portfolioId: string): Promise<TaxStatement[]> {
    const result = await this.supabase
      .from("declaracoes_fiscais")
      .select()
      .eq("portfolio_id", portfolioId);

    const rows = (result.data ?? []) as DeclaracaoRow[];
    return rows.map((r) => this.rowToStatement(r));
  }

  async saveTaxEvents(_events: TaxEvent[]): Promise<void> {
    // Eventos individuais são salvos como parte da declaração
  }

  private rowToStatement(row: DeclaracaoRow): TaxStatement {
    const lotes = row.lotes ? (JSON.parse(JSON.stringify(row.lotes)) as TaxLot[]) : [];
    const consolidado = row.consolidado
      ? (JSON.parse(JSON.stringify(row.consolidado)) as AnnualTaxConsolidation)
      : null;

    return TaxStatement.reconstitute(
      TaxStatementId.create(row.id),
      row.portfolio_id,
      row.ano,
      [],
      lotes,
      consolidado,
      new Date(row.created_at),
      new Date(row.updated_at),
    );
  }
}
