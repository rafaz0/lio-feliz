import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand, IQuery } from "@/application/types";
import { SUBSCRIPTION_QUERY_KEYS } from "../queries";

interface SubscriptionActionsProps {
  userId: string;
  hasActiveSubscription: boolean;
  isTrial: boolean;
  isCancelled: boolean;
  currentPlanId: string | null;
  onCancelRequest: () => void;
}

export function SubscriptionActions({
  userId,
  hasActiveSubscription,
  isTrial,
  isCancelled,
  currentPlanId,
  onCancelRequest,
}: SubscriptionActionsProps) {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();

  const renew = useMutation({
    mutationFn: async () => {
      const subQuery = await dispatcher.DispatchQuery({
        type: "ObterPlanoAtivoQuery",
        userId,
      } as unknown as IQuery);
      if (subQuery instanceof Error) throw subQuery;
      if (!subQuery) throw new Error("Nenhuma assinatura ativa encontrada.");
      const sub = subQuery as { id: string };
      const r = await dispatcher.DispatchCommand({
        type: "IniciarCheckoutCommand",
        userId,
        tipo: "renovacao",
        subscriptionId: sub.id,
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_QUERY_KEYS.all });
    },
  });

  const reactivate = useMutation({
    mutationFn: async () => {
      const r = await dispatcher.DispatchCommand({
        type: "IniciarCheckoutCommand",
        userId,
        tipo: "reativacao",
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_QUERY_KEYS.all });
    },
  });

  const trialMutation = useMutation({
    mutationFn: async (planId: string) => {
      const r = await dispatcher.DispatchCommand({
        type: "IniciarCheckoutCommand",
        userId,
        tipo: "trial",
        planId,
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_QUERY_KEYS.all });
    },
  });

  const upgradeToPremium = useMutation({
    mutationFn: async () => {
      const subQuery = await dispatcher.DispatchQuery({
        type: "ObterPlanoAtivoQuery",
        userId,
      } as unknown as IQuery);
      if (subQuery instanceof Error) throw subQuery;
      if (!subQuery) throw new Error("Nenhuma assinatura ativa encontrada.");
      const sub = subQuery as { id: string };
      const r = await dispatcher.DispatchCommand({
        type: "IniciarCheckoutCommand",
        userId,
        tipo: "upgrade",
        planId: "premium",
        subscriptionId: sub.id,
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_QUERY_KEYS.all });
    },
  });

  if (!hasActiveSubscription && !isCancelled) {
    return (
      <div className="flex flex-wrap gap-2" data-testid="subscription-actions">
        <button
          onClick={() => trialMutation.mutate("premium")}
          disabled={trialMutation.isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {trialMutation.isPending ? "..." : "Iniciar Trial Gratuito (14 dias)"}
        </button>
      </div>
    );
  }

  if (isCancelled) {
    return (
      <div className="flex flex-wrap gap-2" data-testid="subscription-actions">
        <button
          onClick={() => reactivate.mutate()}
          disabled={reactivate.isPending}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
        >
          {reactivate.isPending ? "..." : "Reativar assinatura"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2" data-testid="subscription-actions">
      {isTrial && (
        <button
          onClick={() => trialMutation.mutate("premium")}
          disabled={trialMutation.isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {trialMutation.isPending ? "..." : "Assinar apos Trial"}
        </button>
      )}

      {currentPlanId !== "premium" && (
        <button
          onClick={() => upgradeToPremium.mutate()}
          disabled={upgradeToPremium.isPending}
          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
        >
          {upgradeToPremium.isPending ? "..." : "Fazer Upgrade para Premium"}
        </button>
      )}

      <button
        onClick={() => renew.mutate()}
        disabled={renew.isPending}
        className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {renew.isPending ? "..." : "Renovar assinatura"}
      </button>

      <button
        onClick={onCancelRequest}
        className="rounded-md border border-red-300 bg-background px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
      >
        Cancelar assinatura
      </button>
    </div>
  );
}
