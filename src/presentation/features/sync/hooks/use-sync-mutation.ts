import { useMutation } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type {
  SincronizacaoRealizadaDto,
  ApplicationError,
} from "@/presentation/shared/types/application-layer";
import type { SincronizarDadosCommand } from "@/application/commands/sincronizar-dados";

export interface SyncInput {
  usuarioId: string;
  fonte: string;
  parametros?: Record<string, string>;
}

interface UseSyncMutationResult {
  mutate: (input: SyncInput) => void;
  mutateAsync: (input: SyncInput) => Promise<SincronizacaoRealizadaDto>;
  isPending: boolean;
  isError: boolean;
  error: ApplicationError | null;
  data: SincronizacaoRealizadaDto | null;
}

export function useSyncMutation(): UseSyncMutationResult {
  const dispatcher = useDispatcher();

  const mutation = useMutation({
    mutationFn: async (input: SyncInput): Promise<SincronizacaoRealizadaDto> => {
      const command: SincronizarDadosCommand = {
        type: "SincronizarDadosCommand",
        usuarioId: input.usuarioId,
        fonte: input.fonte,
        parametros: input.parametros,
      };

      const result = await dispatcher.DispatchCommand<SincronizacaoRealizadaDto>(
        command as unknown as ICommand,
      );

      if (result instanceof Error) {
        throw result;
      }

      return result;
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: (mutation.error as ApplicationError | null) ?? null,
    data: (mutation.data as SincronizacaoRealizadaDto | null) ?? null,
  };
}
