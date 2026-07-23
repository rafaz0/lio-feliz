import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type {
  ApplicationError,
  PlanoDetalhadoDto,
} from "@/presentation/shared/types/application-layer";
import { CHECKOUT_QUERY_KEYS } from "../queries";
import {
  toCheckoutPlanViewModel,
  type CheckoutPlanViewModel,
} from "../viewmodels/checkout.view-model";

export function useCheckoutPlansQuery() {
  const dispatcher = useDispatcher();
  return useQuery({
    queryKey: CHECKOUT_QUERY_KEYS.planos(),
    queryFn: async (): Promise<PlanoDetalhadoDto[]> => {
      const r = await dispatcher.DispatchQuery<PlanoDetalhadoDto[]>({
        type: "ListarPlanosQuery",
      } as IQuery);
      if (r instanceof Error) throw r;
      return r;
    },
    select: (data): CheckoutPlanViewModel[] =>
      data?.map((dto) => toCheckoutPlanViewModel(dto)) ?? [],
  });
}
