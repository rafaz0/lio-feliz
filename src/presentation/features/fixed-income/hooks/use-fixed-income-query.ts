import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type { ApplicationError, RendaFixaDto } from "@/presentation/shared/types/application-layer";
import { FIXED_INCOME_QUERY_KEYS } from "../queries";
import { toRendaFixaViewModels, type RendaFixaViewModel } from "../types/fixed-income.view-model";

interface UseFixedIncomeQueryResult {
  assets: RendaFixaViewModel[];
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useFixedIncomeQuery(portfolioId: string): UseFixedIncomeQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: FIXED_INCOME_QUERY_KEYS.rendaFixa(portfolioId),
    enabled: Boolean(portfolioId),
    queryFn: async (): Promise<RendaFixaDto[]> => {
      const result = await dispatcher.DispatchQuery<RendaFixaDto[]>({
        type: "ObterRendaFixaQuery",
        portfolioId,
      } as IQuery);

      if (result instanceof Error) {
        throw result;
      }

      return result;
    },
  });

  return {
    assets: query.data ? toRendaFixaViewModels(query.data) : [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
