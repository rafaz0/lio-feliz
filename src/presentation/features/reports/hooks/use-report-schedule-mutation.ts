import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type { ApplicationError } from "@/presentation/shared/types/application-layer";
import type { ReportScheduleDto } from "@/application/dtos/relatorio";
import { REPORTS_QUERY_KEYS } from "../queries";

interface UseReportScheduleMutationInput {
  templateId: string;
  portfolioId: string;
  cron: string;
  format: string;
  parameters: {
    startDate?: string;
    endDate?: string;
    tickers?: string[];
    categories?: string[];
  };
  recipientEmails: string[];
  isActive: boolean;
}

interface UseReportScheduleMutationResult {
  mutateAsync: (input: UseReportScheduleMutationInput) => Promise<ReportScheduleDto>;
  isPending: boolean;
  error: ApplicationError | null;
}

export function useReportScheduleMutation(portfolioId: string): UseReportScheduleMutationResult {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: UseReportScheduleMutationInput): Promise<ReportScheduleDto> => {
      const result = await dispatcher.DispatchCommand<ReportScheduleDto>({
        type: "AgendarRelatorioCommand",
        templateId: input.templateId,
        portfolioId: input.portfolioId,
        cron: input.cron,
        format: input.format,
        parameters: input.parameters,
        recipientEmails: input.recipientEmails,
        isActive: input.isActive,
      } as ICommand);

      if (result instanceof Error) throw result;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REPORTS_QUERY_KEYS.schedules(portfolioId) });
    },
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: (mutation.error as ApplicationError | null) ?? null,
  };
}
