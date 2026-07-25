import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { CreditCard } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { formatBRL } from "@/lib/format";
import { useSession } from "@/hooks/use-session";
import { FakeDebtRepository } from "@/infrastructure/repositories/finance";
import { debtTypeLabel } from "@/core/domain/finance";

export const Route = createFileRoute("/_authenticated/finance/dividas")({
  head: () => ({
    meta: [{ title: "Dívidas — Gestão Financeira" }, { name: "robots", content: "noindex" }],
  }),
  component: DividasPage,
});

function DividasPage() {
  const { user } = useSession();
  const items = useMemo(() => {
    const repo = new FakeDebtRepository();
    repo.seed();
    return repo.findByUserId(user?.id ?? "dev");
  }, [user]);

  const totalDebt = items.reduce((s, d) => s + d.outstandingBalance, 0);
  const totalMonthly = items.reduce((s, d) => s + d.monthlyPayment, 0);

  if (items.length === 0) {
    return (
      <EmptyState
        icon={CreditCard}
        title="Nenhuma dívida cadastrada"
        description="Adicione suas dívidas para acompanhar seu endividamento."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Dívida total</p>
          <p className="tabular mt-1 text-2xl font-bold text-negative">{formatBRL(totalDebt)}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Total mensal</p>
          <p className="tabular mt-1 text-2xl font-bold">{formatBRL(totalMonthly)}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-surface-2 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Descrição</th>
                <th className="px-4 py-2.5 text-left font-medium">Tipo</th>
                <th className="px-4 py-2.5 text-left font-medium">Instituição</th>
                <th className="px-4 py-2.5 text-right font-medium">Total</th>
                <th className="px-4 py-2.5 text-right font-medium">Saldo</th>
                <th className="px-4 py-2.5 text-right font-medium">Parcela</th>
                <th className="px-4 py-2.5 text-right font-medium">Juros</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id.value} className="border-t border-border hover:bg-surface">
                  <td className="px-4 py-2.5 font-medium">{item.description}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{debtTypeLabel(item.type)}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{item.institution ?? "—"}</td>
                  <td className="tabular px-4 py-2.5 text-right">{formatBRL(item.totalAmount)}</td>
                  <td className="tabular px-4 py-2.5 text-right font-medium text-negative">
                    {formatBRL(item.outstandingBalance)}
                  </td>
                  <td className="tabular px-4 py-2.5 text-right">
                    {formatBRL(item.monthlyPayment)}
                  </td>
                  <td className="tabular px-4 py-2.5 text-right">
                    {item.interestRate ? `${item.interestRate}%` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
