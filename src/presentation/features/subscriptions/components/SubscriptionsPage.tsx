import { usePlansQuery, useSubscriptionQuery } from "../hooks/use-subscriptions-query";
import {
  useSubscribeMutation,
  useCancelSubscriptionMutation,
} from "../hooks/use-subscriptions-mutation";

interface SubscriptionsPageProps {
  userId: string;
}

export function SubscriptionsPage({ userId }: SubscriptionsPageProps) {
  const { data: plans, isLoading: plansLoading } = usePlansQuery();
  const { data: subscription, isLoading: subLoading } = useSubscriptionQuery(userId);
  const subscribe = useSubscribeMutation(userId);
  const cancel = useCancelSubscriptionMutation(userId);

  if (plansLoading || subLoading) {
    return (
      <div
        data-testid="subscriptions-loading"
        className="py-8 text-center text-sm text-muted-foreground"
      >
        Carregando planos...
      </div>
    );
  }

  return (
    <div data-testid="subscriptions-page" className="space-y-6">
      <h1 className="text-xl font-semibold">Planos e Assinatura</h1>

      {subscription && (
        <div className="rounded-lg border p-4" data-testid="subscription-status">
          <p className="text-sm">
            Plano atual: <strong>{subscription.planName}</strong>
          </p>
          <p className="text-xs text-muted-foreground">
            Status: {subscription.isActive ? "Ativa" : subscription.status}
          </p>
          <p className="text-xs text-muted-foreground">Desde: {subscription.startDate}</p>
          {subscription.isActive && (
            <button
              onClick={() => cancel.mutate()}
              className="mt-2 rounded-md bg-red-500 px-3 py-1 text-xs text-white"
            >
              Cancelar assinatura
            </button>
          )}
        </div>
      )}

      {!plans || plans.length === 0 ? (
        <div
          data-testid="subscriptions-empty"
          className="py-8 text-center text-sm text-muted-foreground"
        >
          Nenhum plano disponivel.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-lg border p-4 flex flex-col"
              data-testid={`plan-card-${plan.tier}`}
            >
              <h3 className="font-semibold">{plan.name}</h3>
              <p className="mt-1 text-2xl font-bold">{plan.monthlyPrice}</p>
              <p className="mt-1 text-xs text-muted-foreground">{plan.description}</p>
              <ul className="mt-3 space-y-1 text-xs">
                {plan.capabilities.map((cap) => (
                  <li key={cap} className="flex items-center gap-1">
                    &#10003; {cap}
                  </li>
                ))}
              </ul>
              {subscription?.planName !== plan.name && (
                <button
                  onClick={() => subscribe.mutate(plan.id)}
                  className="mt-auto rounded-md bg-foreground px-3 py-2 text-sm text-background"
                >
                  {plan.isFree ? "Gratuito" : "Assinar"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
