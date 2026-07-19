import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type {
  HistoricoPatrimonialDto,
  ApplicationError,
} from "@/presentation/shared/types/application-layer";
import { HISTORY_QUERY_KEYS } from "../queries";

interface UseHistoricoQueryResult {
  historico: HistoricoPatrimonialDto | null;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useHistoricoQuery(portfolioId: string): UseHistoricoQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: HISTORY_QUERY_KEYS.historico(portfolioId),
    enabled: Boolean(portfolioId),
    queryFn: async (): Promise<HistoricoPatrimonialDto> => {
      const result = await dispatcher.DispatchQuery<HistoricoPatrimonialDto>({
        type: "ObterHistoricoPatrimonialQuery",
        portfolioId,
      } as IQuery);

      if (result instanceof Error) {
        throw result;
      }

      return result;
    },
  });

  return {
    historico: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
