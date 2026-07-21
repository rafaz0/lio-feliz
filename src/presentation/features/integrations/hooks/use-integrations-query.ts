import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type { ApplicationError } from "@/presentation/shared/types/application-layer";
import type { IntegracoesListDto } from "@/application/dtos/integracao";
import { INTEGRATION_QUERY_KEYS } from "../queries";

interface UseIntegrationsQueryResult {
  data: IntegracoesListDto | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useIntegrationsQuery(): UseIntegrationsQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: INTEGRATION_QUERY_KEYS.list(),
    queryFn: async (): Promise<IntegracoesListDto> => {
      const result = await dispatcher.DispatchQuery<IntegracoesListDto>({
        type: "ObterIntegracoesQuery",
      } as IQuery);

      if (result instanceof Error) throw result;
      return result;
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
