import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type {
  ApplicationError,
  BacktestCompletoDto,
} from "@/presentation/shared/types/application-layer";
import { BACKTEST_QUERY_KEYS } from "../queries";
import {
  toBacktestResultViewModel,
  type BacktestResultViewModel,
} from "../viewmodels/backtest.view-model";

export function useBacktestsQuery(backtestId: string) {
  const dispatcher = useDispatcher();
  return useQuery({
    queryKey: BACKTEST_QUERY_KEYS.result(backtestId),
    enabled: Boolean(backtestId),
    queryFn: async (): Promise<BacktestCompletoDto> => {
      const r = await dispatcher.DispatchQuery<BacktestCompletoDto>({
        type: "ObterBacktestQuery",
        backtestId,
      } as IQuery);
      if (r instanceof Error) throw r;
      return r;
    },
    select: (data): BacktestResultViewModel | null =>
      data.result ? toBacktestResultViewModel(data.result) : null,
  });
}
