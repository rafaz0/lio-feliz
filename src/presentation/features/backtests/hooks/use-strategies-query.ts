import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type {
  ApplicationError,
  EstrategiaListDto,
} from "@/presentation/shared/types/application-layer";
import { BACKTEST_QUERY_KEYS } from "../queries";
import { toStrategyViewModels, type StrategyViewModel } from "../viewmodels/backtest.view-model";

export function useStrategiesQuery(userId: string) {
  const dispatcher = useDispatcher();
  return useQuery({
    queryKey: BACKTEST_QUERY_KEYS.list(),
    enabled: Boolean(userId),
    queryFn: async (): Promise<EstrategiaListDto> => {
      const r = await dispatcher.DispatchQuery<EstrategiaListDto>({
        type: "ListarEstrategiasQuery",
        userId,
      } as IQuery);
      if (r instanceof Error) throw r;
      return r;
    },
    select: (data): StrategyViewModel[] => toStrategyViewModels(data.strategies),
  });
}
