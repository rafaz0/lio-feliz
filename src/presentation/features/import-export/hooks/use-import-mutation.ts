import { useMutation } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type { ApplicationError } from "@/presentation/shared/types/application-layer";
import type { ImportacaoRealizadaDto } from "@/application/dtos/importacao";

interface UseImportMutationInput {
  usuarioId: string;
  origem: string;
  formato: string;
  arquivo?: string;
  arquivoSize?: number;
  portfolioId?: string;
  observacoes?: string;
}

interface UseImportMutationResult {
  mutateAsync: (input: UseImportMutationInput) => Promise<ImportacaoRealizadaDto>;
  isPending: boolean;
  isError: boolean;
  error: ApplicationError | null;
  data: ImportacaoRealizadaDto | null;
}

export function useImportMutation(): UseImportMutationResult {
  const dispatcher = useDispatcher();

  const mutation = useMutation({
    mutationFn: async (input: UseImportMutationInput): Promise<ImportacaoRealizadaDto> => {
      const result = await dispatcher.DispatchCommand<ImportacaoRealizadaDto>({
        type: "ImportarDadosCommand",
        usuarioId: input.usuarioId,
        origem: input.origem,
        formato: input.formato,
        arquivo: input.arquivo,
        arquivoSize: input.arquivoSize,
        portfolioId: input.portfolioId,
        observacoes: input.observacoes,
      } as ICommand);

      if (result instanceof Error) throw result;
      return result;
    },
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: (mutation.error as ApplicationError | null) ?? null,
    data: (mutation.data as ImportacaoRealizadaDto | null) ?? null,
  };
}
