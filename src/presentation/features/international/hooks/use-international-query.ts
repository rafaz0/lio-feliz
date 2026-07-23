import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type {
  ApplicationError,
  AtivosInternacionaisDto,
} from "@/presentation/shared/types/application-layer";
import { INTERNATIONAL_QUERY_KEYS } from "../queries";
import {
  toInternationalSummaryViewModel,
  type InternationalAssetViewModel,
  type InternationalSummaryViewModel,
} from "../viewmodels/international.view-model";

interface UseInternationalQueryResult {
  ativos: InternationalAssetViewModel[];
  summary: InternationalSummaryViewModel;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useInternationalQuery(portfolioId: string): UseInternationalQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: INTERNATIONAL_QUERY_KEYS.ativos(portfolioId),
    enabled: Boolean(portfolioId),
    queryFn: async (): Promise<AtivosInternacionaisDto> => {
      const result = await dispatcher.DispatchQuery<AtivosInternacionaisDto>({
        type: "ObterAtivosInternacionaisQuery",
        portfolioId,
      } as IQuery);
      if (result instanceof Error) throw result;
      return result;
    },
  });

  const ativos: InternationalAssetViewModel[] = query.data
    ? query.data.ativos.map((a) => ({
        ticker: a.ticker,
        name: a.name,
        exchange: a.exchange,
        currency: a.currency,
        assetType: a.assetType,
        valorOriginal: a.valorOriginal,
        valorBRL: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
          a.valorBRL,
        ),
        taxaCambio: a.taxaCambio,
      }))
    : [];

  const summary = toInternationalSummaryViewModel(ativos);

  return {
    ativos,
    summary,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
