import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/integrations/supabase/auth-middleware-prod";
import { AssinarPlanoService } from "@/application/services/assinar-plano-service";
import { CheckoutOrchestrator } from "@/application/services/checkout-orchestrator";
import { PaymentGatewayFactory } from "@/infrastructure/gateways/payment-gateway-factory";
import { SupabaseSubscriptionRepository } from "@/infrastructure/repositories/supabase-subscription-repository";

// Fronteira de servidor do checkout. Antes disso, o checkout inteiro rodava
// no navegador (dispatcher montado num useMemo em __root.tsx) — qualquer
// gateway real (chave de API do Asaas) exigia essa fronteira pra existir.
// O userId vem do middleware de auth (sessao real), nunca do cliente —
// antes o dispatcher client-side aceitava o userId como veio no payload,
// o que permitiria em tese assinar em nome de outro usuario.
const checkoutInput = z.object({
  planId: z.string().min(1),
});

export const checkoutServerFn = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .validator(checkoutInput)
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const subscriptionRepo = new SupabaseSubscriptionRepository(supabaseAdmin);
    const gatewayFactory = new PaymentGatewayFactory(supabaseAdmin);
    const paymentGateway = gatewayFactory.create();
    const service = new AssinarPlanoService(subscriptionRepo, undefined, paymentGateway);
    const orchestrator = new CheckoutOrchestrator(service);

    const userId = (context as { userId: string }).userId;
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
