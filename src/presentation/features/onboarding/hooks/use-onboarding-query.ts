import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type { ApplicationError, OnboardingCompletoDto } from "@/presentation/shared/types/application-layer";
import { ONBOARDING_QUERY_KEYS } from "../queries";
import type { OnboardingViewModel } from "../viewmodels/onboarding.view-model";

export function useOnboardingQuery(userId: string) {
  const dispatcher = useDispatcher();
  return useQuery({
    queryKey: ONBOARDING_QUERY_KEYS.progress(userId),
    enabled: Boolean(userId),
    queryFn: async (): Promise<OnboardingCompletoDto> => {
      const r = await dispatcher.DispatchQuery<OnboardingCompletoDto>({ type: "ObterProgressoOnboardingQuery", userId } as IQuery);
      if (r instanceof Error) throw r; return r;
    },
    select: (data): OnboardingViewModel => ({
      progress: data.progress,
      currentStep: data.currentStep,
      nextStep: data.nextStep,
      hasMoreSteps: data.hasMoreSteps,
      progressPercent: data.progress.totalSteps > 0 ? Math.round((data.progress.currentStep / data.progress.totalSteps) * 100) : 0,
    }),
  });
}
