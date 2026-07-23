import { useCheckoutPlansQuery } from "../hooks/use-checkout-query";
import { useCheckoutMutation } from "../hooks/use-checkout-mutation";
import type { CheckoutPlanViewModel } from "../viewmodels/checkout.view-model";
import { useState } from "react";

interface CheckoutFormProps {
  userId: string;
  onSuccess?: () => void;
}

export function CheckoutForm({ userId, onSuccess }: CheckoutFormProps) {
  const { data: plans, isLoading, isError, error } = useCheckoutPlansQuery();
  const checkout = useCheckoutMutation();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [paymentMethodId] = useState("pm_card_visa");

  const handleSubscribe = async (planId: string) => {
    setSelectedPlanId(planId);
    await checkout.mutateAsync({ userId, planId });
    onSuccess?.();
  };

  if (isLoading) {
    return (
      <div
        data-testid="checkout-loading"
        className="py-16 text-center text-sm text-muted-foreground"
      >
        Carregando planos...
      </div>
    );
  }

  if (isError) {
    return (
      <div data-testid="checkout-error" className="py-16 text-center text-sm text-red-500">
        {error instanceof Error ? error.message : "Erro ao carregar planos"}
      </div>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <div data-testid="checkout-empty" className="py-16 text-center text-sm text-muted-foreground">
        Nenhum plano disponível no momento.
      </div>
    );
  }

  return (
    <div data-testid="checkout-page" className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <p className="text-sm text-muted-foreground">Escolha o plano ideal para você.</p>
      </header>

      {checkout.isError && (
        <div
          data-testid="checkout-subscription-error"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {checkout.error instanceof Error
            ? checkout.error.message
            : "Erro ao processar assinatura"}
        </div>
      )}

      {checkout.isSuccess && (
        <div
          data-testid="checkout-success"
          className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
        >
          Assinatura realizada com sucesso! Seu plano já está ativo.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onSelect={() => handleSubscribe(plan.id)}
            isLoading={checkout.isPending && selectedPlanId === plan.id}
            disabled={checkout.isPending}
          />
        ))}
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-2 text-sm font-medium">Dados de pagamento</h3>
        <p className="text-xs text-muted-foreground">Método: {paymentMethodId}</p>
        <p className="mt-1 text-xs text-muted-foreground">Cartão de crédito (simulado)</p>
      </div>
    </div>
  );
}

interface PlanCardProps {
  plan: CheckoutPlanViewModel;
  onSelect: () => void;
  isLoading: boolean;
  disabled: boolean;
}

function PlanCard({ plan, onSelect, isLoading, disabled }: PlanCardProps) {
  return (
    <div data-testid={`checkout-plan-${plan.tier}`} className="flex flex-col rounded-lg border p-6">
      <h3 className="font-semibold">{plan.name}</h3>
      <p className="mt-1 text-3xl font-bold">{plan.monthlyPrice}</p>
      <p className="mt-1 text-xs text-muted-foreground">{plan.description}</p>

      <ul className="mt-4 space-y-2 text-sm">
        {plan.capabilities.map((cap) => (
          <li key={cap} className="flex items-center gap-2">
            <span className="text-green-500">&#10003;</span>
            {cap}
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        disabled={disabled}
        className="mt-auto rounded-md bg-foreground px-4 py-2 text-sm text-background disabled:opacity-50"
      >
        {isLoading ? "Processando..." : plan.isFree ? "Gratuito" : "Assinar"}
      </button>
    </div>
  );
}
