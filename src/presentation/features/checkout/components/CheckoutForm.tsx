import { useCheckoutPlansQuery } from "../hooks/use-checkout-query";
import { useCheckoutMutation } from "../hooks/use-checkout-mutation";
import { useHasCpfCnpjQuery } from "../hooks/use-has-cpf-cnpj-query";
import type { CheckoutPlanViewModel } from "../viewmodels/checkout.view-model";
import { isValidCpfCnpj, formatCpfCnpj } from "@/lib/cpf-cnpj";
import { useState } from "react";

interface CheckoutFormProps {
  userId: string;
  onSuccess?: () => void;
}

export function CheckoutForm({ userId, onSuccess }: CheckoutFormProps) {
  const { data: plans, isLoading, isError, error } = useCheckoutPlansQuery();
  const { data: hasCpfCnpj, isLoading: cpfLoading } = useHasCpfCnpjQuery(userId);
  const checkout = useCheckoutMutation();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [pendingPlan, setPendingPlan] = useState<CheckoutPlanViewModel | null>(null);
  const [cpfCnpjInput, setCpfCnpjInput] = useState("");
  const [cpfCnpjError, setCpfCnpjError] = useState<string | null>(null);

  const finishSubscribe = async (planId: string, cpfCnpj?: string) => {
    setSelectedPlanId(planId);
    await checkout.mutateAsync({ userId, planId, cpfCnpj });
    setPendingPlan(null);
    setCpfCnpjInput("");
    setCpfCnpjError(null);
    onSuccess?.();
  };

  // Plano pago exige CPF/CNPJ pro Asaas (ver asaas-payment-gateway.ts) — se
  // o perfil ainda nao tem, abre o formulario inline em vez de assinar na
  // hora. Plano gratis e plano pago com CPF ja cadastrado seguem direto.
  const handleSelectPlan = (plan: CheckoutPlanViewModel) => {
    if (plan.isFree || hasCpfCnpj) {
      void finishSubscribe(plan.id);
      return;
    }
    setPendingPlan(plan);
    setCpfCnpjError(null);
  };

  const handleConfirmCpfCnpj = () => {
    if (!isValidCpfCnpj(cpfCnpjInput)) {
      setCpfCnpjError("CPF ou CNPJ inválido. Confira os números digitados.");
      return;
    }
    if (!pendingPlan) return;
    void finishSubscribe(pendingPlan.id, cpfCnpjInput);
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

      {pendingPlan && (
        <div
          data-testid="checkout-cpf-form"
          className="rounded-lg border border-amber-200 bg-amber-50 p-4 space-y-3 dark:border-amber-900 dark:bg-amber-950"
        >
          <p className="text-sm text-foreground">
            Pra assinar o <span className="font-medium">{pendingPlan.name}</span>, precisamos do seu
            CPF ou CNPJ — é exigido pelo Asaas pra processar a cobrança via Pix.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              data-testid="checkout-cpf-input"
              type="text"
              inputMode="numeric"
              placeholder="000.000.000-00"
              value={formatCpfCnpj(cpfCnpjInput)}
              onChange={(e) => {
                setCpfCnpjInput(e.target.value);
                setCpfCnpjError(null);
              }}
              className="flex-1 rounded-md border px-3 py-2 text-sm"
            />
            <button
              data-testid="checkout-cpf-confirm"
              onClick={handleConfirmCpfCnpj}
              disabled={checkout.isPending}
              className="rounded-md bg-foreground px-4 py-2 text-sm text-background disabled:opacity-50"
            >
              {checkout.isPending ? "Processando..." : "Confirmar assinatura"}
            </button>
            <button
              onClick={() => {
                setPendingPlan(null);
                setCpfCnpjInput("");
                setCpfCnpjError(null);
              }}
              disabled={checkout.isPending}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Cancelar
            </button>
          </div>
          {cpfCnpjError && (
            <p data-testid="checkout-cpf-error" className="text-xs text-red-600">
              {cpfCnpjError}
            </p>
          )}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onSelect={() => handleSelectPlan(plan)}
            isLoading={checkout.isPending && selectedPlanId === plan.id}
            disabled={checkout.isPending || cpfLoading || Boolean(pendingPlan)}
          />
        ))}
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
      {!plan.isFree && (
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Pagamento via Pix, confirmação em até alguns minutos
        </p>
      )}
    </div>
  );
}
