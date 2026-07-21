import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type { ApplicationError } from "@/presentation/shared/types/application-layer";
import type { HistoricoImportacaoDto } from "@/application/dtos/importacao";
import { IMPORT_EXPORT_QUERY_KEYS } from "../queries";

interface UseImportHistoryQueryResult {
  data: HistoricoImportacaoDto | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useImportHistoryQuery(usuarioId: string): UseImportHistoryQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: IMPORT_EXPORT_QUERY_KEYS.historico(usuarioId),
    queryFn: async (): Promise<HistoricoImportacaoDto> => {
      const result = await dispatcher.DispatchQuery<HistoricoImportacaoDto>({
        type: "ObterHistoricoImportacaoQuery",
        usuarioId,
        page: 1,
        pageSize: 50,
      } as IQuery);

      if (result instanceof Error) throw result;
      return result;
    },
    enabled: !!usuarioId,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
