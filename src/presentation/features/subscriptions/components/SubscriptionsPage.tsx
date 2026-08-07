import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { usePlansQuery, useSubscriptionQuery } from "../hooks/use-subscriptions-query";
import { useSubscribeMutation } from "../hooks/use-subscriptions-mutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import { Skeleton } from "@/components/ui/skeleton";
import { SubscriptionStatusBadge } from "./SubscriptionStatusBadge";
import { PremiumBadge } from "./PremiumBadge";
import { SubscriptionHistory } from "./SubscriptionHistory";
import { SubscriptionTimeline } from "./SubscriptionTimeline";
import { PlanComparison } from "./PlanComparison";
import { PlanDetailCard } from "./PlanDetailCard";
import { SubscriptionActions } from "./SubscriptionActions";
import { CancelConfirmDialog } from "./CancelConfirmDialog";
import { DevPaymentControls } from "./DevPaymentControls";
import { SUBSCRIPTION_QUERY_KEYS } from "../queries";

interface SubscriptionsPageProps {
  userId: string;
}

type Tab = "meu_plano" | "comparacao" | "historico" | "eventos";

const TABS: { key: Tab; label: string }[] = [
  { key: "meu_plano", label: "Meu Plano" },
  { key: "comparacao", label: "Comparacao" },
  { key: "historico", label: "Historico" },
  { key: "eventos", label: "Eventos" },
];

export function SubscriptionsPage({ userId }: SubscriptionsPageProps) {
  const [tab, setTab] = useState<Tab>("meu_plano");
  const [cancelOpen, setCancelOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null,
  );

  const { data: plans, isLoading: plansLoading } = usePlansQuery();
  const { data: subscription, isLoading: subLoading } = useSubscriptionQuery(userId);
  const subscribe = useSubscribeMutation(userId);
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const cancelMutation = useMutation({
    mutationFn: async () => {
      const r = await dispatcher.DispatchCommand({
        type: "IniciarCheckoutCommand",
        userId,
        tipo: "cancelamento",
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_QUERY_KEYS.all });
      setCancelOpen(false);
      setFeedback({ type: "success", message: "Assinatura cancelada com sucesso." });
    },
    onError: (err: Error) => {
      setFeedback({ type: "error", message: err.message });
    },
  });

  const hasActive = subscription?.isActive ?? false;
  const isTrial = subscription?.status === "TRIAL";
  const isCancelled = subscription?.status === "CANCELLED" || subscription?.status === "EXPIRED";

  if (plansLoading || subLoading) {
    return (
      <div data-testid="subscriptions-loading" className="space-y-6">
        <Skeleton className="h-7 w-48" />
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <div className="space-y-4">
            <Skeleton className="h-40 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
          </div>
          <Skeleton className="h-32 rounded-lg" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div data-testid="subscriptions-page" className="space-y-6">
      <h1 className="text-xl font-semibold">Portal de Assinaturas</h1>

      {feedback && (
        <div
          className={`rounded-lg border p-3 text-sm ${
            feedback.type === "success"
              ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
          }`}
        >
          {feedback.message}
          <button onClick={() => setFeedback(null)} className="ml-2 font-medium hover:underline">
            Fechar
          </button>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <PlanDetailCard
            subscription={subscription}
            isLoading={subLoading}
            plansCount={plans?.length ?? 0}
          />

          <SubscriptionActions
            userId={userId}
            hasActiveSubscription={hasActive}
            isTrial={isTrial}
            isCancelled={isCancelled}
            currentPlanId={subscription?.planId ?? null}
            onCancelRequest={() => setCancelOpen(true)}
          />
        </div>

        {subscription && (hasActive || isTrial) && (
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status</span>
              <SubscriptionStatusBadge
                status={subscription.status}
                isActive={hasActive}
                isTrial={isTrial}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Plano: <span className="font-medium text-foreground">{subscription.planName}</span>
            </p>
            <p className="text-xs text-muted-foreground">Desde: {subscription.startDate}</p>
            {hasActive && (
              <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                <PremiumBadge size="sm" />
                <span>Recursos premium disponiveis</span>
              </div>
            )}
          </div>
        )}
      </div>

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

      {tab === "meu_plano" && (
        <div>
          {!plans || plans.length === 0 ? (
            <div
              data-testid="subscriptions-empty"
              className="py-8 text-center text-sm text-muted-foreground"
            >
              Nenhum plano disponivel.
            </div>
          ) : (
            <>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">Planos Disponiveis</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {plans.map((plan) => {
                  const isCurrentPlan = subscription?.planName === plan.name;
                  return (
                    <div
                      key={plan.id}
                      className={`rounded-lg border p-4 flex flex-col ${
                        isCurrentPlan ? "ring-2 ring-primary" : ""
                      }`}
                      data-testid={`plan-card-${plan.tier}`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{plan.name}</h3>
                        {plan.tier !== "FREE" && <PremiumBadge size="sm" />}
                      </div>
                      <p className="mt-1 text-2xl font-bold">{plan.monthlyPrice}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{plan.description}</p>
                      <ul className="mt-3 space-y-1 text-xs">
                        {plan.capabilities.map((cap) => (
                          <li key={cap} className="flex items-center gap-1">
                            <span className="text-green-500">&#10003;</span> {cap}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-3">
                        {isCurrentPlan && hasActive && (
                          <span className="block text-center text-xs font-medium text-muted-foreground">
                            Plano atual
                          </span>
                        )}
                        {!isCurrentPlan && !hasActive && !isTrial && (
                          <button
                            onClick={() =>
                              plan.isFree
                                ? subscribe.mutate(plan.id)
                                : navigate({ to: "/checkout" })
                            }
                            disabled={subscribe.isPending}
                            className="w-full rounded-md bg-foreground px-3 py-2 text-sm text-background disabled:opacity-50"
                          >
                            {plan.isFree ? "Ativar Gratuito" : "Assinar"}
                          </button>
                        )}
                        {!isCurrentPlan && !isCancelled && hasActive && plan.tier !== "FREE" && (
                          <button
                            onClick={() => {
                              const isDowngrade =
                                subscription?.tier === "PREMIUM" && plan.tier === "BASIC";
                              dispatcher
                                .DispatchCommand({
                                  type: "IniciarCheckoutCommand",
                                  userId,
                                  tipo: isDowngrade ? "downgrade" : "upgrade",
                                  planId: plan.id,
                                } as unknown as ICommand)
                                .then(() => {
                                  queryClient.invalidateQueries({
                                    queryKey: SUBSCRIPTION_QUERY_KEYS.all,
                                  });
                                  setFeedback({
                                    type: "success",
                                    message: `Plano alterado para ${plan.name}.`,
                                  });
                                })
                                .catch((err: Error) => {
                                  setFeedback({ type: "error", message: err.message });
                                });
                            }}
                            className="w-full rounded-md border px-3 py-2 text-sm hover:bg-secondary"
                          >
                            {subscription?.tier === "PREMIUM" && plan.tier === "BASIC"
                              ? "Downgrade"
                              : "Upgrade"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {tab === "comparacao" && <PlanComparison userId={userId} />}
      {tab === "historico" && <SubscriptionHistory userId={userId} />}
      {tab === "eventos" && <SubscriptionTimeline userId={userId} />}

      <CancelConfirmDialog
        open={cancelOpen}
        planName={subscription?.planName ?? "—"}
        onConfirm={() => cancelMutation.mutate()}
        onCancel={() => setCancelOpen(false)}
        isLoading={cancelMutation.isPending}
      />

      {import.meta.env.DEV && <DevPaymentControls userId={userId} />}
    </div>
  );
}
