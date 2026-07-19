import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type {
  PatrimonioDto,
  ApplicationError,
} from "@/presentation/shared/types/application-layer";
import { PORTFOLIO_QUERY_KEYS } from "../queries";
import {
  toPortfolioSummaryViewModel,
  type PortfolioSummaryViewModel,
} from "../types/portfolio.view-model";

interface UsePortfolioSummaryQueryResult {
  summary: PortfolioSummaryViewModel | null;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function usePortfolioSummaryQuery(portfolioId: string): UsePortfolioSummaryQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: PORTFOLIO_QUERY_KEYS.summary(portfolioId),
    enabled: Boolean(portfolioId),
    queryFn: async (): Promise<PatrimonioDto> => {
      const result = await dispatcher.DispatchQuery<PatrimonioDto>({
        type: "ObterPatrimonioQuery",
        portfolioId,
      } as IQuery);

      if (result instanceof Error) {
        throw result;
      }

      return result;
    },
  });

  return {
    summary: query.data ? toPortfolioSummaryViewModel(query.data) : null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
