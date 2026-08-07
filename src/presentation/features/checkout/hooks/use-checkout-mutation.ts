import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkoutServerFn } from "@/lib/checkout.server";
import type { AssinaturaDto } from "@/presentation/shared/types/application-layer";
import { CHECKOUT_QUERY_KEYS } from "../queries";

export type CheckoutMutationInput = {
  userId: string;
  planId: string;
  cpfCnpj?: string;
};

// Chama a fronteira de servidor (src/lib/checkout.server.ts) em vez do
// dispatcher client-side — o userId de verdade vem da sessao autenticada no
// servidor, nunca do que o navegador manda (o campo userId aqui so serve
// pra invalidar a query certa depois do sucesso).
export function useCheckoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ planId, cpfCnpj }: CheckoutMutationInput): Promise<AssinaturaDto> => {
      const result = await checkoutServerFn({ data: { planId, cpfCnpj } });
      return result as AssinaturaDto;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: CHECKOUT_QUERY_KEYS.ativa(variables.userId) });
    },
  });
}
