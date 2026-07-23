import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type {
  ApplicationError,
  PlanoDetalhadoDto,
  AssinaturaDto,
} from "@/presentation/shared/types/application-layer";
import { SUBSCRIPTION_QUERY_KEYS } from "../queries";
import {
  toPlanViewModels,
  toSubscriptionViewModel,
  type PlanViewModel,
  type SubscriptionViewModel,
} from "../viewmodels/subscription.view-model";

export function usePlansQuery() {
  const dispatcher = useDispatcher();
  return useQuery({
    queryKey: SUBSCRIPTION_QUERY_KEYS.planos(),
    queryFn: async (): Promise<PlanoDetalhadoDto[]> => {
      const r = await dispatcher.DispatchQuery<PlanoDetalhadoDto[]>({
        type: "ListarPlanosQuery",
      } as IQuery);
      if (r instanceof Error) throw r;
      return r;
    },
    select: (data): PlanViewModel[] => toPlanViewModels(data),
  });
}

export function useSubscriptionQuery(userId: string) {
  const dispatcher = useDispatcher();
  return useQuery({
    queryKey: SUBSCRIPTION_QUERY_KEYS.ativa(userId),
    enabled: Boolean(userId),
    queryFn: async (): Promise<AssinaturaDto> => {
      const r = await dispatcher.DispatchQuery<AssinaturaDto>({
        type: "ObterPlanoAtivoQuery",
        userId,
      } as IQuery);
      if (r instanceof Error) throw r;
      return r;
    },
    select: (data): SubscriptionViewModel | null => (data ? toSubscriptionViewModel(data) : null),
  });
}
