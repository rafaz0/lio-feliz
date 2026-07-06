import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle, Download } from "lucide-react";
import { listOperations } from "@/lib/operations.functions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatBRL } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/irpf/")({
  head: () => ({
    meta: [
      { title: "IRPF Helper — Investidor Pro" },
      {
        name: "description",
        content:
          "Apuração mensal de ganho de capital para IRPF: ações (15%), FIIs (20%), day-trade, isenção R$ 20k e compensação de prejuízos.",
      },
    ],
  }),
  component: IrpfHelper,
});

const FII_RE = /^[A-Z0-9]{4,5}11$/;

interface MonthSummary {
  month: string;
  ticker: string;
  type: "stock" | "fii";
  totalBuy: number;
  totalSell: number;
  netGain: number;
  taxRate: number;
  taxDue: number;
  exempt: boolean;
  cumNet: number;
}

function isFii(ticker: string) {
  return FII_RE.test(ticker);
}

function classifyDayTrade(
  ops: { traded_at: string; side: "buy" | "sell"; quantity: number; price: number }[],
) {
  return ops.filter(
    (op, i, arr) => i > 0 && op.side === "sell" && op.traded_at === arr[i - 1]?.traded_at,
  );
}

function splitIntoMonths(ops: { traded_at: string }[]) {
  const months = new Set<string>();
  for (const op of ops) months.add(op.traded_at.slice(0, 7));
  return Array.from(months).sort();
}

function calcGainPerTicker(
  ops: { traded_at: string; side: "buy" | "sell"; quantity: number; price: number }[],
) {
  const sorted = [...ops].sort((a, b) => a.traded_at.localeCompare(b.traded_at));
  let qty = 0;
  let avgPrice = 0;
  let totalGain = 0;

  for (const op of sorted) {
    if (op.side === "buy") {
      const newQty = op.quantity;
      avgPrice = (avgPrice * qty + op.price * newQty) / (qty + newQty);
      qty += newQty;
    } else {
      const sellQty = Math.min(op.quantity, qty);
      if (sellQty > 0 && avgPrice > 0) {
        totalGain += (op.price - avgPrice) * sellQty;
      }
      qty -= sellQty;
      if (qty <= 0) {
        qty = 0;
        avgPrice = 0;
      }
    }
  }

  return totalGain;
}

function calcMonthSummaries(
  ops: {
    ticker: string;
    traded_at: string;
    side: "buy" | "sell";
    quantity: number;
    price: number;
  }[],
): MonthSummary[] {
  const months = splitIntoMonths(ops);
  const summaries: MonthSummary[] = [];
  const cumByType: Record<string, number> = { stock: 0, fii: 0 };

  for (const month of months) {
    const monthOps = ops.filter((o) => o.traded_at.startsWith(month));
    const tickers = [...new Set(monthOps.map((o) => o.ticker))];

    for (const ticker of tickers) {
      const tickerOps = monthOps.filter((o) => o.ticker === ticker);
      const type = isFii(ticker) ? "fii" : "stock";
      const totalBuy = tickerOps
        .filter((o) => o.side === "buy")
        .reduce((s, o) => s + o.quantity * o.price, 0);
      const totalSell = tickerOps
        .filter((o) => o.side === "sell")
        .reduce((s, o) => s + o.quantity * o.price, 0);
      const netGain = calcGainPerTicker(tickerOps);
      const taxRate = type === "fii" ? 0.2 : 0.15;
      const isDayTrade = classifyDayTrade(tickerOps).length > 0;
      const effectiveRate = isDayTrade ? 0.15 : taxRate;
      const exempt = type === "stock" && totalSell <= 20_000;
      cumByType[type] += netGain;
      const taxable = cumByType[type] > 0 ? netGain : 0;

      summaries.push({
        month,
        ticker,
        type,
        totalBuy,
        totalSell,
        netGain,
        taxRate: effectiveRate,
        taxDue: exempt || taxable <= 0 ? 0 : taxable * effectiveRate,
        exempt,
        cumNet: cumByType[type],
      });
    }
  }

  return summaries;
}

function calcTotals(summaries: MonthSummary[]) {
  return {
    totalSell: summaries.reduce((s, i) => s + i.totalSell, 0),
    totalGain: summaries.reduce((s, i) => s + (i.netGain > 0 ? i.netGain : 0), 0),
    totalLoss: summaries.reduce((s, i) => s + (i.netGain < 0 ? i.netGain : 0), 0),
    totalTax: summaries.reduce((s, i) => s + i.taxDue, 0),
    months: [...new Set(summaries.map((s) => s.month))].length,
  };
}

function exportToCsv(summaries: MonthSummary[]) {
  const header = "Mês,Ticker,Tipo,Total Compras,Total Vendas,Resultado (%)";

  const rows = summaries.map((s) =>
    [
      s.month,
      s.ticker,
      s.type === "fii" ? "FII" : "Ação",
      formatBRL(s.totalBuy),
      formatBRL(s.totalSell),
      s.netGain.toFixed(2),
      s.taxDue.toFixed(2),
    ].join(","),
  );

  const csv = header + "\n" + rows.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "irpf_operacoes.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function IrpfHelper() {
  const list = useServerFn(listOperations);
  const { data: ops, isLoading } = useQuery({
    queryKey: ["operations"],
    queryFn: () => list(),
  });

  if (isLoading || !ops) {
    return (
      <div className="mx-auto max-w-5xl space-y-4 p-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (ops.length === 0) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <h1 className="mb-2 text-2xl font-bold">Ajuda IRPF</h1>
        <p className="text-muted-foreground">
          Nenhuma operação encontrada. Adicione operações na página de Carteira para usar esta
          ferramenta.
        </p>
      </div>
    );
  }

  const summaries = calcMonthSummaries(ops);
  const totals = calcTotals(summaries);
  const months = [...new Set(summaries.map((s) => s.month))].sort().reverse();

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-start justify-between">
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

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
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

      {months.map((month) => {
        const monthSum = summaries.filter((s) => s.month === month);
        const monthTotalSell = monthSum.reduce((s, i) => s + i.totalSell, 0);
        const monthGain = monthSum.filter((s) => s.netGain > 0).reduce((s, i) => s + i.netGain, 0);
        const monthTax = monthSum.reduce((s, i) => s + i.taxDue, 0);
        const anyExempt = monthSum.some((s) => s.exempt);

        return (
          <details key={month} className="group mb-2 rounded-lg border border-border">
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
                          ),
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
