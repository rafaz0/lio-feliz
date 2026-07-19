import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type {
  PosicaoDetalhadaDto,
  ApplicationError,
} from "@/presentation/shared/types/application-layer";
import { PORTFOLIO_QUERY_KEYS } from "../queries";
import { toAssetViewModel, type AssetViewModel } from "../types/portfolio.view-model";

interface UseAssetDetailsQueryResult {
  asset: AssetViewModel | null;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useAssetDetailsQuery(
  portfolioId: string,
  ativoId: string,
): UseAssetDetailsQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: PORTFOLIO_QUERY_KEYS.asset(portfolioId, ativoId),
    enabled: Boolean(portfolioId) && Boolean(ativoId),
    queryFn: async (): Promise<PosicaoDetalhadaDto> => {
      const result = await dispatcher.DispatchQuery<PosicaoDetalhadaDto>({
        type: "ConsultarPosicaoQuery",
        portfolioId,
        ativoId,
      } as IQuery);

      if (result instanceof Error) {
        throw result;
      }

      return result;
    },
  });

  return {
    asset: query.data ? toAssetViewModel(query.data) : null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
