import { useMutation } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type { ApplicationError } from "@/presentation/shared/types/application-layer";
import type { ExportJobDto } from "@/application/dtos/importacao";

interface UseExportMutationInput {
  portfolioId: string;
  formato: string;
  templateId: string;
  parametros?: Record<string, unknown>;
}

interface UseExportMutationResult {
  mutateAsync: (input: UseExportMutationInput) => Promise<ExportJobDto>;
  isPending: boolean;
  isError: boolean;
  error: ApplicationError | null;
  data: ExportJobDto | null;
}

export function useExportMutation(): UseExportMutationResult {
  const dispatcher = useDispatcher();

  const mutation = useMutation({
    mutationFn: async (input: UseExportMutationInput): Promise<ExportJobDto> => {
      const result = await dispatcher.DispatchCommand<ExportJobDto>({
        type: "ExportarRelatorioCommand",
        portfolioId: input.portfolioId,
        formato: input.formato,
        templateId: input.templateId,
        parametros: input.parametros,
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
    data: (mutation.data as ExportJobDto | null) ?? null,
  };
}
