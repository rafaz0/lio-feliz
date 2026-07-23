import { useOnboardingQuery } from "../hooks/use-onboarding-query";
import {
  useAvancarPassoMutation,
  usePularOnboardingMutation,
} from "../hooks/use-onboarding-mutation";

interface OnboardingPageProps {
  userId: string;
  onComplete?: () => void;
}

export function OnboardingPage({ userId, onComplete }: OnboardingPageProps) {
  const { data: vm, isLoading, isError } = useOnboardingQuery(userId);
  const avancar = useAvancarPassoMutation(userId);
  const pular = usePularOnboardingMutation(userId);

  if (isLoading)
    return (
      <div data-testid="onboarding-loading" className="py-8 text-center text-sm">
        Carregando...
      </div>
    );
  if (isError || !vm)
    return (
      <div data-testid="onboarding-error" className="py-8 text-center text-sm text-red-500">
        Erro ao carregar onboarding.
      </div>
    );

  if (vm.progress.isCompleted || vm.progress.isSkipped) {
    onComplete?.();
    return (
      <div
        data-testid="onboarding-complete"
        className="py-8 text-center text-sm text-muted-foreground"
      >
        Onboarding concluido!
      </div>
    );
  }

  return (
    <div data-testid="onboarding-page" className="space-y-6 max-w-2xl mx-auto py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Boas-vindas ao Lio Feliz</h1>
        <button
          onClick={() => pular.mutate()}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Pular onboarding
        </button>
      </div>

      <div className="flex gap-1">
        {Array.from({ length: vm.progress.totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${i < vm.progress.currentStep ? "bg-foreground" : "bg-muted"}`}
          />
        ))}
      </div>

      {vm.currentStep && (
        <div className="rounded-lg border p-6 space-y-4">
          <span className="text-xs font-medium uppercase text-muted-foreground">
            Passo {vm.progress.currentStep} de {vm.progress.totalSteps}
          </span>
          <h2 className="text-lg font-semibold">{vm.currentStep.title}</h2>
          <p className="text-sm text-muted-foreground">{vm.currentStep.description}</p>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => avancar.mutate()}
              className="rounded-md bg-foreground px-4 py-2 text-sm text-background"
            >
              {vm.hasMoreSteps ? "Continuar" : "Concluir"}
            </button>
            {vm.currentStep.optional && (
              <button
                onClick={() => avancar.mutate()}
                className="rounded-md border px-4 py-2 text-sm"
              >
                Pular passo
              </button>
            )}
          </div>
        </div>
      )}

      {!vm.currentStep && vm.progress.currentStep > vm.progress.totalSteps && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">Onboarding concluido!</p>
        </div>
      )}
    </div>
  );
}
