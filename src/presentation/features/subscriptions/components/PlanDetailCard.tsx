import { SubscriptionStatusBadge } from "./SubscriptionStatusBadge";
import { PremiumBadge } from "./PremiumBadge";
import type { SubscriptionViewModel } from "../viewmodels/subscription.view-model";

interface PlanDetailCardProps {
  subscription: SubscriptionViewModel | null | undefined;
  isLoading: boolean;
  plansCount: number;
}

export function PlanDetailCard({ subscription, isLoading, plansCount }: PlanDetailCardProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border p-4" data-testid="plan-detail-loading">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-3 w-48 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  const hasSubscription = subscription && subscription.isActive;
  const planName = subscription?.planName ?? "Free";
  const tier = subscription?.tier ?? "FREE";
  const isFree = tier === "FREE";
  const isTrial = subscription?.status === "TRIAL";

  return (
    <div className="rounded-lg border p-4" data-testid="plan-detail-card">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">Meu Plano</h2>
          <p className="text-xs text-muted-foreground">
            {plansCount > 0 ? `${plansCount} planos disponiveis` : "Nenhum plano disponivel"}
          </p>
        </div>
        {isFree && plansCount > 0 && <PremiumBadge size="sm" />}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-lg font-bold">{planName}</span>
        {hasSubscription || isTrial ? (
          <SubscriptionStatusBadge
            status={subscription?.status ?? "ACTIVE"}
            isActive={hasSubscription}
            isTrial={isTrial}
          />
        ) : (
          <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Gratuito
          </span>
        )}
      </div>

      {subscription && (
        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Inicio:</span> {subscription.startDate}
          </p>

          {subscription.status === "TRIAL" && (
            <p className="text-blue-600 dark:text-blue-400">Periodo de trial em andamento</p>
          )}

          {hasSubscription && (
            <p>
              <span className="font-medium text-foreground">Plano:</span> {subscription.planName}
            </p>
          )}
        </div>
      )}

      {isFree && !hasSubscription && !isTrial && (
        <p className="mt-2 text-xs text-muted-foreground">
          Voce esta no plano gratuito. Assine um dos planos para acessar todos os recursos.
        </p>
      )}
    </div>
  );
}
