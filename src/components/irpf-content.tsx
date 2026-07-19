import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle, Download } from "lucide-react";
import { listOperations } from "@/lib/operations.functions";
import type { AssetType } from "@/lib/portfolio";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatBRL } from "@/lib/format";
import { calcMonthSummaries, calcTotals, classifyDayTrade, exportToCsv } from "@/lib/tax/rules";
import type { MonthSummary } from "@/lib/tax/rules";

export function IrpfContent() {
  const list = useServerFn(listOperations);
  const { data: ops, isLoading } = useQuery({
    queryKey: ["operations"],
    queryFn: () => list(),
  });

  if (isLoading || !ops) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (ops.length === 0) {
    return (
      <div>
        <h1 className="mb-2 text-2xl font-bold">Ajuda IRPF</h1>
        <p className="text-muted-foreground">
          Nenhuma operação encontrada. Adicione operações na página de Carteira para usar esta
          ferramenta.
        </p>
      </div>
    );
  }

  const buySellOps = ops.filter((o) => o.side === "buy" || o.side === "sell") as {
    ticker: string;
    asset_type?: AssetType;
    traded_at: string;
    side: "buy" | "sell";
    quantity: number;
    price: number;
  }[];
  const summaries = calcMonthSummaries(buySellOps);
  const totals = calcTotals(summaries);
  const months = [...new Set(summaries.map((s) => s.month))].sort().reverse();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ajuda IRPF</h1>
          <p className="text-sm text-muted-foreground">
            Apuração mensal de ganho de capital — baseada nas suas operações
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => exportToCsv(summaries)}
        >
          <Download className="size-4" /> Exportar CSV
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-xs text-muted-foreground">Total vendido</div>
          <div className="text-xl font-bold">{formatBRL(totals.totalSell)}</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-xs text-muted-foreground">Ganho líquido</div>
          <div className="text-xl font-bold text-green-600">{formatBRL(totals.totalGain)}</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-xs text-muted-foreground">Prejuízo acumulado</div>
          <div className="text-xl font-bold text-red-600">
            {formatBRL(Math.abs(totals.totalLoss))}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-xs text-muted-foreground">IR estimado</div>
          <div className="text-xl font-bold text-amber-600">{formatBRL(totals.totalTax)}</div>
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
        <div className="mb-1 flex items-center gap-2 font-medium">
          <AlertTriangle className="size-4" /> Atenção
        </div>
        <ul className="ml-5 list-disc space-y-1 text-xs">
          <li>
            Ações: alíquota de 15% sobre o ganho líquido. Isento se vendas no mês &le; R$ 20.000.
          </li>
          <li>FIIs: alíquota de 20% sobre o ganho líquido. Não há isenção por valor.</li>
          <li>Day-trade: alíquota de 15% sobre o ganho líquido (sem isenção).</li>
          <li>Prejuízos de meses anteriores compensam ganhos futuros dentro da mesma categoria.</li>
          <li>
            Esta ferramenta é uma estimativa. Consulte um contador para sua declaração oficial.
          </li>
        </ul>
      </div>

      {/* Annual summary */}
      <section className="rounded-lg border border-border bg-card p-5">
        <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Resumo Anual
        </div>
        <div className="space-y-3">
          {Array.from(new Set(summaries.map((s) => s.month.slice(0, 4))))
            .sort()
            .reverse()
            .map((year) => {
              const yearSum = summaries.filter((s) => s.month.startsWith(year));
              const yearGain = yearSum
                .filter((s) => s.netGain > 0)
                .reduce((a, b) => a + b.netGain, 0);
              const yearLoss = yearSum
                .filter((s) => s.netGain < 0)
                .reduce((a, b) => a + b.netGain, 0);
              const yearTax = yearSum.reduce((s, i) => s + i.taxDue, 0);
              return (
                <div
                  key={year}
                  className="flex items-center justify-between rounded-md bg-surface p-3 text-sm"
                >
                  <span className="font-semibold">{year}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">
                      Ganho:{" "}
                      <span className="text-positive font-medium">{formatBRL(yearGain)}</span>
                    </span>
                    {yearLoss < 0 && (
                      <span className="text-muted-foreground">
                        Prejuízo:{" "}
                        <span className="text-negative font-medium">{formatBRL(yearLoss)}</span>
                      </span>
                    )}
                    <span className="text-muted-foreground">
                      IR devido:{" "}
                      <span className="text-amber-600 font-medium">{formatBRL(yearTax)}</span>
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* Declaration checklist */}
      <section className="rounded-lg border border-border bg-card p-5">
        <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Para a declaração anual (Bens e Direitos)
        </div>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-chart-1" />
            <span>
              <strong>Bens e Direitos:</strong> Informe cada ativo pelo seu valor de aquisição
              (custo total de compra) na data-base de 31/12. Códigos na ficha de Bens e Direitos: 31
              (Ações), 32 (FIIs), 33 (BDRs/ETFs), 99 (Cripto), 78 (Renda Fixa).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-chart-2" />
            <span>
              <strong>Rendimentos Isentos (Dividendos):</strong> Os dividendos recebidos são isentos
              de IR e devem ser informados na ficha "Rendimentos Isentos e Não Tributáveis", linha
              09 (Lucros e dividendos).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-chart-3" />
            <span>
              <strong>Ganho de Capital (Vendas):</strong> Utilize o programa GCAP (Ganho de Capital)
              da Receita Federal para apurar o imposto. Alíquotas: 15% para ações (com isenção até
              R$ 20k em vendas/mês) e 20% para FIIs (sem isenção).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-chart-4" />
            <span>
              <strong>Prejuízos:</strong> Prejuízos de anos anteriores podem compensar ganhos
              futuros na mesma categoria (ações ou FIIs), tanto no mensal quanto no anual.
            </span>
          </li>
        </ul>
      </section>

      {months.map((month) => {
        const monthSum = summaries.filter((s) => s.month === month);
        const monthTotalSell = monthSum.reduce((s, i) => s + i.totalSell, 0);
        const monthGain = monthSum.filter((s) => s.netGain > 0).reduce((s, i) => s + i.netGain, 0);
        const monthTax = monthSum.reduce((s, i) => s + i.taxDue, 0);
        const anyExempt = monthSum.some((s) => s.exempt);

        return (
          <details key={month} className="group rounded-lg border border-border">
            <summary className="flex cursor-pointer items-center justify-between p-4 hover:bg-surface">
              <div className="flex items-center gap-3">
                <span className="font-semibold">{month}</span>
                <span className="text-xs text-muted-foreground">{monthSum.length} ativos</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span>Vendido: {formatBRL(monthTotalSell)}</span>
                <span className={monthGain >= 0 ? "text-green-600" : "text-red-600"}>
                  {monthGain >= 0 ? "+" : ""}
                  {formatBRL(monthGain)}
                </span>
                {anyExempt && (
                  <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-200">
                    Isento
                  </span>
                )}
                <span className="text-amber-600">{formatBRL(monthTax)}</span>
              </div>
            </summary>
            <div className="border-t border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground">
                    <th className="px-4 py-2 text-left">Ticker</th>
                    <th className="px-4 py-2 text-left">Tipo</th>
                    <th className="px-4 py-2 text-right">Comprou</th>
                    <th className="px-4 py-2 text-right">Vendeu</th>
                    <th className="px-4 py-2 text-right">Resultado</th>
                    <th className="px-4 py-2 text-right">Alíquota</th>
                    <th className="px-4 py-2 text-right">IR Devido</th>
                  </tr>
                </thead>
                <tbody>
                  {monthSum.map((s) => (
                    <tr key={s.month + s.ticker} className="border-b border-border last:border-0">
                      <td className="px-4 py-2 font-medium">{s.ticker}</td>
                      <td className="px-4 py-2 text-xs text-muted-foreground">
                        {s.type === "fii" ? "FII" : "Ação"}
                        {classifyDayTrade(
                          ops.filter(
                            (o) => o.traded_at.startsWith(s.month) && o.ticker === s.ticker,
                          ) as {
                            traded_at: string;
                            side: "buy" | "sell";
                            quantity: number;
                            price: number;
                          }[],
                        ).length > 0 && (
                          <span className="ml-1 rounded bg-purple-100 px-1 py-0.5 text-[10px] text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                            DT
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums">{formatBRL(s.totalBuy)}</td>
                      <td className="px-4 py-2 text-right tabular-nums">
                        {formatBRL(s.totalSell)}
                      </td>
                      <td
                        className={`px-4 py-2 text-right tabular-nums ${s.netGain >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {s.netGain >= 0 ? "+" : ""}
                        {formatBRL(s.netGain)}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums">
                        {s.exempt ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="cursor-help underline decoration-dotted">
                                Isento
                              </TooltipTrigger>
                              <TooltipContent>Vendas &le; R$ 20.000 no mês</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          `${(s.taxRate * 100).toFixed(0)}%`
                        )}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums text-amber-600">
                        {formatBRL(s.taxDue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        );
      })}
    </div>
  );
}
