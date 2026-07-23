import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type {
  ApplicationError,
  AssinaturaDto,
} from "@/presentation/shared/types/application-layer";
import { CHECKOUT_QUERY_KEYS } from "../queries";

export type CheckoutMutationInput = {
  userId: string;
  planId: string;
};

export function useCheckoutMutation() {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, planId }: CheckoutMutationInput): Promise<AssinaturaDto> => {
      const r = await dispatcher.DispatchCommand<AssinaturaDto>({
        type: "AssinarPlanoCommand",
        planId,
        userId,
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: CHECKOUT_QUERY_KEYS.ativa(variables.userId) });
    },
  });
}
