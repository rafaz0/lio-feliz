import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/integrations/supabase/auth-middleware-prod";
import { AssinarPlanoService } from "@/application/services/assinar-plano-service";
import { CheckoutOrchestrator } from "@/application/services/checkout-orchestrator";
import { PaymentGatewayFactory } from "@/infrastructure/gateways/payment-gateway-factory";
import { SupabaseSubscriptionRepository } from "@/infrastructure/repositories/supabase-subscription-repository";
import { isValidCpfCnpj, onlyDigits } from "@/lib/cpf-cnpj";

// Fronteira de servidor do checkout. Antes disso, o checkout inteiro rodava
// no navegador (dispatcher montado num useMemo em __root.tsx) — qualquer
// gateway real (chave de API do Asaas) exigia essa fronteira pra existir.
// O userId vem do middleware de auth (sessao real), nunca do cliente —
// antes o dispatcher client-side aceitava o userId como veio no payload,
// o que permitiria em tese assinar em nome de outro usuario.
const checkoutInput = z.object({
  planId: z.string().min(1),
  // Opcional: so exigido de verdade pelo AsaasPaymentGateway na hora do
  // charge() (plano pago sem CPF/CNPJ salvo falha com erro claro). Vem
  // preenchido quando o front detecta que o perfil ainda nao tem o dado.
  cpfCnpj: z.string().optional(),
});

export const checkoutServerFn = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .validator(checkoutInput)
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = (context as { userId: string }).userId;

    if (data.cpfCnpj) {
      const digits = onlyDigits(data.cpfCnpj);
      if (!isValidCpfCnpj(digits)) {
        throw new Error("CPF/CNPJ inválido.");
      }
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        // @ts-expect-error - cpf_cnpj existe na coluna real (migration
        // 20260806120100) mas types.ts ainda nao foi regenerado.
        .update({ cpf_cnpj: digits })
        .eq("id", userId);
      if (profileError) {
        throw new Error("Não foi possível salvar o CPF/CNPJ.");
      }
    }

    const subscriptionRepo = new SupabaseSubscriptionRepository(supabaseAdmin);
    const gatewayFactory = new PaymentGatewayFactory(supabaseAdmin);
    const paymentGateway = gatewayFactory.create();
    const service = new AssinarPlanoService(subscriptionRepo, undefined, paymentGateway);
    const orchestrator = new CheckoutOrchestrator(service);

    const result = await orchestrator.execute({
      userId,
      planId: data.planId,
      paymentMethodId: "",
    });

    if (!result.success || !result.subscription) {
      throw new Error(result.error?.message ?? "Falha ao processar assinatura");
    }

    return result.subscription;
  });

// Consulta leve pra saber se o usuario ja tem CPF/CNPJ cadastrado, sem
// expor o valor completo pro cliente (so um boolean) — evita mostrar o
// campo de novo pra quem ja preencheu antes.
export const hasProfileCpfCnpjServerFn = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = (context as { userId: string }).userId;

    const { data } = await supabaseAdmin
      .from("profiles")
      .select("cpf_cnpj")
      .eq("id", userId)
      .maybeSingle();

    return { hasCpfCnpj: Boolean((data as { cpf_cnpj: string | null } | null)?.cpf_cnpj) };
  });
