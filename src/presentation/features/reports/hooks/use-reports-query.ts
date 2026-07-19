import { useQuery } from "@tanstack/react-query";
import {
  REPORTS_CATALOG,
  toReportViewModels,
  type ReportViewModel,
} from "../types/reports.view-model";
import { REPORTS_QUERY_KEYS } from "../queries/reports-query-keys";

interface UseReportsQueryResult {
  relatorios: ReportViewModel[];
  isLoading: boolean;
}

export function useReportsQuery(): UseReportsQueryResult {
  const query = useQuery({
    queryKey: REPORTS_QUERY_KEYS.catalogo,
    queryFn: (): ReportViewModel[] => toReportViewModels(REPORTS_CATALOG),
  });

  return {
    relatorios: query.data ?? [],
    isLoading: query.isLoading,
  };
}
