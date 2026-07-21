import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type {
  ApplicationError,
  CronogramaPagamentosDto,
} from "@/presentation/shared/types/application-layer";
import { FIXED_INCOME_QUERY_KEYS } from "../queries";
import { toCronogramaViewModel, type CronogramaViewModel } from "../types/fixed-income.view-model";

interface UseCronogramaQueryResult {
  cronograma: CronogramaViewModel;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useCronogramaQuery(
  portfolioId: string,
  apenasFuturos = true,
): UseCronogramaQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: FIXED_INCOME_QUERY_KEYS.cronograma(portfolioId),
    enabled: Boolean(portfolioId),
    queryFn: async (): Promise<CronogramaPagamentosDto> => {
      const result = await dispatcher.DispatchQuery<CronogramaPagamentosDto>({
        type: "ObterCronogramaPagamentosQuery",
        portfolioId,
        apenasFuturos,
      } as IQuery);

      if (result instanceof Error) {
        throw result;
      }

      return result;
    },
  });

  return {
    cronograma: query.data ? toCronogramaViewModel(query.data) : { items: [], totalJuros: "R$ 0,00", totalAmortizacao: "R$ 0,00" },
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
