import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type { ApplicationError, ExportJobDto } from "@/presentation/shared/types/application-layer";
import { EXPORTS_QUERY_KEYS } from "../queries";

export function useSolicitarExportacaoMutation(portfolioId: string) {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (templateId: string): Promise<ExportJobDto> => {
      const r = await dispatcher.DispatchCommand<ExportJobDto>({
        type: "SolicitarExportacaoCommand",
        templateId,
        portfolioId,
        parameters: {},
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPORTS_QUERY_KEYS.jobs(portfolioId) });
    },
  });
}
