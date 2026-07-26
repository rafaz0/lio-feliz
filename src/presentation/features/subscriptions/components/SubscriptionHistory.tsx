import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import { SUBSCRIPTION_QUERY_KEYS } from "../queries";

interface SubscriptionHistoryProps {
  userId: string | undefined;
}

export function SubscriptionHistory({ userId }: SubscriptionHistoryProps) {
  const dispatcher = useDispatcher();

  const { data, isLoading } = useQuery({
    queryKey: SUBSCRIPTION_QUERY_KEYS.historico(userId ?? ""),
    enabled: Boolean(userId),
    queryFn: async () => {
      const r = await dispatcher.DispatchQuery({
        type: "ConsultarHistoricoAssinaturaQuery",
        userId,
      } as IQuery);
      if (r instanceof Error) throw r;
      return r as {
        subscriptions: Array<{
          subscriptionId: string;
          planName: string;
          status: string;
          startDate: string;
          endDate: string | null;
        }>;
        billingCycles: Array<{
          id: string;
          periodStart: string;
          periodEnd: string;
          amount: number;
          status: string;
        }>;
      };
    },
  });

  if (isLoading) {
    return (
      <div className="py-4 text-center text-sm text-muted-foreground">Carregando historico...</div>
    );
  }

  if (!data || data.subscriptions.length === 0) {
    return (
      <div className="py-4 text-center text-sm text-muted-foreground">
        Nenhum historico encontrado.
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="subscription-history">
      <div className="space-y-2">
        {data.subscriptions.map((s) => (
          <div key={s.subscriptionId} className="rounded-lg border p-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium">{s.planName}</span>
              <span className="rounded bg-muted px-2 py-0.5 text-xs">{s.status}</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Inicio: {new Date(s.startDate).toLocaleDateString("pt-BR")}
              {s.endDate && ` — Fim: ${new Date(s.endDate).toLocaleDateString("pt-BR")}`}
            </div>
          </div>
        ))}
      </div>

      {data.billingCycles.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-medium">Ciclos de Faturamento</h4>
          <div className="space-y-1">
            {data.billingCycles.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded border px-3 py-2 text-xs"
              >
                <span>
                  {new Date(c.periodStart).toLocaleDateString("pt-BR")} —{" "}
                  {new Date(c.periodEnd).toLocaleDateString("pt-BR")}
                </span>
                <span className={c.status === "PAID" ? "text-green-600" : "text-red-600"}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
