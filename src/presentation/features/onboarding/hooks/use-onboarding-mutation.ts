import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type {
  ApplicationError,
  OnboardingCompletoDto,
} from "@/presentation/shared/types/application-layer";
import { ONBOARDING_QUERY_KEYS } from "../queries";

export function useAvancarPassoMutation(userId: string) {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<OnboardingCompletoDto> => {
      const r = await dispatcher.DispatchCommand<OnboardingCompletoDto>({
        type: "AvancarPassoCommand",
        userId,
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEYS.progress(userId) }),
  });
}

export function usePularOnboardingMutation(userId: string) {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<OnboardingCompletoDto> => {
      const r = await dispatcher.DispatchCommand<OnboardingCompletoDto>({
        type: "PularOnboardingCommand",
        userId,
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEYS.progress(userId) }),
  });
}
