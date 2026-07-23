import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type {
  ApplicationError,
  ComparacaoDto,
} from "@/presentation/shared/types/application-layer";
import type { CriarComparacaoCommand } from "@/application/commands/criar-comparacao";
import { COMPARISON_QUERY_KEYS } from "../queries";

export interface CreateComparisonInput {
  name: string;
  entries: Array<{ assetTicker: string; assetType: string; weight: number }>;
  scope: { type: "byAsset" | "byType" | "bySector"; filter?: string };
  userId: string;
}

interface UseCreateComparisonMutationResult {
  mutate: (input: CreateComparisonInput) => void;
  mutateAsync: (input: CreateComparisonInput) => Promise<ComparacaoDto>;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: ApplicationError | null;
  data: ComparacaoDto | null;
}

export function useCreateComparisonMutation(): UseCreateComparisonMutationResult {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: CreateComparisonInput): Promise<ComparacaoDto> => {
      const command: CriarComparacaoCommand = {
        type: "CriarComparacaoCommand",
        name: input.name,
        entries: input.entries,
        scope: input.scope,
        userId: input.userId,
      };

      const result = await dispatcher.DispatchCommand<ComparacaoDto>(
        command as unknown as ICommand,
      );

      if (result instanceof Error) throw result;
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: COMPARISON_QUERY_KEYS.userSets(data.userId),
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
    data: (mutation.data as ComparacaoDto | null) ?? null,
  };
}
