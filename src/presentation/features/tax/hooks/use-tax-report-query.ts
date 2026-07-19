import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type {
  RelatorioFiscalDto,
  ApplicationError,
} from "@/presentation/shared/types/application-layer";
import { TAX_QUERY_KEYS } from "../queries";

interface UseTaxReportQueryResult {
  relatorio: RelatorioFiscalDto | null;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useTaxReportQuery(portfolioId: string, ano: number): UseTaxReportQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: TAX_QUERY_KEYS.relatorio(portfolioId, ano),
    enabled: Boolean(portfolioId) && Number.isFinite(ano),
    queryFn: async (): Promise<RelatorioFiscalDto> => {
      const result = await dispatcher.DispatchQuery<RelatorioFiscalDto>({
        type: "GerarRelatorioFiscalQuery",
        portfolioId,
        ano,
      } as IQuery);

      if (result instanceof Error) {
        throw result;
      }

      return result;
    },
  });

  return {
    relatorio: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
