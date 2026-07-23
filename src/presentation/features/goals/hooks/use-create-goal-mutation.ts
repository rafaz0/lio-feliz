import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type { ApplicationError, MetaListDto } from "@/presentation/shared/types/application-layer";
import type { CriarMetaCommand } from "@/application/commands/criar-meta";
import { GOALS_QUERY_KEYS } from "../queries";
import { toGoalViewModel, type GoalViewModel } from "../types/goals.view-model";

export interface CreateGoalInput {
  portfolioId: string;
  name: string;
  targetAmount: number;
  targetDate: Date;
  category: string;
}

interface UseCreateGoalMutationResult {
  mutate: (input: CreateGoalInput) => void;
  mutateAsync: (input: CreateGoalInput) => Promise<GoalViewModel>;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: ApplicationError | null;
  data: GoalViewModel | null;
}

export function useCreateGoalMutation(): UseCreateGoalMutationResult {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: CreateGoalInput): Promise<GoalViewModel> => {
      const command: CriarMetaCommand = {
        type: "CriarMetaCommand",
        portfolioId: input.portfolioId,
        name: input.name,
        targetAmount: input.targetAmount,
        targetDate: input.targetDate,
        category: input.category as CriarMetaCommand["category"],
      };

      const result = await dispatcher.DispatchCommand<MetaListDto>(command as unknown as ICommand);

      if (result instanceof Error) {
        throw result;
      }

      return toGoalViewModel(result);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: GOALS_QUERY_KEYS.metas(variables.portfolioId),
      });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: (mutation.error as ApplicationError | null) ?? null,
    data: (mutation.data as GoalViewModel | null) ?? null,
  };
}
