import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import { SUBSCRIPTION_QUERY_KEYS } from "../queries";

interface SubscriptionTimelineProps {
  userId: string | undefined;
}

const EVENT_LABELS: Record<string, { label: string; color: string }> = {
  trial_expiracao: { label: "Fim do Trial", color: "text-amber-600" },
  renovacao: { label: "Renovacao", color: "text-blue-600" },
  carencia: { label: "Carencia", color: "text-red-600" },
  proxima_cobranca: { label: "Proxima Cobranca", color: "text-green-600" },
};

export function SubscriptionTimeline({ userId }: SubscriptionTimelineProps) {
  const dispatcher = useDispatcher();

  const { data, isLoading } = useQuery({
    queryKey: SUBSCRIPTION_QUERY_KEYS.eventos(userId ?? ""),
    enabled: Boolean(userId),
    queryFn: async () => {
      const r = await dispatcher.DispatchQuery({
        type: "ConsultarProximosEventosQuery",
        userId,
      } as IQuery);
      if (r instanceof Error) throw r;
      return r as { eventos: Array<{ tipo: string; data: string; descricao: string }> };
    },
  });

  if (isLoading) {
    return (
      <div className="py-4 text-center text-sm text-muted-foreground">Carregando eventos...</div>
    );
  }

  if (!data || data.eventos.length === 0) {
    return (
      <div className="py-4 text-center text-sm text-muted-foreground">Nenhum evento futuro.</div>
    );
  }

  return (
    <div className="space-y-3" data-testid="subscription-timeline">
      {data.eventos.map((evt, idx) => {
        const cfg = EVENT_LABELS[evt.tipo] ?? { label: evt.tipo, color: "text-muted-foreground" };
        return (
          <div key={idx} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`h-2 w-2 rounded-full ${cfg.color.replace("text-", "bg-")}`} />
              {idx < data.eventos.length - 1 && <div className="h-full w-px bg-border" />}
            </div>
            <div className="pb-3">
              <p className={`text-sm font-medium ${cfg.color}`}>{cfg.label}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(evt.data).toLocaleDateString("pt-BR")}
              </p>
              <p className="text-xs text-muted-foreground">{evt.descricao}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
