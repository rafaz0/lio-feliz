import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowDownUp } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { formatBRL, formatDate } from "@/lib/format";
import { useSession } from "@/hooks/use-session";
import { FakeCashTransactionRepository } from "@/infrastructure/repositories/finance";

export const Route = createFileRoute("/_authenticated/finance/movimentacoes")({
  head: () => ({
    meta: [{ title: "Movimentações — Gestão Financeira" }, { name: "robots", content: "noindex" }],
  }),
  component: MovimentacoesPage,
});

function MovimentacoesPage() {
  const { user } = useSession();
  const txns = useMemo(() => {
    const repo = new FakeCashTransactionRepository();
    repo.seed();
    return repo.findByUserId(user?.id ?? "dev");
  }, [user]);

  if (txns.length === 0) {
    return (
      <EmptyState
        icon={ArrowDownUp}
        title="Nenhuma movimentação"
        description="Suas transações aparecerão aqui."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="scroll-shadow">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-surface-2 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium">Data</th>
              <th className="px-4 py-2.5 text-left font-medium">Descrição</th>
              <th className="px-4 py-2.5 text-left font-medium">Categoria</th>
              <th className="px-4 py-2.5 text-left font-medium">Tipo</th>
              <th className="px-4 py-2.5 text-right font-medium">Valor</th>
            </tr>
          </thead>
          <tbody>
            {txns.map((tx) => (
              <tr key={tx.id.value} className="border-t border-border hover:bg-surface">
                <td className="px-4 py-2.5 text-muted-foreground">
                  {formatDate(tx.date.toISOString())}
                </td>
                <td className="px-4 py-2.5 font-medium">{tx.description}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{tx.category ?? "—"}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-medium uppercase ${tx.type === "income" ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative"}`}
                  >
                    {tx.type === "income" ? "Entrada" : "Saída"}
                  </span>
                </td>
                <td
                  className={`tabular px-4 py-2.5 text-right font-medium ${tx.type === "income" ? "text-positive" : "text-negative"}`}
                >
                  {tx.type === "income" ? "+" : "-"}
                  {formatBRL(tx.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
