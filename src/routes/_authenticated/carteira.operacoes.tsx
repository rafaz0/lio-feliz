import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteOperation, listOperations } from "@/lib/operations.functions";
import { AddOperationDialog } from "@/components/add-operation-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatBRL, formatDate, formatQty } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/carteira/operacoes")({
  head: () => ({
    meta: [
      { title: "Operações — Investidor Pro" },
      {
        name: "description",
        content:
          "Histórico de operações da sua carteira: compras, vendas e dividendos registrados.",
      },
    ],
  }),
  component: OperationsPage,
});

function OperationsPage() {
  const list = useServerFn(listOperations);
  const del = useServerFn(deleteOperation);
  const qc = useQueryClient();

  const { data: ops, isLoading } = useQuery({
    queryKey: ["operations"],
    queryFn: () => list(),
  });

  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("Operação excluída");
      qc.invalidateQueries({ queryKey: ["operations"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Histórico de operações</h2>
          <p className="text-sm text-muted-foreground">
            Todas as compras e vendas registradas na sua conta.
          </p>
        </div>
        <AddOperationDialog
          trigger={
            <Button className="gap-2">
              <Plus className="size-4" /> Nova operação
            </Button>
          }
        />
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-12" />
          ))}
        </div>
      ) : !ops || ops.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
          <p className="text-sm text-muted-foreground">Nenhuma operação registrada ainda.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-surface-2 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">Data</th>
                  <th className="px-4 py-2.5 text-left font-medium">Ativo</th>
                  <th className="px-4 py-2.5 text-left font-medium">Tipo</th>
                  <th className="px-4 py-2.5 text-right font-medium">Qtd</th>
                  <th className="px-4 py-2.5 text-right font-medium">Preço</th>
                  <th className="px-4 py-2.5 text-right font-medium">Total</th>
                  <th className="px-4 py-2.5 text-left font-medium">Origem</th>
                  <th className="w-10 px-2 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {ops.map((o) => (
                  <tr key={o.id} className="border-t border-border hover:bg-surface">
                    <td className="px-4 py-2.5 text-muted-foreground">{formatDate(o.traded_at)}</td>
                    <td className="px-4 py-2.5">
                      <Link
                        to="/ativo/$ticker"
                        params={{ ticker: o.ticker }}
                        className="font-semibold hover:text-primary"
                      >
                        {o.ticker}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={
                          "rounded px-2 py-0.5 text-xs font-medium " +
                          (o.side === "buy"
                            ? "bg-positive/15 text-positive"
                            : "bg-negative/15 text-negative")
                        }
                      >
                        {o.side === "buy" ? "Compra" : "Venda"}
                      </span>
                    </td>
                    <td className="tabular px-4 py-2.5 text-right">{formatQty(o.quantity)}</td>
                    <td className="tabular px-4 py-2.5 text-right">{formatBRL(o.price)}</td>
                    <td className="tabular px-4 py-2.5 text-right font-medium">
                      {formatBRL(o.quantity * o.price)}
                    </td>
                    <td className="px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground">
                      {o.source === "manual" ? "manual" : o.source}
                    </td>
                    <td className="px-2 py-2.5 text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8 text-muted-foreground hover:text-destructive"
                        onClick={() => {
                          if (confirm("Excluir esta operação?")) delMut.mutate(o.id);
                        }}
                        disabled={delMut.isPending}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
