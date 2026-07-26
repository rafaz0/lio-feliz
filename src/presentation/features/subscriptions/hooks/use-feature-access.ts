import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand, IQuery } from "@/application/types";
import type { AcessoDto } from "@/presentation/shared/types/application-layer";
import { SUBSCRIPTION_QUERY_KEYS } from "../queries";

export function useFeatureAccess(userId: string | undefined, capability: string) {
  const dispatcher = useDispatcher();

  return useQuery({
    queryKey: SUBSCRIPTION_QUERY_KEYS.acesso(userId ?? ""),
    enabled: Boolean(userId),
    queryFn: async (): Promise<boolean> => {
      const r = await dispatcher.DispatchCommand<AcessoDto>({
        type: "VerificarAcessoCommand",
        userId,
        capability,
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r.allowed;
    },
  });
}

export function usePlanComparison(userId: string | undefined) {
  const dispatcher = useDispatcher();

  return useQuery({
    queryKey: SUBSCRIPTION_QUERY_KEYS.comparacao(),
    enabled: Boolean(userId),
    queryFn: async () => {
      const r = await dispatcher.DispatchQuery({
        type: "CompararPlanosQuery",
        userId,
      } as IQuery);
      if (r instanceof Error) throw r;
      return r;
    },
  });
}
