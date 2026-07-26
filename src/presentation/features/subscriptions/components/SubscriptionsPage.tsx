import { useState } from "react";
import { usePlansQuery, useSubscriptionQuery } from "../hooks/use-subscriptions-query";
import {
  useSubscribeMutation,
  useCancelSubscriptionMutation,
} from "../hooks/use-subscriptions-mutation";
import { SubscriptionStatusBadge } from "./SubscriptionStatusBadge";
import { SubscriptionHistory } from "./SubscriptionHistory";
import { SubscriptionTimeline } from "./SubscriptionTimeline";
import { PlanComparison } from "./PlanComparison";

interface SubscriptionsPageProps {
  userId: string;
}

type Tab = "planos" | "comparacao" | "historico" | "eventos";

const TABS: { key: Tab; label: string }[] = [
  { key: "planos", label: "Planos" },
  { key: "comparacao", label: "Comparacao" },
  { key: "historico", label: "Historico" },
  { key: "eventos", label: "Eventos" },
];

export function SubscriptionsPage({ userId }: SubscriptionsPageProps) {
  const [tab, setTab] = useState<Tab>("planos");
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
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">
                Plano atual: <strong>{subscription.planName}</strong>
              </p>
              <div className="mt-1 flex items-center gap-2">
                <SubscriptionStatusBadge
                  status={subscription.status}
                  isActive={subscription.isActive}
                />
                <span className="text-xs text-muted-foreground">
                  Desde {subscription.startDate}
                </span>
              </div>
            </div>
            {subscription.isActive && (
              <button
                onClick={() => cancel.mutate()}
                className="rounded-md bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
              >
                Cancelar assinatura
              </button>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-1 border-b">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3 py-2 text-sm font-medium ${
              tab === t.key
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "planos" && (
        <>
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
                  {subscription?.planName === plan.name && (
                    <span className="mt-auto text-center text-xs text-muted-foreground">
                      Plano atual
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === "comparacao" && <PlanComparison userId={userId} />}
      {tab === "historico" && <SubscriptionHistory userId={userId} />}
      {tab === "eventos" && <SubscriptionTimeline userId={userId} />}
    </div>
  );
}
