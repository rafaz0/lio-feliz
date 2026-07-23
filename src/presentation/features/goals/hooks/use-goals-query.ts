import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type { ApplicationError, MetaListDto } from "@/presentation/shared/types/application-layer";
import { GOALS_QUERY_KEYS } from "../queries";
import {
  toGoalViewModels,
  toGoalsSummaryViewModel,
  type GoalViewModel,
  type GoalsSummaryViewModel,
} from "../types/goals.view-model";

interface UseGoalsQueryResult {
  goals: GoalViewModel[];
  summary: GoalsSummaryViewModel;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useGoalsQuery(portfolioId: string): UseGoalsQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: GOALS_QUERY_KEYS.metas(portfolioId),
    enabled: Boolean(portfolioId),
    queryFn: async (): Promise<MetaListDto[]> => {
      const result = await dispatcher.DispatchQuery<MetaListDto[]>({
        type: "ObterMetasQuery",
        portfolioId,
      } as IQuery);

      if (result instanceof Error) {
        throw result;
      }

      return result;
    },
  });

  const goals = query.data ? toGoalViewModels(query.data) : [];
  const summary = toGoalsSummaryViewModel(goals);

  return {
    goals,
    summary,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
