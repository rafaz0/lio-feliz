import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type { ProventosDto, ApplicationError } from "@/presentation/shared/types/application-layer";
import { DIVIDENDS_QUERY_KEYS } from "../queries";
import {
  toDividendViewModels,
  toDividendsSummaryViewModel,
  type DividendViewModel,
  type DividendsSummaryViewModel,
} from "../types/dividends.view-model";

interface UseDividendsQueryResult {
  dividends: DividendViewModel[];
  summary: DividendsSummaryViewModel | null;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useDividendsQuery(
  portfolioId: string,
  filtros?: { ano?: number; ticker?: string },
): UseDividendsQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: DIVIDENDS_QUERY_KEYS.proventos(portfolioId),
    enabled: Boolean(portfolioId),
    queryFn: async (): Promise<ProventosDto> => {
      const result = await dispatcher.DispatchQuery<ProventosDto>({
        type: "ObterProventosQuery",
        portfolioId,
        ano: filtros?.ano,
        ticker: filtros?.ticker,
      } as IQuery);

      if (result instanceof Error) {
        throw result;
      }

      return result;
    },
  });

  return {
    dividends: query.data ? toDividendViewModels(query.data) : [],
    summary: query.data ? toDividendsSummaryViewModel(query.data) : null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
