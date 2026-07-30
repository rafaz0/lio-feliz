import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { TrendingDown } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { formatBRL, formatDate } from "@/lib/format";
import { useSession } from "@/hooks/use-session";
import { FakeExpenseRepository } from "@/infrastructure/repositories/finance";

export const Route = createFileRoute("/_authenticated/finance/despesas")({
  head: () => ({
    meta: [{ title: "Despesas — Gestão Financeira" }, { name: "robots", content: "noindex" }],
  }),
  component: DespesasPage,
});

function DespesasPage() {
  const { user } = useSession();
  const items = useMemo(() => {
    const repo = new FakeExpenseRepository();
    repo.seed();
    return repo.findByUserId(user?.id ?? "dev");
  }, [user]);

  if (items.length === 0) {
    return (
      <EmptyState
        icon={TrendingDown}
        title="Nenhuma despesa"
        description="Registre suas despesas para controlar seus gastos."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="scroll-shadow">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="bg-surface-2 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium">Vencimento</th>
              <th className="px-4 py-2.5 text-left font-medium">Descrição</th>
              <th className="px-4 py-2.5 text-left font-medium">Categoria</th>
              <th className="px-4 py-2.5 text-center font-medium">Pago</th>
              <th className="px-4 py-2.5 text-right font-medium">Valor</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id.value} className="border-t border-border hover:bg-surface">
                <td className="px-4 py-2.5 text-muted-foreground">
                  {formatDate(item.dueDate.toISOString())}
                </td>
                <td className="px-4 py-2.5 font-medium">{item.description}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{item.category}</td>
                <td className="px-4 py-2.5 text-center">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-medium uppercase ${item.paidAt ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative"}`}
                  >
                    {item.paidAt ? "Sim" : "Não"}
                  </span>
                </td>
                <td className="tabular px-4 py-2.5 text-right font-medium text-negative">
                  {formatBRL(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
