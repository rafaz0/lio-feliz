import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type { ApplicationError, AssinaturaDto } from "@/presentation/shared/types/application-layer";
import { SUBSCRIPTION_QUERY_KEYS } from "../queries";

export function useSubscribeMutation(userId: string) {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (planId: string): Promise<AssinaturaDto> => {
      const r = await dispatcher.DispatchCommand<AssinaturaDto>({ type: "AssinarPlanoCommand", planId, userId } as unknown as ICommand);
      if (r instanceof Error) throw r; return r;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_QUERY_KEYS.ativa(userId) });
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_QUERY_KEYS.acesso(userId) });
    },
  });
}

export function useCancelSubscriptionMutation(userId: string) {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<AssinaturaDto> => {
      const r = await dispatcher.DispatchCommand<AssinaturaDto>({ type: "CancelarAssinaturaCommand", userId } as unknown as ICommand);
      if (r instanceof Error) throw r; return r;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_QUERY_KEYS.ativa(userId) });
    },
  });
}
