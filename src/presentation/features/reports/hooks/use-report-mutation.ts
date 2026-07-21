import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type { ApplicationError } from "@/presentation/shared/types/application-layer";
import type { ReportExecutionDto } from "@/application/dtos/relatorio";
import { REPORTS_QUERY_KEYS } from "../queries";

interface UseReportMutationInput {
  templateId: string;
  portfolioId: string;
  format: string;
  parameters: {
    startDate?: string;
    endDate?: string;
    tickers?: string[];
    categories?: string[];
  };
}

interface UseReportMutationResult {
  mutateAsync: (input: UseReportMutationInput) => Promise<ReportExecutionDto>;
  isPending: boolean;
  error: ApplicationError | null;
}

export function useReportMutation(portfolioId: string): UseReportMutationResult {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: UseReportMutationInput): Promise<ReportExecutionDto> => {
      const result = await dispatcher.DispatchCommand<ReportExecutionDto>({
        type: "GerarRelatorioCommand",
        templateId: input.templateId,
        portfolioId: input.portfolioId,
        format: input.format,
        parameters: input.parameters,
      } as ICommand);

      if (result instanceof Error) throw result;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REPORTS_QUERY_KEYS.executions(portfolioId) });
    },
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: (mutation.error as ApplicationError | null) ?? null,
  };
}
