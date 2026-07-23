import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type { ApplicationError, AlertaDto, AlertRuleDto } from "@/presentation/shared/types/application-layer";
import { ALERTS_QUERY_KEYS } from "../queries";
import { toAlertViewModels, toAlertRuleViewModels, type AlertViewModel, type AlertRuleViewModel } from "../viewmodels/alert.view-model";

export function useAlertsQuery(userId: string) {
  const dispatcher = useDispatcher();
  return useQuery({
    queryKey: ALERTS_QUERY_KEYS.alerts(userId),
    enabled: Boolean(userId),
    queryFn: async (): Promise<AlertaDto[]> => {
      const r = await dispatcher.DispatchQuery<AlertaDto[]>({ type: "ObterAlertaQuery", userId } as IQuery);
      if (r instanceof Error) throw r; return r;
    },
    select: (data): AlertViewModel[] => toAlertViewModels(data),
  });
}

export function useAlertRulesQuery(userId: string) {
  const dispatcher = useDispatcher();
  return useQuery({
    queryKey: ALERTS_QUERY_KEYS.rules(userId),
    enabled: Boolean(userId),
    queryFn: async (): Promise<AlertRuleDto[]> => {
      const r = await dispatcher.DispatchQuery<AlertRuleDto[]>({ type: "ListarAlertasAtivosQuery", userId } as IQuery);
      if (r instanceof Error) throw r; return r;
    },
    select: (data): AlertRuleViewModel[] => toAlertRuleViewModels(data),
  });
}
