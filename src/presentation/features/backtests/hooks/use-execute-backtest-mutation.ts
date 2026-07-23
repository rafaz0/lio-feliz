import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type {
  ApplicationError,
  BacktestCompletoDto,
} from "@/presentation/shared/types/application-layer";
import { BACKTEST_QUERY_KEYS } from "../queries";

export function useExecuteBacktestMutation() {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (strategyId: string): Promise<BacktestCompletoDto> => {
      const r = await dispatcher.DispatchCommand<BacktestCompletoDto>({
        type: "ExecutarBacktestCommand",
        strategyId,
        dateRange: { start: new Date(Date.now() - 365 * 86400000), end: new Date() },
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: BACKTEST_QUERY_KEYS.list() });
      if (data?.backtest?.id) {
        queryClient.invalidateQueries({ queryKey: BACKTEST_QUERY_KEYS.result(data.backtest.id) });
      }
    },
  });
}
