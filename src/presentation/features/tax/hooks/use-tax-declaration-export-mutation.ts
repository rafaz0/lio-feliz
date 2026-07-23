import { useMutation } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type {
  DadosExportadosDto,
  ExportarDeclaracaoCommand,
} from "@/presentation/shared/types/application-layer";

interface UseTaxDeclarationExportMutationResult {
  mutate: (command: ExportarDeclaracaoCommand) => void;
  mutateAsync: (command: ExportarDeclaracaoCommand) => Promise<DadosExportadosDto>;
  isPending: boolean;
  data: DadosExportadosDto | null;
  error: Error | null;
}

export function useTaxDeclarationExportMutation(): UseTaxDeclarationExportMutationResult {
  const dispatcher = useDispatcher();

  const mutation = useMutation({
    mutationFn: async (command: ExportarDeclaracaoCommand): Promise<DadosExportadosDto> => {
      const result = await dispatcher.DispatchCommand<DadosExportadosDto>(command as ICommand);

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
    data: mutation.data ?? null,
    error: (mutation.error as Error | null) ?? null,
  };
}
