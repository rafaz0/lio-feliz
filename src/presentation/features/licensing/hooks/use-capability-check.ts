import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type { ApplicationError, AcessoDto } from "@/presentation/shared/types/application-layer";

const LICENSING_QUERY_KEYS = {
  all: ["licensing"] as const,
  capability: (userId: string, capability: string) => ["licensing", userId, capability] as const,
};

export function useCapabilityCheck(userId: string | undefined, capability: string) {
  const dispatcher = useDispatcher();

  return useQuery({
    queryKey: LICENSING_QUERY_KEYS.capability(userId ?? "", capability),
    enabled: Boolean(userId),
    staleTime: 60_000,
    queryFn: async (): Promise<AcessoDto> => {
      const r = await dispatcher.DispatchCommand<AcessoDto>({
        type: "VerificarAcessoCommand",
        userId,
        capability,
      } as unknown as ICommand);
      if (r instanceof Error) throw r;
      return r;
    },
    select: (data): { allowed: boolean; planTier: string } => ({
      allowed: data.allowed,
      planTier: data.planTier,
    }),
  });
}
