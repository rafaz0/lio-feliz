import { useSubscriptionQuery } from "../hooks/use-subscriptions-query";
import { SubscriptionStatusBadge } from "./SubscriptionStatusBadge";
import { PremiumBadge } from "./PremiumBadge";

interface SeuPlanoCardProps {
  userId: string;
}

export function SeuPlanoCard({ userId }: SeuPlanoCardProps) {
  const { data: sub, isLoading } = useSubscriptionQuery(userId);

  if (isLoading) {
    return (
      <div className="rounded-lg border p-4">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-3 w-32 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  const planName = sub?.planName ?? "Free";
  const tier = sub?.tier ?? "FREE";
  const isFree = tier === "FREE";

  return (
    <div className="rounded-lg border p-4" data-testid="seu-plano-card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Seu Plano</h3>
        {!isFree && <PremiumBadge size="sm" />}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-lg font-semibold">{planName}</span>
        {sub ? (
          <SubscriptionStatusBadge
            status={sub.status}
            isActive={sub.isActive}
          />
        ) : (
          <SubscriptionStatusBadge status="FREE" />
        )}
      </div>
      {sub && (
        <p className="mt-1 text-xs text-muted-foreground">
          Desde {sub.startDate}
        </p>
      )}
      {isFree && (
        <p className="mt-1 text-xs text-muted-foreground">
          Plano gratuito com recursos basicos.
        </p>
      )}
      <a
        href="/assinaturas"
        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
      >
        {isFree ? "Fazer Upgrade" : "Gerenciar Assinatura"}
        <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  );
}
