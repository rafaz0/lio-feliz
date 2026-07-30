import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { formatBRL, formatDate } from "@/lib/format";
import { useSession } from "@/hooks/use-session";
import { FakeIncomeRepository } from "@/infrastructure/repositories/finance";

export const Route = createFileRoute("/_authenticated/finance/receitas")({
  head: () => ({
    meta: [{ title: "Receitas — Gestão Financeira" }, { name: "robots", content: "noindex" }],
  }),
  component: ReceitasPage,
});

function ReceitasPage() {
  const { user } = useSession();
  const items = useMemo(() => {
    const repo = new FakeIncomeRepository();
    repo.seed();
    return repo.findByUserId(user?.id ?? "dev");
  }, [user]);

  if (items.length === 0) {
    return (
      <EmptyState
        icon={TrendingUp}
        title="Nenhuma receita"
        description="Registre suas receitas para acompanhar seus ganhos."
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
              <th className="px-4 py-2.5 text-left font-medium">Recorrência</th>
              <th className="px-4 py-2.5 text-right font-medium">Valor</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id.value} className="border-t border-border hover:bg-surface">
                <td className="px-4 py-2.5 text-muted-foreground">
                  {formatDate(item.date.toISOString())}
                </td>
                <td className="px-4 py-2.5 font-medium">{item.description}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{item.category}</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {item.recurrence === "none"
                    ? "Eventual"
                    : item.recurrence === "monthly"
                      ? "Mensal"
                      : "Anual"}
                </td>
                <td className="tabular px-4 py-2.5 text-right font-medium text-positive">
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
