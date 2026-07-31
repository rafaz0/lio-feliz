import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand, IQuery } from "@/application/types";
import { SUBSCRIPTION_QUERY_KEYS } from "../queries";

interface DevPaymentControlsProps {
  userId: string;
}

export function DevPaymentControls({ userId }: DevPaymentControlsProps) {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();

  const { data: behavior } = useQuery({
    queryKey: ["mock-gateway-behavior"],
    queryFn: async () => {
      return "approve" as string;
    },
  });

  const startTrial = useMutation({
    mutationFn: async (planId: string) => {
      const r = await dispatcher.DispatchCommand({
        type: "IniciarTrialCommand",
        userId,
        planId,
        trialDurationDays: 14,
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_QUERY_KEYS.all });
    },
  });

  const subscribe = useMutation({
    mutationFn: async (planId: string) => {
      const r = await dispatcher.DispatchCommand({
        type: "AssinarPlanoCommand",
        userId,
        planId,
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_QUERY_KEYS.all });
    },
  });

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
        type: "RenovarAssinaturaCommand",
        subscriptionId: sub.id,
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_QUERY_KEYS.all });
    },
  });

  const cancel = useMutation({
    mutationFn: async () => {
      const r = await dispatcher.DispatchCommand({
        type: "CancelarAssinaturaCommand",
        userId,
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_QUERY_KEYS.all });
    },
  });

  const upgrade = useMutation({
    mutationFn: async () => {
      const subQuery = await dispatcher.DispatchQuery({
        type: "ObterPlanoAtivoQuery",
        userId,
      } as unknown as IQuery);
      if (subQuery instanceof Error) throw subQuery;
      if (!subQuery) throw new Error("Nenhuma assinatura ativa encontrada.");
      const sub = subQuery as { id: string; planId: string };
      const targetPlan = sub.planId === "basic" ? "premium" : "premium";
      const r = await dispatcher.DispatchCommand({
        type: "AlterarPlanoCommand",
        userId,
        subscriptionId: sub.id,
        newPlanId: targetPlan,
        isDowngrade: false,
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_QUERY_KEYS.all });
    },
  });

  const expire = useMutation({
    mutationFn: async () => {
      const subQuery = await dispatcher.DispatchQuery({
        type: "ObterPlanoAtivoQuery",
        userId,
      } as unknown as IQuery);
      if (subQuery instanceof Error) throw subQuery;
      if (!subQuery) throw new Error("Nenhuma assinatura ativa encontrada.");
      const sub = subQuery as { id: string };
      const r = await dispatcher.DispatchCommand({
        type: "RenovarAssinaturaCommand",
        subscriptionId: sub.id,
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_QUERY_KEYS.all });
    },
  });

  return (
    <div className="rounded-lg border border-dashed p-4" data-testid="dev-payment-controls">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Controles de Desenvolvimento (Mock Gateway)
      </h3>

      <p className="mb-3 text-xs text-muted-foreground">
        Comportamento atual: <strong>{behavior ?? "approve"}</strong>
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => startTrial.mutate("premium")}
          disabled={startTrial.isPending}
          className="rounded-md bg-blue-500 px-3 py-1.5 text-xs text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {startTrial.isPending ? "..." : "Iniciar Trial (Premium)"}
        </button>

        <button
          onClick={() => subscribe.mutate("basic")}
          disabled={subscribe.isPending}
          className="rounded-md bg-green-600 px-3 py-1.5 text-xs text-white hover:bg-green-700 disabled:opacity-50"
        >
          {subscribe.isPending ? "..." : "Assinar Basic"}
        </button>

        <button
          onClick={() => subscribe.mutate("premium")}
          disabled={subscribe.isPending}
          className="rounded-md bg-green-700 px-3 py-1.5 text-xs text-white hover:bg-green-800 disabled:opacity-50"
        >
          {subscribe.isPending ? "..." : "Assinar Premium"}
        </button>

        <button
          onClick={() => renew.mutate()}
          disabled={renew.isPending}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-xs text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {renew.isPending ? "..." : "Renovar"}
        </button>

        <button
          onClick={() => upgrade.mutate()}
          disabled={upgrade.isPending}
          className="rounded-md bg-purple-600 px-3 py-1.5 text-xs text-white hover:bg-purple-700 disabled:opacity-50"
        >
          {upgrade.isPending ? "..." : "Upgrade"}
        </button>

        <button
          onClick={() => cancel.mutate()}
          disabled={cancel.isPending}
          className="rounded-md bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600 disabled:opacity-50"
        >
          {cancel.isPending ? "..." : "Cancelar"}
        </button>
      </div>
    </div>
  );
}
