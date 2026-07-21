import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type { ApplicationError } from "@/presentation/shared/types/application-layer";
import type { SyncStatusDto } from "@/application/dtos/integracao";
import { INTEGRATION_QUERY_KEYS } from "../queries";

interface UseSyncStatusQueryResult {
  data: SyncStatusDto | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useSyncStatusQuery(integrationId: string): UseSyncStatusQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: INTEGRATION_QUERY_KEYS.status(integrationId),
    queryFn: async (): Promise<SyncStatusDto> => {
      const result = await dispatcher.DispatchQuery<SyncStatusDto>({
        type: "ObterStatusSincronizacaoQuery",
        integrationId,
      } as IQuery);

      if (result instanceof Error) throw result;
      return result;
    },
    enabled: !!integrationId,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
