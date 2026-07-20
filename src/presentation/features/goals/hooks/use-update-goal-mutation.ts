import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type {
  ApplicationError,
  MetaListDto,
} from "@/presentation/shared/types/application-layer";
import type { AtualizarMetaCommand } from "@/application/commands/atualizar-meta";
import { GOALS_QUERY_KEYS } from "../queries";
import { toGoalViewModel, type GoalViewModel } from "../types/goals.view-model";

export interface UpdateGoalInput {
  goalId: string;
  portfolioId: string;
  name?: string;
  targetAmount?: number;
  targetDate?: Date;
}

interface UseUpdateGoalMutationResult {
  mutate: (input: UpdateGoalInput) => void;
  mutateAsync: (input: UpdateGoalInput) => Promise<GoalViewModel>;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: ApplicationError | null;
  data: GoalViewModel | null;
}

export function useUpdateGoalMutation(): UseUpdateGoalMutationResult {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: UpdateGoalInput): Promise<GoalViewModel> => {
      const command: AtualizarMetaCommand = {
        type: "AtualizarMetaCommand",
        goalId: input.goalId,
        portfolioId: input.portfolioId,
        ...(input.name !== undefined && { name: input.name }),
        ...(input.targetAmount !== undefined && { targetAmount: input.targetAmount }),
        ...(input.targetDate !== undefined && { targetDate: input.targetDate }),
      };

      const result = await dispatcher.DispatchCommand<MetaListDto>(
        command as unknown as ICommand,
      );

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
