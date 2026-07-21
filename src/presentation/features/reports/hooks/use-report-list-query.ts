import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type { ApplicationError } from "@/presentation/shared/types/application-layer";
import type { ReportTemplateListDto } from "@/application/dtos/relatorio";
import { REPORTS_QUERY_KEYS } from "../queries";

interface UseReportListQueryResult {
  data: ReportTemplateListDto | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useReportListQuery(): UseReportListQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: REPORTS_QUERY_KEYS.templates(),
    queryFn: async (): Promise<ReportTemplateListDto> => {
      const result = await dispatcher.DispatchQuery<ReportTemplateListDto>({
        type: "ObterRelatoriosDisponiveisQuery",
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
