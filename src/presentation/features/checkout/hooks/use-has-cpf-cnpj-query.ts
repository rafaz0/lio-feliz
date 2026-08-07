import { useQuery } from "@tanstack/react-query";
import { hasProfileCpfCnpjServerFn } from "@/lib/checkout.server";

// So um boolean — nunca expõe o CPF/CNPJ real pro cliente. Usado pra decidir
// se o formulario de checkout precisa pedir o dado antes de assinar um
// plano pago (Asaas exige, ver asaas-payment-gateway.ts).
export function useHasCpfCnpjQuery(userId: string) {
  return useQuery({
    queryKey: ["checkout", "has-cpf-cnpj", userId],
    enabled: Boolean(userId),
    queryFn: async (): Promise<boolean> => {
      const result = await hasProfileCpfCnpjServerFn();
      return result.hasCpfCnpj;
    },
  });
}
