import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Building2, Plus, PiggyBank, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/format";
import { useSession } from "@/hooks/use-session";
import { FakeBankAccountRepository } from "@/infrastructure/repositories/finance";

export const Route = createFileRoute("/_authenticated/finance/contas")({
  head: () => ({
    meta: [{ title: "Contas — Gestão Financeira" }, { name: "robots", content: "noindex" }],
  }),
  component: ContasPage,
});

function ContasPage() {
  const { user } = useSession();
  const [repo] = useState(() => {
    const r = new FakeBankAccountRepository();
    r.seed();
    return r;
  });
  const [accounts, setAccounts] = useState<
    {
      id: string;
      name: string;
      institution: string;
      type: string;
      balance: number;
      currency: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useMemo(async () => {
    const list = await repo.findByUserId(user?.id ?? "dev");
    setAccounts(
      list.map((a) => ({
        id: a.id.value,
        name: a.name,
        institution: a.institution,
        type: a.type,
        balance: a.balance,
        currency: a.currency,
      })),
    );
    setLoading(false);
  }, [repo, user]);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <EmptyState
        icon={Building2}
        title="Nenhuma conta bancária"
        description="Adicione suas contas para começar a controlar seu dinheiro."
        action={
          <Button className="gap-2">
            <Plus className="size-4" /> Adicionar conta
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{accounts.length} conta(s) cadastrada(s)</p>
        <Button size="sm" className="gap-2">
          <Plus className="size-4" /> Nova conta
        </Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {accounts.map((acc) => (
          <div key={acc.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold">{acc.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {acc.institution} · {acc.type}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
            <p className="mt-3 tabular text-xl font-bold">{formatBRL(acc.balance)}</p>
            <p className="text-[10px] uppercase text-muted-foreground">{acc.currency}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
