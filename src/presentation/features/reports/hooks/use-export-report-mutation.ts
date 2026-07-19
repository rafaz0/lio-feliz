import { useMutation } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type {
  DadosExportadosDto,
  ApplicationError,
} from "@/presentation/shared/types/application-layer";
import type { ExportarDadosQuery } from "@/application/queries/exportar-dados";

export interface ExportReportInput {
  portfolioId: string;
  formato: string;
}

interface UseExportReportMutationResult {
  mutate: (input: ExportReportInput) => void;
  mutateAsync: (input: ExportReportInput) => Promise<DadosExportadosDto>;
  isPending: boolean;
  isError: boolean;
  error: ApplicationError | null;
  data: DadosExportadosDto | null;
}

export function useExportReportMutation(): UseExportReportMutationResult {
  const dispatcher = useDispatcher();

  const mutation = useMutation({
    mutationFn: async (input: ExportReportInput): Promise<DadosExportadosDto> => {
      const query: ExportarDadosQuery = {
        type: "ExportarDadosQuery",
        portfolioId: input.portfolioId,
        formato: input.formato,
      };

      const result = await dispatcher.DispatchQuery<DadosExportadosDto>(query as unknown as IQuery);

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
    data: (mutation.data as DadosExportadosDto | null) ?? null,
  };
}
