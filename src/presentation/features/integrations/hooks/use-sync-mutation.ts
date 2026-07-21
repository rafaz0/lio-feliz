import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type { ApplicationError } from "@/presentation/shared/types/application-layer";
import type { SincronizacaoRealizadaDto } from "@/application/dtos/integracao";
import { INTEGRATION_QUERY_KEYS } from "../queries";

interface UseSyncMutationInput {
  integrationId: string;
  type: "MANUAL" | "SCHEDULED" | "WEBHOOK";
}

interface UseSyncMutationResult {
  mutateAsync: (input: UseSyncMutationInput) => Promise<SincronizacaoRealizadaDto>;
  isPending: boolean;
  isError: boolean;
  error: ApplicationError | null;
  data: SincronizacaoRealizadaDto | null;
}

export function useSyncMutation(): UseSyncMutationResult {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: UseSyncMutationInput): Promise<SincronizacaoRealizadaDto> => {
      const result = await dispatcher.DispatchCommand<SincronizacaoRealizadaDto>({
        type: "SincronizarIntegracaoCommand",
        integrationId: input.integrationId,
      } as ICommand);

      if (result instanceof Error) throw result;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INTEGRATION_QUERY_KEYS.all });
    },
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: (mutation.error as ApplicationError | null) ?? null,
    data: (mutation.data as SincronizacaoRealizadaDto | null) ?? null,
  };
}
