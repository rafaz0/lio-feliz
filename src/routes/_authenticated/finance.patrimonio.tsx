import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Landmark, Wallet, CreditCard, TrendingUp, TrendingDown } from "lucide-react";
import { formatBRL } from "@/lib/format";
import { useSession } from "@/hooks/use-session";
import {
  FakeBankAccountRepository,
  FakeCashTransactionRepository,
  FakeDebtRepository,
  FakeIncomeRepository,
  FakeExpenseRepository,
} from "@/infrastructure/repositories/finance";
import { GetGlobalWealthService, getPortfolioSummaryStub } from "@/application/services/finance";

export const Route = createFileRoute("/_authenticated/finance/patrimonio")({
  head: () => ({
    meta: [
      { title: "Patrimônio Global — Gestão Financeira" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PatrimonioPage,
});

function PatrimonioPage() {
  const { user } = useSession();
  const wealth = useMemo(() => {
    const svc = new GetGlobalWealthService(
      new FakeBankAccountRepository(),
      new FakeCashTransactionRepository(),
      new FakeIncomeRepository(),
      new FakeExpenseRepository(),
      new FakeDebtRepository(),
      getPortfolioSummaryStub,
    );
    return svc.Execute({ type: "GetGlobalWealthQuery", userId: user?.id ?? "dev" });
  }, [user]);

  const data = wealth as unknown as {
    totalCash: number;
    totalInvested: number;
    totalDebt: number;
    netWorth: number;
    accountCount: number;
    debtCount: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    monthlyNet: number;
  } | null;

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Wallet className="size-3.5" /> Caixa
          </div>
          <p className="tabular mt-2 text-2xl font-bold text-emerald-500">
            {formatBRL(data?.totalCash ?? 0)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Landmark className="size-3.5" /> Investido
          </div>
          <p className="tabular mt-2 text-2xl font-bold">{formatBRL(data?.totalInvested ?? 0)}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <CreditCard className="size-3.5" /> Dívidas
          </div>
          <p className="tabular mt-2 text-2xl font-bold text-rose-500">
            {formatBRL(data?.totalDebt ?? 0)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="size-3.5" /> Patrimônio Líquido
          </div>
          <p className="tabular mt-2 text-2xl font-bold">{formatBRL(data?.netWorth ?? 0)}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="size-3.5" /> Receitas do mês
          </div>
          <p className="tabular mt-2 text-2xl font-bold text-emerald-500">
            {formatBRL(data?.monthlyIncome ?? 0)}
          </p>
          <p className="text-[10px] text-muted-foreground">
            Contas: {data?.accountCount ?? 0} · Dívidas: {data?.debtCount ?? 0}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <TrendingDown className="size-3.5" /> Despesas do mês
          </div>
          <p className="tabular mt-2 text-2xl font-bold text-rose-500">
            {formatBRL(data?.monthlyExpenses ?? 0)}
          </p>
          <p
            className={`text-[10px] ${(data?.monthlyNet ?? 0) >= 0 ? "text-emerald-500" : "text-rose-500"}`}
          >
            Saldo mensal: {formatBRL(Math.abs(data?.monthlyNet ?? 0))}{" "}
            {(data?.monthlyNet ?? 0) >= 0 ? "positivo" : "negativo"}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-dashed border-border bg-card p-6 text-center">
        <Landmark className="mx-auto mb-2 size-8 text-muted-foreground/40" strokeWidth={1.5} />
        <h3 className="text-sm font-medium">Patrimônio Global</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          A consolidação com dados reais da Carteira estará disponível quando a integração estiver
          ativada.
        </p>
      </div>
    </div>
  );
}
