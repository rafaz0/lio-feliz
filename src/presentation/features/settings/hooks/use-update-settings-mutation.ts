import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import { useAuth } from "@/presentation/features/auth/hooks/use-auth";
import type { ICommand } from "@/application/types";
import type {
  EstrategiaConfiguradaDto,
  ApplicationError,
} from "@/presentation/shared/types/application-layer";
import { SETTINGS_QUERY_KEYS } from "../queries";

export interface UpdateSettingsInput {
  moeda: string;
  toleranciaRebalanceamento: number;
  percentuais: Record<string, number>;
}

interface UseUpdateSettingsMutationResult {
  mutate: (input: UpdateSettingsInput) => void;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: ApplicationError | null;
}

export function useUpdateSettingsMutation(): UseUpdateSettingsMutationResult {
  const dispatcher = useDispatcher();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const usuarioId = user?.id ?? "";

  const mutation = useMutation({
    mutationFn: async (input: UpdateSettingsInput): Promise<EstrategiaConfiguradaDto> => {
      const result = await dispatcher.DispatchCommand<EstrategiaConfiguradaDto>({
        type: "ConfigurarEstrategiaCommand",
        usuarioId,
        moeda: input.moeda,
        toleranciaRebalanceamento: input.toleranciaRebalanceamento,
        percentuais: input.percentuais,
      } as ICommand);

      if (result instanceof Error) {
        throw result;
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEYS.configuracoes(usuarioId) });
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: (mutation.error as ApplicationError | null) ?? null,
  };
}
