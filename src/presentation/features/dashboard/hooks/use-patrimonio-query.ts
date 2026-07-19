import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type {
  PatrimonioDto,
  ApplicationError,
} from "@/presentation/shared/types/application-layer";
import { DASHBOARD_QUERY_KEYS } from "../queries";

interface UsePatrimonioQueryResult {
  data: PatrimonioDto | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function usePatrimonioQuery(portfolioId: string): UsePatrimonioQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.patrimonio(portfolioId),
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
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
