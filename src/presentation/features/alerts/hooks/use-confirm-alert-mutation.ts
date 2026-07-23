import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type { ApplicationError } from "@/presentation/shared/types/application-layer";
import { ALERTS_QUERY_KEYS } from "../queries";

export function useConfirmAlertMutation(userId: string) {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (alertId: string) => {
      const r = await dispatcher.DispatchCommand<void>({
        type: "ConfirmarAlertaCommand",
        alertId,
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ALERTS_QUERY_KEYS.alerts(userId) });
    },
  });
}
