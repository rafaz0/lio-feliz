import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type {
  ApplicationError,
  ComparisonSetDto,
} from "@/presentation/shared/types/application-layer";
import { COMPARISON_QUERY_KEYS } from "../queries";
import {
  toScorecardViewModel,
  type ScorecardViewModel,
  type ComparisonSetViewModel,
} from "../viewmodels/comparison.view-model";

interface UseComparisonQueryResult {
  comparisonSet: ComparisonSetViewModel | null;
  scorecard: ScorecardViewModel | null;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useComparisonQuery(setId: string): UseComparisonQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: COMPARISON_QUERY_KEYS.set(setId),
    enabled: Boolean(setId),
    queryFn: async (): Promise<ComparisonSetDto> => {
      const result = await dispatcher.DispatchQuery<ComparisonSetDto>({
        type: "ObterComparacaoQuery",
        comparisonSetId: setId,
      } as IQuery);

      if (result instanceof Error) throw result;
      return result;
    },
  });

  const comparisonSet: ComparisonSetViewModel | null = query.data
    ? {
        id: query.data.comparisonSet.id,
        name: query.data.comparisonSet.name,
        entries: query.data.comparisonSet.entries,
        scope: query.data.comparisonSet.scope,
        createdAt: query.data.comparisonSet.createdAt,
      }
    : null;

  const scorecard = query.data?.scorecard
    ? toScorecardViewModel(query.data.scorecard.metrics)
    : null;

  return {
    comparisonSet,
    scorecard,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
