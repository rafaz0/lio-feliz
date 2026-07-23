import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type {
  ApplicationError,
  TaxaCambioDto,
} from "@/presentation/shared/types/application-layer";
import { INTERNATIONAL_QUERY_KEYS } from "../queries";

interface UseExchangeRateQueryResult {
  rate: TaxaCambioDto | null;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
}

export function useExchangeRateQuery(ticker: string): UseExchangeRateQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: INTERNATIONAL_QUERY_KEYS.taxaCambio(ticker),
    enabled: Boolean(ticker),
    queryFn: async (): Promise<TaxaCambioDto> => {
      const result = await dispatcher.DispatchQuery<TaxaCambioDto>({
        type: "ObterTaxaCambioQuery",
        ticker,
      } as IQuery);
      if (result instanceof Error) throw result;
      return result;
    },
  });

  return {
    rate: (query.data as TaxaCambioDto | null) ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
  };
}
