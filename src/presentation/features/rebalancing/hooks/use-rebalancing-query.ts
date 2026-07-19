import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type {
  RebalanceamentoDto,
  ApplicationError,
} from "@/presentation/shared/types/application-layer";
import { REBALANCING_QUERY_KEYS } from "../queries";

interface UseRebalancingQueryResult {
  rebalanceamento: RebalanceamentoDto | null;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useRebalancingQuery(portfolioId: string): UseRebalancingQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: REBALANCING_QUERY_KEYS.rebalanceamento(portfolioId),
    enabled: Boolean(portfolioId),
    queryFn: async (): Promise<RebalanceamentoDto> => {
      const result = await dispatcher.DispatchQuery<RebalanceamentoDto>({
        type: "CalcularRebalanceamentoQuery",
        portfolioId,
      } as IQuery);

      if (result instanceof Error) {
        throw result;
      }

      return result;
    },
  });

  return {
    rebalanceamento: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
