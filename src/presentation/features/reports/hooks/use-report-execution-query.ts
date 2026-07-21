import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type { ApplicationError } from "@/presentation/shared/types/application-layer";
import type { ReportExecutionDetailDto } from "@/application/dtos/relatorio";
import { REPORTS_QUERY_KEYS } from "../queries";

interface UseReportExecutionQueryResult {
  data: ReportExecutionDetailDto | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useReportExecutionQuery(executionId: string): UseReportExecutionQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: REPORTS_QUERY_KEYS.execution(executionId),
    enabled: Boolean(executionId),
    queryFn: async (): Promise<ReportExecutionDetailDto> => {
      const result = await dispatcher.DispatchQuery<ReportExecutionDetailDto>({
        type: "ObterRelatorioExecutadoQuery",
        executionId,
      } as IQuery);

      if (result instanceof Error) throw result;
      return result;
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
